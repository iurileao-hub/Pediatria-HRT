#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const API_BASE = 'http://localhost:5000';

async function reprocessRoutinesWithImages() {
  try {
    console.log('🔍 Verificando rotinas que podem conter imagens...');
    
    // Lista de rotinas que provavelmente contêm imagens/diagramas médicos
    const routinesWithImages = [
      'CONCEITOS BÁSICOS DE VENTILAÇÃO MECÂNICA EM PEDIATRIA versão 3.docx',
      'PARADA CARDIORESPIRATÓRIA ROTINAS HRT LUIZ ANTÔNIO.docx',
      'SEQUÊNCIA RÁPIDA DE INTUBAÇÃO ROTINAS HRT RAFAEL.docx',
      'REANIMAÇÃO DO RN EM SALA DE PARTO ROTINAS HRT CARLOS HENRIQUE.docx',
      'TRAUMATISMO CRANIOENCEFÁLICO ROTINAS HRT MANUELA.docx',
      'TRATAMENTO DA CRISE AGUDA DE ASMA FERNANDO ROTINAS HRT.docx'
    ];
    
    const routinesDir = 'attached_assets/Rotinas';
    const htmlOutputDir = path.join(routinesDir, 'html-output');
    
    let processedCount = 0;
    
    for (const docxFile of routinesWithImages) {
      const docxPath = path.join(routinesDir, docxFile);
      const htmlFile = path.basename(docxFile, '.docx') + '.html';
      const htmlPath = path.join(htmlOutputDir, htmlFile);
      
      try {
        // Verificar se o arquivo DOCX existe
        await fs.access(docxPath);
        
        console.log(`📄 Reprocessando: ${docxFile}`);
        
        // Reprocessar com Pandoc e extração de imagens
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);
        
        const mediaDir = path.join(routinesDir, `media-temp-${Date.now()}`);
        const command = `cd "${routinesDir}" && pandoc "${docxFile}" -t html --extract-media="${mediaDir}" -o "${htmlFile}"`;
        
        await execAsync(command);
        
        // Verificar se há imagens extraídas
        let htmlContent = await fs.readFile(htmlPath, 'utf-8');
        const extractedImages = [];
        
        try {
          const mediaPath = path.join(mediaDir, 'media');
          const files = await fs.readdir(mediaPath).catch(() => []);
          
          for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg|gif|bmp)$/i)) {
              const imagePath = path.join(mediaPath, file);
              const imageBuffer = await fs.readFile(imagePath);
              const ext = path.extname(file).toLowerCase();
              const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
              const base64Data = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
              
              // Substituir referência da imagem no HTML
              htmlContent = htmlContent.replace(
                new RegExp(`media/${file}`, 'g'), 
                base64Data
              );
              
              extractedImages.push(file);
            }
          }
          
          // Salvar HTML atualizado
          if (extractedImages.length > 0) {
            await fs.writeFile(htmlPath, htmlContent, 'utf-8');
            console.log(`  ✅ Extraídas ${extractedImages.length} imagens: ${extractedImages.join(', ')}`);
          } else {
            console.log(`  ℹ️ Nenhuma imagem encontrada`);
          }
          
          // Limpar diretório temporário
          await execAsync(`rm -rf "${mediaDir}"`).catch(() => {});
          
        } catch (error) {
          console.log(`  ⚠️ Erro ao processar imagens: ${error.message}`);
        }
        
        processedCount++;
        
      } catch (error) {
        console.log(`  ❌ Arquivo não encontrado: ${docxFile}`);
      }
    }
    
    console.log(`\n📊 Resumo:`);
    console.log(`✅ Rotinas reprocessadas: ${processedCount}`);
    console.log(`💡 As imagens agora estão embarcadas diretamente no HTML como base64`);
    console.log(`💡 Isso significa que todas as imagens aparecerão nas páginas de rotinas`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

reprocessRoutinesWithImages();