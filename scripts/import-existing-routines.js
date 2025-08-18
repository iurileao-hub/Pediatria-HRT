import fs from 'fs';
import path from 'path';

// Mapear nomes de arquivos para títulos limpos e categorias corretas
const routineMap = {
  "ACIDENTES POR ANIMAIS PEÇONHENTOS ROTINAS HRT LUIZ ANTÔNIO": {
    title: "Acidentes por Animais Peçonhentos",
    author: "Dr. Luiz Antônio",
    category: "Emergência"
  },
  "ADENOMEGALIAS ROTINAS HRT MARCO FINAL": {
    title: "Adenomegalias",
    author: "Dr. Marco",
    category: "Geral"
  },
  "AFOGAMENTO ROTINAS HRT BÁRBARA": {
    title: "Afogamento",
    author: "Dra. Bárbara",
    category: "Emergência"
  },
  "ALERGIA A PROTEÍNA DO LEITE DE VACA ROTINAS HRT ANA LUIZA": {
    title: "Alergia à Proteína do Leite de Vaca",
    author: "Dra. Ana Luiza",
    category: "Gastroenterologia"
  },
  "ALIMENTAÇÃO NOS 2 PRIMEIROS ANOS DE VIDA ROTINAS HRT BÁRBARA": {
    title: "Alimentação nos 2 Primeiros Anos de Vida",
    author: "Dra. Bárbara",
    category: "Neonatologia"
  },
  "ANEMIA FALCIFORME ROTINAS HRT FABRÍCIO": {
    title: "Anemia Falciforme",
    author: "Dr. Fabrício",
    category: "Hematologia"
  },
  "ANEMIA FERROPRIVA ROTINAS HRT ANA LUISA": {
    title: "Anemia Ferropriva",
    author: "Dra. Ana Luísa",
    category: "Hematologia"
  },
  "ARTRITE ABORDAGEM INICIAL ROTINAS HRT DANIA": {
    title: "Artrite - Abordagem Inicial",
    author: "Dra. Dania",
    category: "Reumatologia"
  },
  "ARTRITE SÉPTICA ROTINAS HRT DANIA": {
    title: "Artrite Séptica",
    author: "Dra. Dania",
    category: "Infectologia"
  },
  "ARTRITES REATIVAS OU REACIONAIS ROTINAS HRT DANIA": {
    title: "Artrites Reativas ou Reacionais",
    author: "Dra. Dania",
    category: "Reumatologia"
  },
  "CEFALÉIAS ROTINAS HRT MANUELA": {
    title: "Cefaléias",
    author: "Dra. Manuela",
    category: "Neurologia"
  },
  "CETOACIDOSE DIABÉTICA ROTINAS HRT ROBERTA VERSÃO FINAL": {
    title: "Cetoacidose Diabética",
    author: "Dra. Roberta",
    category: "Endocrinologia"
  },
  "CHOQUE SÉPTICO E AMINAS VASOATIVAS ROTINAS HRT RAFAEL": {
    title: "Choque Séptico e Aminas Vasoativas",
    author: "Dr. Rafael",
    category: "Emergência"
  },
  "CONCEITOS BÁSICOS DE VENTILAÇÃO MECÂNICA EM PEDIATRIA versão 3": {
    title: "Conceitos Básicos de Ventilação Mecânica em Pediatria",
    author: "Equipe HRT",
    category: "Pneumologia"
  },
  "CONSTIPAÇÃO INTESTINAL ROTINAS HRT ANA BEATRIZ": {
    title: "Constipação Intestinal",
    author: "Dra. Ana Beatriz",
    category: "Gastroenterologia"
  },
  "CONVULSÃO FEBRIL ROTINAS HRT MANUELA": {
    title: "Convulsão Febril",
    author: "Dra. Manuela",
    category: "Neurologia"
  },
  "COQUELUCHE ROTINAS HRT FRANCISCO": {
    title: "Coqueluche",
    author: "Dr. Francisco",
    category: "Infectologia"
  },
  "CRISE HIPOXIA ROTINAS HRT LUCIANY": {
    title: "Crise de Hipóxia",
    author: "Dra. Luciany",
    category: "Cardiologia"
  },
  "CRUPE ROTINAS HRT RENATO": {
    title: "Crupe",
    author: "Dr. Renato",
    category: "Pneumologia"
  },
  "DENGUE E OUTRAS ARBOVIROSES - corrigida - MARCO - Copia": {
    title: "Dengue e Outras Arboviroses",
    author: "Dr. Marco",
    category: "Infectologia"
  },
  "DERRAMES PLEURAIS ROTINAS HRT FERNANDO": {
    title: "Derrames Pleurais",
    author: "Dr. Fernando",
    category: "Pneumologia"
  },
  "DESCONFORTO RESPIRATÓRIO DO LACTENTE - BRONQUIOLITE VIRAL AGUDA ROTINAS HRT KFFURI": {
    title: "Bronquiolite Viral Aguda",
    author: "Dr. Kffuri",
    category: "Pneumologia"
  },
  "DESIDRATAÇÃO HIPERNATRÊMICA NO RN ROTINAS HRT CIDA": {
    title: "Desidratação Hipernatrêmica no RN",
    author: "Dra. Cida",
    category: "Neonatologia"
  },
  "DIARREIA INFECCIOSA ROTINAS HRT": {
    title: "Diarreia Infecciosa",
    author: "Equipe HRT",
    category: "Infectologia"
  },
  "DIARRÉIA AGUDA ROTINAS HRT SÉRGIO": {
    title: "Diarreia Aguda",
    author: "Dr. Sérgio",
    category: "Gastroenterologia"
  },
  "DISTÚRBIO METABÓLICO LITÍSE RENAL CÓLICA NEFRÉTICA ROTINAS HRT FABRÍCIO": {
    title: "Litíase Renal e Cólica Nefrética",
    author: "Dr. Fabrício",
    category: "Nefrologia"
  },
  "DISTÚRBIOS ELETROLÍTICOS ROTINAS HRT  CHICO": {
    title: "Distúrbios Eletrolíticos",
    author: "Dr. Francisco",
    category: "Nefrologia"
  },
  "DISTÚRBIOS ÁCIDO BÁSICOS ROTINAS HRT CHICO FINAL": {
    title: "Distúrbios Ácido-Básicos",
    author: "Dr. Francisco",
    category: "Nefrologia"
  },
  "DOENÇA DE KAWASAKI ROTINAS HRT DANIA": {
    title: "Doença de Kawasaki",
    author: "Dra. Dania",
    category: "Cardiologia"
  },
  "DOENÇA DO REFLUXO GASTROESOFÁGICO ROTINAS HRT CHICO FINAL": {
    title: "Doença do Refluxo Gastroesofágico",
    author: "Dr. Francisco",
    category: "Gastroenterologia"
  },
  "DOR ABDOMINAL AGUDA - ABORDAGEM INICIAL ROTINAS HRT ANA LUIZA": {
    title: "Dor Abdominal Aguda - Abordagem Inicial",
    author: "Dra. Ana Luiza",
    category: "Gastroenterologia"
  },
  "DOR DE CRESCIMENTO ROTINAS HRT DANIA": {
    title: "Dor de Crescimento",
    author: "Dra. Dania",
    category: "Reumatologia"
  },
  "EMERGÊNCIA DO CHOQUE ROTINAS HRT LUIZ ANTÔNIO": {
    title: "Emergência do Choque",
    author: "Dr. Luiz Antônio",
    category: "Emergência"
  },
  "EMERGÊNCIA RESPIRATÓRIA ROTINAS HRT LUIZ ANTÔNIO": {
    title: "Emergência Respiratória",
    author: "Dr. Luiz Antônio",
    category: "Emergência"
  },
  "ENDOCARDITE INFECCIOSA LUCIANY ROTINAS HRT": {
    title: "Endocardite Infecciosa",
    author: "Dra. Luciany",
    category: "Cardiologia"
  },
  "EPILEPSIA E ESTADO DE MAL ROTINAS HRT MANUELA": {
    title: "Epilepsia e Estado de Mal",
    author: "Dra. Manuela",
    category: "Neurologia"
  },
  "FEBRE NO RECEM NASCIDO ROTINAS HRT CIDA": {
    title: "Febre no Recém-Nascido",
    author: "Dra. Cida",
    category: "Neonatologia"
  },
  "FEBRE REUMÁTICA ROTINAS HRT DANIA": {
    title: "Febre Reumática",
    author: "Dra. Dania",
    category: "Cardiologia"
  },
  "FÓRMULAS LÁCTEAS ROTINAS HRT CHICO": {
    title: "Fórmulas Lácteas",
    author: "Dr. Francisco",
    category: "Neonatologia"
  },
  "GLOMERULONEFRITE DIFUSA AGUDA ROTINAS HRT FABRÍCIO": {
    title: "Glomerulonefrite Difusa Aguda",
    author: "Dr. Fabrício",
    category: "Nefrologia"
  },
  "HEMATÚRIA ABORDAGEM INICIAL ROTINAS HRT FABRÍCIO": {
    title: "Hematúria - Abordagem Inicial",
    author: "Dr. Fabrício",
    category: "Nefrologia"
  },
  "HEPATITES VIRAIS ROTINAS HRT MARCO": {
    title: "Hepatites Virais",
    author: "Dr. Marco",
    category: "Infectologia"
  },
  "HIDRATAÇÃO VENOSA NO RN ROTINAS HRT CARLOS HENRIQUE": {
    title: "Hidratação Venosa no RN",
    author: "Dr. Carlos Henrique",
    category: "Neonatologia"
  },
  "HIPERTENSÃO ARTERIAL NA INFÂNCIA ROTINAS HRT LUCIANY": {
    title: "Hipertensão Arterial na Infância",
    author: "Dra. Luciany",
    category: "Cardiologia"
  },
  "ICTERICIA NEONATAL ROTINAS HRT CIDA": {
    title: "Icterícia Neonatal",
    author: "Dra. Cida",
    category: "Neonatologia"
  },
  "INFECÇÕES TEGUMENTARES E MIOSITES ROTINAS HRT MARCO E IURI": {
    title: "Infecções Tegumentares e Miosites",
    author: "Dr. Marco e Dr. Iuri",
    category: "Infectologia"
  },
  "INSUFICIÊNCIA CARDÍACA CONGESTIVA - ICC ROTINAS HRT LUCIANY (1)": {
    title: "Insuficiência Cardíaca Congestiva",
    author: "Dra. Luciany",
    category: "Cardiologia"
  },
  "INSUFICIÊNCIA RESPIRATÓRIA NO RN ROTINAS HRT CIDA": {
    title: "Insuficiência Respiratória no RN",
    author: "Dra. Cida",
    category: "Neonatologia"
  },
  "INSULINOTERAPIA ROTINAS HRT ROBERTA": {
    title: "Insulinoterapia",
    author: "Dra. Roberta",
    category: "Endocrinologia"
  },
  "INTOXICAÇÕES AGUDAS ROTINAS HRT ANA LUIZA": {
    title: "Intoxicações Agudas",
    author: "Dra. Ana Luiza",
    category: "Emergência"
  },
  "IVAS 1 - FARINGOTONSILITE AGUDA ROTINAS HRT RENATO": {
    title: "IVAS 1 - Faringotonsilite Aguda",
    author: "Dr. Renato",
    category: "Pneumologia"
  },
  "IVAS 2 - OTITE MEDIA AGUDA ROTINAS HRT RENATO": {
    title: "IVAS 2 - Otite Média Aguda",
    author: "Dr. Renato",
    category: "Pneumologia"
  },
  "IVAS 3 - RINOSSINUSITE AGUDA ROTINAS HRT RENATO": {
    title: "IVAS 3 - Rinossinusite Aguda",
    author: "Dr. Renato",
    category: "Pneumologia"
  },
  "LEISHMANIOSE VISCERAL ROTINAS HRT IURI": {
    title: "Leishmaniose Visceral",
    author: "Dr. Iuri",
    category: "Infectologia"
  },
  "MASTOIDITE ROTINAS HRT MARCO": {
    title: "Mastoidite",
    author: "Dr. Marco",
    category: "Infectologia"
  },
  "MAUS TRATOS E ABUSO SEXUAL ROTINAS HRT RENATO FINAL": {
    title: "Maus Tratos e Abuso Sexual",
    author: "Dr. Renato",
    category: "Geral"
  },
  "MENINGITES BACTERIANAS ROTINAS HRT MARCO": {
    title: "Meningites Bacterianas",
    author: "Dr. Marco",
    category: "Infectologia"
  },
  "MONONUCLEOSE INFECCIOSA ROTINAS HRT MARCO": {
    title: "Mononucleose Infecciosa",
    author: "Dr. Marco",
    category: "Infectologia"
  },
  "OBSTRUÇÃO DE VIA AÉREA POR CORPO ESTRANHO ROTINAS HRT LUIZ ANTÔNIO": {
    title: "Obstrução de Via Aérea por Corpo Estranho",
    author: "Dr. Luiz Antônio",
    category: "Emergência"
  },
  "OSTEOMIELITE ROTINAS HRT FABRÍCIO": {
    title: "Osteomielite",
    author: "Dr. Fabrício",
    category: "Infectologia"
  },
  "PARADA CARDIORESPIRATÓRIA ROTINAS HRT LUIZ ANTÔNIO": {
    title: "Parada Cardiorespiratória",
    author: "Dr. Luiz Antônio",
    category: "Emergência"
  },
  "PARASITOSES INTESTINAIS ROTINAS HRT ANA LUIZA": {
    title: "Parasitoses Intestinais",
    author: "Dra. Ana Luiza",
    category: "Infectologia"
  },
  "PNEUMONIAS BACTERIANAS ROTINAS HRT FERNANDO REVISADA 2024": {
    title: "Pneumonias Bacterianas",
    author: "Dr. Fernando",
    category: "Pneumologia"
  },
  "PRIMOINFECÇÃO E ENCEFALITE HERPÉTICA ROTINAS HRT IURI": {
    title: "Primoinfecção e Encefalite Herpética",
    author: "Dr. Iuri",
    category: "Infectologia"
  },
  "PUNÇÃO LOMBAR ROTINAS HRT MANUELA": {
    title: "Punção Lombar",
    author: "Dra. Manuela",
    category: "Neurologia"
  },
  "PÚRPURA DE HENOCH SCHÖLEIN ROTINAS HRT DANIA": {
    title: "Púrpura de Henoch-Schönlein",
    author: "Dra. Dania",
    category: "Reumatologia"
  },
  "PÚRPURA TROMBOCITOPÊNICA IMUNOLÓGICA ROTINAS HRT DANIA E FABRÍCIO": {
    title: "Púrpura Trombocitopênica Imunológica",
    author: "Dra. Dania e Dr. Fabrício",
    category: "Hematologia"
  },
  "REANIMAÇÃO DO RN EM SALA DE PARTO ROTINAS HRT CARLOS HENRIQUE": {
    title: "Reanimação do RN em Sala de Parto",
    author: "Dr. Carlos Henrique",
    category: "Neonatologia"
  },
  "SEQUÊNCIA RÁPIDA DE INTUBAÇÃO ROTINAS HRT RAFAEL": {
    title: "Sequência Rápida de Intubação",
    author: "Dr. Rafael",
    category: "Emergência"
  },
  "SÍNDROME NEFRÓTICA ROTINAS HRT DANIA": {
    title: "Síndrome Nefrótica",
    author: "Dra. Dania",
    category: "Nefrologia"
  },
  "TRAUMATISMO CRANIOENCEFÁLICO ROTINAS HRT MANUELA": {
    title: "Traumatismo Cranioencefálico",
    author: "Dra. Manuela",
    category: "Neurologia"
  },
  "TUBERCULOSE NA INFÂNCIA ROTINAS HRT FERNANDO": {
    title: "Tuberculose na Infância",
    author: "Dr. Fernando",
    category: "Pneumologia"
  },
  "URTICÁRIA ANGIOEDEMA ANAFILAXIA ROTINAS HRT CRISTIANNE": {
    title: "Urticária, Angioedema e Anafilaxia",
    author: "Dra. Cristianne",
    category: "Alergia e Imunologia"
  },
  "VARICELA ROTINAS HRT MARCO": {
    title: "Varicela",
    author: "Dr. Marco",
    category: "Infectologia"
  }
};

async function importRoutines() {
  const htmlDir = './attached_assets/Rotinas/html-output';
  const routines = [];
  let successCount = 0;
  let errorCount = 0;

  try {
    console.log('🔍 Lendo arquivos HTML convertidos...');
    
    const files = fs.readdirSync(htmlDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`📁 Encontrados ${htmlFiles.length} arquivos HTML`);

    for (const file of htmlFiles) {
      try {
        const filename = path.basename(file, '.html');
        const routineInfo = routineMap[filename];
        
        if (!routineInfo) {
          console.warn(`⚠️  Mapeamento não encontrado para: ${filename}`);
          continue;
        }

        const htmlContent = fs.readFileSync(path.join(htmlDir, file), 'utf8');
        
        const routine = {
          title: routineInfo.title,
          author: routineInfo.author,
          category: routineInfo.category,
          htmlContent: htmlContent,
          conversionMethod: 'pandoc',
          originalFilename: filename + '.docx'
        };

        // Fazer requisição POST para criar a rotina
        const response = await fetch('http://localhost:5000/api/routines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(routine)
        });

        if (response.ok) {
          const createdRoutine = await response.json();
          console.log(`✅ Rotina criada: ${routine.title} (ID: ${createdRoutine.id})`);
          successCount++;
        } else {
          console.error(`❌ Erro ao criar rotina ${routine.title}: ${response.statusText}`);
          errorCount++;
        }
      } catch (error) {
        console.error(`❌ Erro ao processar ${file}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Resumo:');
    console.log(`✅ Sucessos: ${successCount}`);
    console.log(`❌ Falhas: ${errorCount}`);

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

importRoutines();