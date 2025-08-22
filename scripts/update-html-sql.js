#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Client } = pkg;

async function updateHtmlContentSQL() {
  const htmlDir = './attached_assets/Rotinas/html-output';
  let successCount = 0;
  let errorCount = 0;
  let notFoundCount = 0;

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔄 Iniciando atualização direta do htmlContent via SQL...\n');
    
    // Conectar à base de dados
    await client.connect();
    console.log('✅ Conectado à base de dados PostgreSQL');
    
    // Obter todas as rotinas existentes
    console.log('📋 Consultando rotinas existentes na base de dados...');
    const routinesResult = await client.query('SELECT id, title, author, category, original_filename FROM routines');
    const existingRoutines = routinesResult.rows;
    console.log(`✅ Encontradas ${existingRoutines.length} rotinas na base de dados\n`);
    
    // Criar mapeamento por originalFilename para busca rápida
    const routinesByFilename = new Map();
    existingRoutines.forEach(routine => {
      if (routine.original_filename) {
        const baseFilename = routine.original_filename.replace(/\.docx$/i, '');
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
        await client.query(
          'UPDATE routines SET html_content = $1, updated_at = NOW() WHERE id = $2',
          [htmlContent, existingRoutine.id]
        );

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
      
      // Contar total de imagens processadas
      const totalImages = await Promise.all(
        htmlFiles.map(async file => {
          try {
            const content = fs.readFileSync(path.join(htmlDir, file), 'utf8');
            return (content.match(/data:image\//g) || []).length;
          } catch { return 0; }
        })
      );
      const sumImages = totalImages.reduce((sum, count) => sum + count, 0);
      console.log(`🖼️ Total de ${sumImages} imagens base64 processadas em ${successCount} rotinas.`);
    }

  } catch (error) {
    console.error('❌ Erro durante a atualização:', error.message);
    return false;
  } finally {
    await client.end();
    console.log('📚 Conexão com base de dados encerrada');
  }
  
  return successCount > 0;
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  updateHtmlContentSQL()
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

export { updateHtmlContentSQL };