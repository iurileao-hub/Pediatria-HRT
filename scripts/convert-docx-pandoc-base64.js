#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function convertDocxWithPandocBase64() {
  console.log('🔄 Iniciando conversão DOCX para HTML com imagens base64 usando Pandoc...\n');
  
  const routinesDir = path.join(process.cwd(), 'attached_assets', 'Rotinas');
  
  console.log(`📁 Procurando arquivos DOCX em: ${routinesDir}`);
  const outputDir = path.join(routinesDir, 'html-output');
  
  // Criar diretório de output se não existir
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (err) {
    console.error('Erro ao criar diretório de output:', err);
    return;
  }
  
  try {
    // Buscar todos os arquivos DOCX
    const files = await fs.readdir(routinesDir);
    const docxFiles = files.filter(file => file.toLowerCase().endsWith('.docx'));
    
    console.log(`📋 Encontrados ${docxFiles.length} arquivos DOCX para conversão\n`);
    
    const results = [];
    
    for (let i = 0; i < docxFiles.length; i++) {
      const docxFile = docxFiles[i];
      const htmlFile = docxFile.replace(/\.docx$/i, '.html');
      const docxPath = path.join(routinesDir, docxFile);
      const htmlPath = path.join(outputDir, htmlFile);
      
      console.log(`📄 [${i + 1}/${docxFiles.length}] Convertendo: ${docxFile}`);
      
      try {
        // Usar Pandoc para converter DOCX para HTML com imagens base64 embutidas
        const pandocCommand = [
          'pandoc',
          `"${docxPath}"`,
          '-t html',
          '--embed-resources',
          '--standalone',
          '--self-contained',
          '-o', `"${htmlPath}"`
        ].join(' ');
        
        console.log(`  🔧 Executando: ${pandocCommand}`);
        
        const { stdout, stderr } = await execAsync(pandocCommand);
        
        if (stderr) {
          console.log(`  ⚠️ Avisos: ${stderr}`);
        }
        
        // Verificar se o arquivo HTML foi criado
        const stats = await fs.stat(htmlPath);
        const fileSizeKB = (stats.size / 1024).toFixed(2);
        
        console.log(`  ✅ Convertido com sucesso! Tamanho: ${fileSizeKB} KB`);
        
        // Ler o conteúdo HTML para verificar se há imagens
        const htmlContent = await fs.readFile(htmlPath, 'utf-8');
        const base64ImageCount = (htmlContent.match(/data:image\//g) || []).length;
        
        results.push({
          filename: docxFile,
          htmlFile,
          success: true,
          fileSize: stats.size,
          fileSizeKB: fileSizeKB,
          base64ImageCount,
          path: htmlPath
        });
        
        console.log(`  🖼️ Imagens base64 encontradas: ${base64ImageCount}`);
        
      } catch (error) {
        console.log(`  ❌ Erro na conversão: ${error.message}`);
        results.push({
          filename: docxFile,
          htmlFile,
          success: false,
          error: error.message
        });
      }
      
      console.log(''); // linha em branco
    }
    
    // Gerar relatório
    const report = {
      timestamp: new Date().toISOString(),
      totalFiles: docxFiles.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      totalBase64Images: results.filter(r => r.success).reduce((sum, r) => sum + r.base64ImageCount, 0),
      results
    };
    
    const reportPath = path.join(outputDir, 'conversion-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    // Resumo final
    console.log('📊 RESUMO DA CONVERSÃO:');
    console.log(`   Total de arquivos: ${report.totalFiles}`);
    console.log(`   Convertidos com sucesso: ${report.successful}`);
    console.log(`   Falhas: ${report.failed}`);
    console.log(`   Total de imagens base64: ${report.totalBase64Images}`);
    console.log(`   Relatório salvo em: ${reportPath}\n`);
    
    if (report.successful > 0) {
      console.log('🎉 Conversão concluída! Todos os arquivos HTML agora contêm imagens embutidas em base64.');
    }
    
    return report;
    
  } catch (error) {
    console.error('❌ Erro durante a conversão:', error);
    return null;
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  convertDocxWithPandocBase64()
    .then(result => {
      if (result) {
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Erro fatal:', error);
      process.exit(1);
    });
}

export { convertDocxWithPandocBase64 };