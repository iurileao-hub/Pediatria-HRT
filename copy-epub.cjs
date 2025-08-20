const fs = require('fs');
const path = require('path');

// Listar todos os arquivos EPUB
const routinesDir = 'attached_assets/Rotinas';
const files = fs.readdirSync(routinesDir);
const epubFiles = files.filter(f => f.endsWith('.epub'));

console.log('Arquivos EPUB encontrados:');
epubFiles.forEach((file, index) => {
  console.log(`${index + 1}. "${file}"`);
  const fullPath = path.join(routinesDir, file);
  const stats = fs.statSync(fullPath);
  console.log(`   Tamanho: ${stats.size} bytes`);
  console.log(`   Caminho: ${fullPath}`);
  
  // Criar uma cópia com nome simples
  const simpleName = `acidente-animais-${index + 1}.epub`;
  const destPath = path.join(routinesDir, simpleName);
  
  try {
    fs.copyFileSync(fullPath, destPath);
    console.log(`   ✓ Copiado para: ${simpleName}`);
  } catch (error) {
    console.log(`   ✗ Erro ao copiar: ${error.message}`);
  }
  console.log('');
});