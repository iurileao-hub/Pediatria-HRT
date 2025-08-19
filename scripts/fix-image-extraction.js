#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testImageConversion() {
  try {
    console.log('🔍 Testando conversão de imagens...');
    
    const docxFile = 'attached_assets/Rotinas/PARADA CARDIORESPIRATÓRIA ROTINAS HRT LUIZ ANTÔNIO.docx';
    const tempId = Date.now();
    const mediaDir = `attached_assets/Rotinas/temp-media-${tempId}`;
    const htmlFile = `attached_assets/Rotinas/test-pcr-${tempId}.html`;
    
    // 1. Converter com Pandoc e extrair imagens
    console.log('📄 Convertendo com Pandoc...');
    const command = `cd "attached_assets/Rotinas" && pandoc "PARADA CARDIORESPIRATÓRIA ROTINAS HRT LUIZ ANTÔNIO.docx" -t html --extract-media="temp-media-${tempId}" -o "test-pcr-${tempId}.html"`;
    await execAsync(command);
    
    // 2. Ler HTML gerado
    let htmlContent = await fs.readFile(htmlFile, 'utf-8');
    console.log('📖 HTML original gerado');
    
    // 3. Processar imagens extraídas
    const mediaPath = path.join(mediaDir, 'media');
    let imageCount = 0;
    
    try {
      const files = await fs.readdir(mediaPath);
      console.log(`🖼️ Imagens encontradas: ${files.join(', ')}`);
      
      for (const file of files) {
        if (file.match(/\.(png|jpg|jpeg|gif|bmp|wmf|emf)$/i)) {
          try {
            const imagePath = path.join(mediaPath, file);
            const imageBuffer = await fs.readFile(imagePath);
            const ext = path.extname(file).toLowerCase();
            
            let mimeType = 'image/jpeg';
            if (ext === '.png') mimeType = 'image/png';
            else if (ext === '.gif') mimeType = 'image/gif';
            else if (ext === '.bmp') mimeType = 'image/bmp';
            
            const base64Data = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
            console.log(`🔄 Convertendo ${file} para base64 (${imageBuffer.length} bytes)`);
            
            // Substituir todas as referências da imagem no HTML
            const patterns = [
              new RegExp(`temp-media-${tempId}/media/${file}`, 'g'),
              new RegExp(`media/${file}`, 'g'),
              new RegExp(file, 'g')
            ];
            
            let replacements = 0;
            for (const pattern of patterns) {
              const matches = htmlContent.match(pattern);
              if (matches) {
                htmlContent = htmlContent.replace(pattern, base64Data);
                replacements += matches.length;
              }
            }
            
            console.log(`  ✅ ${replacements} substituições feitas para ${file}`);
            imageCount++;
            
          } catch (err) {
            console.log(`  ❌ Erro ao processar ${file}: ${err.message}`);
          }
        }
      }
      
    } catch (err) {
      console.log('⚠️ Nenhuma pasta de mídia encontrada');
    }
    
    // 4. Salvar HTML com imagens embarcadas
    const finalHtmlFile = `attached_assets/Rotinas/test-pcr-final-${tempId}.html`;
    await fs.writeFile(finalHtmlFile, htmlContent, 'utf-8');
    
    console.log(`📁 Arquivo final salvo: ${finalHtmlFile}`);
    console.log(`🖼️ Total de imagens processadas: ${imageCount}`);
    
    // 5. Verificar se as imagens aparecem no HTML final
    const imgTags = htmlContent.match(/<img[^>]*>/g) || [];
    console.log(`🏷️ Tags de imagem no HTML final: ${imgTags.length}`);
    
    if (imgTags.length > 0) {
      console.log('📋 Exemplos de tags img encontradas:');
      imgTags.slice(0, 3).forEach((tag, i) => {
        console.log(`  ${i + 1}. ${tag.substring(0, 100)}...`);
      });
    }
    
    // 6. Limpar arquivos temporários
    await execAsync(`rm -rf "${mediaDir}"`).catch(() => {});
    await fs.unlink(htmlFile).catch(() => {});
    
    console.log('\n✅ Teste de conversão completo!');
    console.log(`💡 Para verificar: abra o arquivo ${finalHtmlFile} no navegador`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

testImageConversion();