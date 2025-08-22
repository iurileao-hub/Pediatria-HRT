#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

async function updateHtmlContent() {
  const htmlDir = './attached_assets/Rotinas/html-output';
  let successCount = 0;
  let errorCount = 0;
  let notFoundCount = 0;

  try {
    console.log('🔄 Iniciando atualização do htmlContent das rotinas...\n');
    
    // Primeiro, obter todas as rotinas existentes da base de dados
    console.log('📋 Obtendo rotinas existentes da base de dados...');
    const routinesResponse = await fetch('http://localhost:5000/api/routines');
    
    if (!routinesResponse.ok) {
      throw new Error(`Erro ao obter rotinas da API: ${routinesResponse.statusText}`);
    }
    
    const existingRoutines = await routinesResponse.json();
    console.log(`✅ Encontradas ${existingRoutines.length} rotinas na base de dados\n`);
    
    // Criar mapeamento por originalFilename para busca rápida
    const routinesByFilename = new Map();
    existingRoutines.forEach(routine => {
      if (routine.originalFilename) {
        const baseFilename = routine.originalFilename.replace(/\.docx$/i, '');
        routinesByFilename.set(baseFilename, routine);
      }
    });
    
    // Ler arquivos HTML convertidos
    console.log('📁 Lendo arquivos HTML convertidos...');
    const files = fs.readdirSync(htmlDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`📄 Encontrados ${htmlFiles.length} arquivos HTML para processar\n`);

    for (const file of htmlFiles) {
      try {
        const filename = path.basename(file, '.html');
        
        // Buscar a rotina correspondente na base de dados
        const existingRoutine = routinesByFilename.get(filename);
        
        if (!existingRoutine) {
          console.log(`⚠️  Rotina não encontrada na DB para: ${filename}`);
          notFoundCount++;
          continue;
        }

        // Ler o novo conteúdo HTML
        const htmlContent = fs.readFileSync(path.join(htmlDir, file), 'utf8');
        
        console.log(`🔄 Atualizando: ${existingRoutine.title} (ID: ${existingRoutine.id})`);
        
        // Atualizar APENAS o htmlContent via API
        const updateResponse = await fetch(`http://localhost:5000/api/routines/${existingRoutine.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            htmlContent: htmlContent
          })
        });

        if (updateResponse.ok) {
          const updatedRoutine = await updateResponse.json();
          
          // Verificar se há imagens base64 no novo conteúdo
          const base64ImageCount = (htmlContent.match(/data:image\//g) || []).length;
          const imageSuffix = base64ImageCount > 0 ? ` 🖼️ (${base64ImageCount} imagens)` : '';
          
          console.log(`  ✅ Atualizado com sucesso${imageSuffix}`);
          successCount++;
        } else {
          console.error(`  ❌ Erro ao atualizar: ${updateResponse.statusText}`);
          errorCount++;
        }
      } catch (error) {
        console.error(`❌ Erro ao processar ${file}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 RESUMO DA ATUALIZAÇÃO:');
    console.log(`✅ Atualizações bem-sucedidas: ${successCount}`);
    console.log(`❌ Falhas: ${errorCount}`);
    console.log(`⚠️  Não encontradas na DB: ${notFoundCount}`);
    console.log(`📄 Total de arquivos HTML: ${htmlFiles.length}`);
    console.log(`📋 Total de rotinas na DB: ${existingRoutines.length}\n`);
    
    if (successCount > 0) {
      console.log('🎉 Atualização concluída! O conteúdo HTML das rotinas foi atualizado com as novas versões Pandoc.');
      console.log('⚡ Título, autor e categoria foram preservados integralmente.');
    }

  } catch (error) {
    console.error('❌ Erro durante a atualização:', error.message);
    return false;
  }
  
  return successCount > 0;
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  updateHtmlContent()
    .then(success => {
      if (success) {
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

export { updateHtmlContent };