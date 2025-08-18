// Script de teste para a conversão de documentos
const fs = require('fs');
const path = require('path');

async function testConversion() {
  try {
    // Lê o arquivo DOCX dos attached_assets
    const filePath = path.join(__dirname, 'attached_assets', 'ACIDENTES POR ANIMAIS PEÇONHENTOS ROTINAS HRT LUIZ ANTÔNIO_1755166839528.docx');
    
    if (!fs.existsSync(filePath)) {
      console.error('Arquivo DOCX não encontrado:', filePath);
      return;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileName = 'ACIDENTES POR ANIMAIS PEÇONHENTOS ROTINAS HRT LUIZ ANTÔNIO.docx';

    // Testa conversão com Mammoth
    console.log('Testando conversão com Mammoth...');
    const formDataMammoth = new FormData();
    const blobMammoth = new Blob([fileBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    formDataMammoth.append('file', blobMammoth, fileName);
    formDataMammoth.append('method', 'mammoth');

    const responseMammoth = await fetch('http://localhost:5000/api/convert/single', {
      method: 'POST',
      body: formDataMammoth,
    });

    if (responseMammoth.ok) {
      const resultMammoth = await responseMammoth.json();
      console.log('✅ Conversão com Mammoth bem-sucedida!');
      console.log('Rotina criada:', resultMammoth.routine.id);
    } else {
      const errorMammoth = await responseMammoth.json();
      console.error('❌ Erro na conversão com Mammoth:', errorMammoth);
    }

    // Testa conversão com Pandoc
    console.log('\nTestando conversão com Pandoc...');
    const formDataPandoc = new FormData();
    const blobPandoc = new Blob([fileBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    formDataPandoc.append('file', blobPandoc, fileName);
    formDataPandoc.append('method', 'pandoc');

    const responsePandoc = await fetch('http://localhost:5000/api/convert/single', {
      method: 'POST',
      body: formDataPandoc,
    });

    if (responsePandoc.ok) {
      const resultPandoc = await responsePandoc.json();
      console.log('✅ Conversão com Pandoc bem-sucedida!');
      console.log('Rotina criada:', resultPandoc.routine.id);
    } else {
      const errorPandoc = await responsePandoc.json();
      console.error('❌ Erro na conversão com Pandoc:', errorPandoc);
    }

    // Lista as rotinas convertidas
    console.log('\nListando rotinas convertidas...');
    const routinesResponse = await fetch('http://localhost:5000/api/routines');
    if (routinesResponse.ok) {
      const routines = await routinesResponse.json();
      console.log(`📄 Total de rotinas: ${routines.length}`);
      routines.forEach(routine => {
        console.log(`- ${routine.title} (${routine.conversionMethod})`);
      });
    }

  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

// Executa o teste apenas se rodado diretamente
if (require.main === module) {
  testConversion();
}

module.exports = { testConversion };