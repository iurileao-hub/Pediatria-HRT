#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { eq } from 'drizzle-orm';
import { routines } from '../shared/schema.js';
import { db } from '../server/postgres-storage.js';

async function updateHtmlContentDirect() {
  const htmlDir = './attached_assets/Rotinas/html-output';
  let successCount = 0;
  let errorCount = 0;
  let notFoundCount = 0;

  try {
    console.log('🔄 Iniciando atualização direta do htmlContent na base de dados...\n');
    
    // Obter todas as rotinas existentes da base de dados
    console.log('📋 Consultando rotinas existentes na base de dados...');
    const existingRoutines = await db.select().from(routines);
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
        
        // Atualizar APENAS o htmlContent diretamente na base de dados
        const result = await db
          .update(routines)
          .set({ 
            htmlContent: htmlContent,
            updatedAt: new Date()
          })
          .where(eq(routines.id, existingRoutine.id));

        // Verificar se há imagens base64 no novo conteúdo
        const base64ImageCount = (htmlContent.match(/data:image\//g) || []).length;
        const imageSuffix = base64ImageCount > 0 ? ` 🖼️ (${base64ImageCount} imagens)` : '';
        
        console.log(`  ✅ Atualizado com sucesso${imageSuffix}`);
        successCount++;

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
      console.log(`🖼️ Total de imagens base64 processadas em ${successCount} rotinas.`);
    }

  } catch (error) {
    console.error('❌ Erro durante a atualização:', error.message);
    return false;
  }
  
  return successCount > 0;
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  updateHtmlContentDirect()
    .then(success => {
      if (success) {
        console.log('\n✨ Processo concluído com sucesso!');
        process.exit(0);
      } else {
        console.log('\n❌ Processo finalizado com erros.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Erro fatal:', error);
      process.exit(1);
    });
}

export { updateHtmlContentDirect };