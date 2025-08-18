#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const API_BASE = 'http://localhost:5000';

// Função para extrair informações do nome do arquivo
function extractRoutineInfo(filename) {
  const baseName = path.basename(filename, '.html');
  
  // Mapas de categorias médicas baseados em palavras-chave
  const categoryMap = {
    'ACIDENTES': 'Emergência',
    'ADENOMEGALIAS': 'Hematologia',
    'AFOGAMENTO': 'Emergência',
    'ALERGIA': 'Imunologia',
    'ALIMENTAÇÃO': 'Nutrição',
    'ANEMIA': 'Hematologia',
    'ARTRITE': 'Reumatologia',
    'CEFALÉIAS': 'Neurologia',
    'CETOACIDOSE': 'Endocrinologia',
    'CHOQUE': 'Emergência',
    'VENTILAÇÃO': 'Pneumologia',
    'CONSTIPAÇÃO': 'Gastroenterologia',
    'CONVULSÃO': 'Neurologia',
    'COQUELUCHE': 'Infectologia',
    'CRISE': 'Emergência',
    'CRUPE': 'Pneumologia',
    'DENGUE': 'Infectologia',
    'DERRAMES': 'Pneumologia',
    'BRONQUIOLITE': 'Pneumologia',
    'DESIDRATAÇÃO': 'Neonatologia',
    'DIARREIA': 'Gastroenterologia',
    'LITÍASE': 'Nefrologia',
    'DISTÚRBIOS': 'Nefrologia',
    'KAWASAKI': 'Cardiologia',
    'REFLUXO': 'Gastroenterologia',
    'DOR ABDOMINAL': 'Gastroenterologia',
    'DOR DE CRESCIMENTO': 'Reumatologia',
    'EMERGÊNCIA': 'Emergência',
    'ENDOCARDITE': 'Cardiologia',
    'EPILEPSIA': 'Neurologia',
    'FEBRE': 'Infectologia',
    'FÓRMULAS': 'Nutrição',
    'GLOMERULONEFRITE': 'Nefrologia',
    'HEMATÚRIA': 'Nefrologia',
    'HEPATITES': 'Gastroenterologia',
    'HIDRATAÇÃO': 'Neonatologia',
    'HIPERTENSÃO': 'Cardiologia',
    'ICTERÍCIA': 'Neonatologia',
    'INFECÇÕES': 'Infectologia',
    'INSUFICIÊNCIA CARDÍACA': 'Cardiologia',
    'INSUFICIÊNCIA RESPIRATÓRIA': 'Neonatologia',
    'INSULINOTERAPIA': 'Endocrinologia',
    'INTOXICAÇÕES': 'Emergência',
    'IVAS': 'Otorrinolaringologia',
    'LEISHMANIOSE': 'Infectologia',
    'MASTOIDITE': 'Otorrinolaringologia',
    'MAUS TRATOS': 'Emergência',
    'MENINGITES': 'Infectologia',
    'MONONUCLEOSE': 'Infectologia',
    'OBSTRUÇÃO': 'Emergência',
    'OSTEOMIELITE': 'Ortopedia',
    'PARADA': 'Emergência',
    'PARASITOSES': 'Infectologia',
    'PNEUMONIAS': 'Pneumologia',
    'PRIMOINFECÇÃO': 'Infectologia',
    'PUNÇÃO': 'Procedimentos',
    'PÚRPURA': 'Hematologia',
    'REANIMAÇÃO': 'Neonatologia',
    'SEQUÊNCIA': 'Emergência',
    'SÍNDROME NEFRÓTICA': 'Nefrologia',
    'TRAUMATISMO': 'Emergência',
    'TUBERCULOSE': 'Infectologia',
    'URTICÁRIA': 'Imunologia',
    'VARICELA': 'Infectologia',
    'ASMA': 'Pneumologia'
  };
  
  // Extrair título e autor
  let title = baseName;
  let author = 'HRT';
  let category = 'Geral';
  
  // Limpar título
  title = title
    .replace(/ROTINAS HRT.*$/i, '')
    .replace(/\s+(LUIZ ANTÔNIO|MARCO|BÁRBARA|ANA LUIZA|FABRÍCIO|DANIA|MANUELA|ROBERTA|RAFAEL|FRANCISCO|LUCIANY|RENATO|CIDA|CHICO|IURI|CARLOS HENRIQUE|CRISTIANNE|FERNANDO|ANA LUISA|ANA BEATRIZ|SÉRGIO|KFFURI).*$/i, (match, name) => {
      author = `Dr. ${name}`;
      return '';
    })
    .replace(/\s+versão\s+\d+/i, '')
    .replace(/\s+-\s+corrigida.*$/i, '')
    .replace(/\s+FINAL$/i, '')
    .replace(/\s+VERSÃO FINAL$/i, '')
    .replace(/\s+REVISADA \d+$/i, '')
    .replace(/\s+\(\d+\)$/i, '')
    .replace(/\s+-\s+Copia$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Determinar categoria
  for (const [keyword, cat] of Object.entries(categoryMap)) {
    if (title.toUpperCase().includes(keyword)) {
      category = cat;
      break;
    }
  }
  
  return { title, author, category };
}

async function convertWithImages(docxPath, outputPath) {
  const tempId = Date.now();
  const mediaDir = path.join(path.dirname(docxPath), `temp-media-${tempId}`);
  
  try {
    // Executar Pandoc com extração de imagens
    const command = `cd "${path.dirname(docxPath)}" && pandoc "${path.basename(docxPath)}" -t html --extract-media="${mediaDir}" -o "${path.basename(outputPath)}"`;
    await execAsync(command);
    
    // Ler HTML gerado
    let htmlContent = await fs.readFile(outputPath, 'utf-8');
    let imageCount = 0;
    
    // Processar imagens extraídas
    try {
      const mediaPath = path.join(mediaDir, 'media');
      const files = await fs.readdir(mediaPath).catch(() => []);
      
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
            
            // Substituir todas as referências da imagem no HTML
            const patterns = [
              new RegExp(`media/${file}`, 'g'),
              new RegExp(`${mediaDir}/media/${file}`, 'g'),
              new RegExp(file, 'g')
            ];
            
            for (const pattern of patterns) {
              htmlContent = htmlContent.replace(pattern, base64Data);
            }
            
            imageCount++;
          } catch (err) {
            console.log(`    ⚠️ Erro ao processar imagem ${file}: ${err.message}`);
          }
        }
      }
    } catch (err) {
      // Ignorar se não há pasta de mídia
    }
    
    // Salvar HTML atualizado
    await fs.writeFile(outputPath, htmlContent, 'utf-8');
    
    // Limpar diretório temporário
    await execAsync(`rm -rf "${mediaDir}"`).catch(() => {});
    
    return { htmlContent, imageCount };
    
  } catch (error) {
    // Limpar em caso de erro
    await execAsync(`rm -rf "${mediaDir}"`).catch(() => {});
    throw error;
  }
}

async function reconvertAllRoutines() {
  try {
    console.log('🔄 Iniciando reconversão completa com extração de imagens...');
    
    const routinesDir = 'attached_assets/Rotinas';
    const files = await fs.readdir(routinesDir);
    const docxFiles = files.filter(f => f.endsWith('.docx'));
    
    console.log(`📁 Encontrados ${docxFiles.length} arquivos DOCX`);
    
    // Primeiro, limpar rotinas existentes
    console.log('🗑️ Limpando rotinas existentes...');
    try {
      const response = await fetch(`${API_BASE}/api/routines`);
      const existingRoutines = await response.json();
      
      for (const routine of existingRoutines) {
        await fetch(`${API_BASE}/api/routines/${routine.id}`, { method: 'DELETE' });
      }
      console.log(`✅ ${existingRoutines.length} rotinas removidas`);
    } catch (error) {
      console.log('⚠️ Erro ao limpar rotinas existentes:', error.message);
    }
    
    let successCount = 0;
    let totalImages = 0;
    
    for (let i = 0; i < docxFiles.length; i++) {
      const docxFile = docxFiles[i];
      const htmlFile = path.basename(docxFile, '.docx') + '.html';
      const docxPath = path.join(routinesDir, docxFile);
      const htmlPath = path.join(routinesDir, 'html-output', htmlFile);
      
      try {
        console.log(`📄 [${i + 1}/${docxFiles.length}] Convertendo: ${docxFile}`);
        
        // Converter com extração de imagens
        const { htmlContent, imageCount } = await convertWithImages(docxPath, htmlPath);
        
        if (imageCount > 0) {
          console.log(`    🖼️ ${imageCount} imagens extraídas e embarcadas`);
          totalImages += imageCount;
        }
        
        // Extrair informações da rotina
        const { title, author, category } = extractRoutineInfo(htmlFile);
        
        // Criar rotina via API
        const routineData = {
          title,
          author,
          category,
          htmlContent,
          originalFilename: docxFile,
          conversionMethod: 'pandoc'
        };
        
        const response = await fetch(`${API_BASE}/api/routines`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(routineData)
        });
        
        if (response.ok) {
          successCount++;
          console.log(`    ✅ Rotina criada: ${title}`);
        } else {
          const error = await response.text();
          console.log(`    ❌ Erro ao criar rotina: ${error}`);
        }
        
      } catch (error) {
        console.log(`    ❌ Erro na conversão: ${error.message}`);
      }
    }
    
    console.log('\n📊 Resumo da Reconversão:');
    console.log(`✅ Sucessos: ${successCount}/${docxFiles.length}`);
    console.log(`🖼️ Total de imagens extraídas: ${totalImages}`);
    console.log(`💡 Todas as imagens agora estão embarcadas como base64 no HTML`);
    console.log(`💡 As rotinas preservarão suas imagens originais dos documentos DOCX`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

reconvertAllRoutines();