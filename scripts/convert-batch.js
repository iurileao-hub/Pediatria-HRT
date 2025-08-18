#!/usr/bin/env node

/**
 * Script para conversão em lote de arquivos DOCX para HTML
 * Uso: node scripts/convert-batch.js [pasta] [método]
 * 
 * Exemplos:
 * node scripts/convert-batch.js ./rotinas mammoth
 * node scripts/convert-batch.js ./attached_assets pandoc
 */

import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

class BatchConverter {
  constructor() {
    this.tempDir = '/tmp';
    this.results = [];
  }

  async convertWithMammoth(filePath, filename) {
    try {
      console.log(`📄 Convertendo ${filename} com Mammoth...`);
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.convertToHtml({ buffer });
      
      return {
        success: true,
        htmlContent: result.value,
        method: 'mammoth',
        filename,
        messages: result.messages
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        method: 'mammoth',
        filename
      };
    }
  }

  async convertWithPandoc(filePath, filename) {
    const randomId = Math.random().toString(36).substring(7);
    const outputPath = path.join(this.tempDir, `${randomId}.html`);

    try {
      console.log(`📄 Convertendo ${filename} com Pandoc...`);
      
      const command = `pandoc "${filePath}" -t html --extract-media="${this.tempDir}" -o "${outputPath}"`;
      await execAsync(command);

      const htmlContent = fs.readFileSync(outputPath, 'utf-8');
      
      // Limpa arquivo temporário
      try {
        fs.unlinkSync(outputPath);
      } catch (e) {}

      return {
        success: true,
        htmlContent,
        method: 'pandoc',
        filename
      };
    } catch (error) {
      // Limpa arquivo temporário em caso de erro
      try {
        fs.unlinkSync(outputPath);
      } catch (e) {}

      return {
        success: false,
        error: error.message,
        method: 'pandoc',
        filename
      };
    }
  }

  extractMetadataFromFilename(filename) {
    const nameWithoutExt = filename.replace(/\.(docx?|doc)$/i, '');
    const parts = nameWithoutExt.split(/[-_\s]+/);
    
    return {
      title: nameWithoutExt.replace(/[-_]/g, ' ').trim(),
      category: parts.length > 1 ? parts[0] : 'Geral',
      author: 'HRT',
      originalFilename: filename
    };
  }

  async saveToDatabase(routine) {
    try {
      const response = await fetch('http://localhost:5000/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routine)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`⚠️  Não foi possível salvar no banco: ${error.message}`);
      return null;
    }
  }

  async convertBatch(folderPath, method = 'mammoth') {
    console.log(`🚀 Iniciando conversão em lote com ${method.toUpperCase()}`);
    console.log(`📁 Pasta: ${folderPath}`);

    if (!fs.existsSync(folderPath)) {
      console.error(`❌ Pasta não encontrada: ${folderPath}`);
      process.exit(1);
    }

    const files = fs.readdirSync(folderPath)
      .filter(file => file.toLowerCase().endsWith('.docx'))
      .map(file => ({
        path: path.join(folderPath, file),
        filename: file
      }));

    if (files.length === 0) {
      console.log('📭 Nenhum arquivo .docx encontrado na pasta');
      return;
    }

    console.log(`📊 Total de arquivos encontrados: ${files.length}`);
    console.log('');

    const outputDir = path.join(folderPath, 'html-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let successful = 0;
    let failed = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`[${i + 1}/${files.length}] Processando: ${file.filename}`);

      let result;
      if (method === 'mammoth') {
        result = await this.convertWithMammoth(file.path, file.filename);
      } else {
        result = await this.convertWithPandoc(file.path, file.filename);
      }

      if (result.success) {
        // Salva arquivo HTML
        const htmlFilename = file.filename.replace(/\.docx$/i, '.html');
        const htmlPath = path.join(outputDir, htmlFilename);
        fs.writeFileSync(htmlPath, result.htmlContent, 'utf-8');

        // Tenta salvar no banco de dados
        const metadata = this.extractMetadataFromFilename(file.filename);
        const routine = {
          ...metadata,
          htmlContent: result.htmlContent,
          conversionMethod: method
        };

        const savedRoutine = await this.saveToDatabase(routine);
        
        console.log(`✅ Convertido: ${htmlFilename}${savedRoutine ? ' (salvo no banco)' : ''}`);
        successful++;
      } else {
        console.log(`❌ Erro: ${file.filename} - ${result.error}`);
        failed++;
      }

      this.results.push(result);
    }

    console.log('');
    console.log('📈 Resumo da conversão:');
    console.log(`✅ Sucessos: ${successful}`);
    console.log(`❌ Falhas: ${failed}`);
    console.log(`📁 Arquivos HTML salvos em: ${outputDir}`);

    // Salva relatório
    const reportPath = path.join(outputDir, 'conversion-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      method,
      total: files.length,
      successful,
      failed,
      results: this.results
    }, null, 2));

    console.log(`📋 Relatório salvo em: ${reportPath}`);
  }
}

// Execução do script
async function main() {
  const args = process.argv.slice(2);
  const folderPath = args[0] || './attached_assets';
  const method = args[1] || 'mammoth';

  if (!['mammoth', 'pandoc'].includes(method)) {
    console.error('❌ Método deve ser "mammoth" ou "pandoc"');
    process.exit(1);
  }

  const converter = new BatchConverter();
  await converter.convertBatch(folderPath, method);
}

// Executa apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { BatchConverter };