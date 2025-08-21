import { PostgreSQLStorage } from '../server/postgres-storage.js';

// Mapeamento de títulos aproximados para os autores corretos
const authorMap = {
  "ACIDENTES POR ANIMAIS PEÇONHENTOS": "Dr. Luiz Antônio",
  "ADENOMEGALIAS": "Dr. Marco",
  "AFOGAMENTO": "Dra. Bárbara",
  "ALERGIA A PROTEÍNA DO LEITE DE VACA": "Dra. Ana Luiza",
  "ALIMENTAÇÃO NOS 2 PRIMEIROS ANOS DE VIDA": "Dra. Bárbara",
  "ANEMIA FALCIFORME": "Dr. Fabrício",
  "ANEMIA FERROPRIVA": "Dra. Ana Luísa",
  "ARTRITE ABORDAGEM INICIAL": "Dra. Dania",
  "ARTRITE SÉPTICA": "Dra. Dania",
  "ARTRITES REATIVAS OU REACIONAIS": "Dra. Dania",
  "CEFALÉIAS": "Dra. Manuela",
  "CETOACIDOSE DIABÉTICA": "Dra. Roberta",
  "CHOQUE SÉPTICO E AMINAS VASOATIVAS": "Dr. Rafael",
  "CONCEITOS BÁSICOS DE VENTILAÇÃO MECÂNICA EM PEDIATRIA": "Equipe HRT",
  "CONSTIPAÇÃO INTESTINAL": "Dra. Ana Beatriz",
  "CONVULSÃO FEBRIL": "Dra. Manuela",
  "COQUELUCHE": "Dr. Francisco",
  "CRISE DE HIPÓXIA": "Dra. Luciany",
  "CRUPE": "Dr. Renato",
  "DENGUE E OUTRAS ARBOVIROSES": "Dr. Marco",
  "DERRAMES PLEURAIS": "Dr. Fernando",
  "BRONQUIOLITE VIRAL AGUDA": "Dr. Kffuri",
  "DESIDRATAÇÃO HIPERNATRÊMICA NO RN": "Dra. Cida",
  "DIARREIA INFECCIOSA": "Equipe HRT",
  "DIARREIA AGUDA": "Dr. Sérgio",
  "LITÍASE RENAL E CÓLICA NEFRÉTICA": "Dr. Fabrício",
  "DISTÚRBIOS ELETROLÍTICOS": "Dr. Francisco",
  "DISTÚRBIOS ÁCIDO-BÁSICOS": "Dr. Francisco",
  "DOENÇA DE KAWASAKI": "Dra. Dania",
  "DOENÇA DO REFLUXO GASTROESOFÁGICO": "Dr. Francisco",
  "DOR ABDOMINAL AGUDA - ABORDAGEM INICIAL": "Dra. Ana Luiza",
  "DOR DE CRESCIMENTO": "Dra. Dania",
  "EMERGÊNCIA DO CHOQUE": "Dr. Luiz Antônio",
  "EMERGÊNCIA RESPIRATÓRIA": "Dr. Luiz Antônio",
  "ENDOCARDITE INFECCIOSA": "Dra. Luciany",
  "EPILEPSIA E ESTADO DE MAL": "Dra. Manuela",
  "FEBRE NO RECÉM-NASCIDO": "Dra. Cida",
  "FEBRE REUMÁTICA": "Dra. Dania",
  "FÓRMULAS LÁCTEAS": "Dr. Francisco",
  "GLOMERULONEFRITE DIFUSA AGUDA": "Dr. Fabrício",
  "HEMATÚRIA - ABORDAGEM INICIAL": "Dr. Fabrício",
  "HEPATITES VIRAIS": "Dr. Marco",
  "HIDRATAÇÃO VENOSA NO RN": "Dr. Carlos Henrique",
  "HIPERTENSÃO ARTERIAL NA INFÂNCIA": "Dra. Luciany",
  "ICTERÍCIA NEONATAL": "Dra. Cida",
  "INFECÇÕES TEGUMENTARES E MIOSITES": "Dr. Marco e Dr. Iuri",
  "INSUFICIÊNCIA CARDÍACA CONGESTIVA": "Dra. Luciany",
  "INSUFICIÊNCIA RESPIRATÓRIA NO RN": "Dra. Cida",
  "INSULINOTERAPIA": "Dra. Roberta",
  "INTOXICAÇÕES AGUDAS": "Dra. Ana Luiza",
  "IVAS 1 - FARINGOTONSILITE AGUDA": "Dr. Renato",
  "IVAS 2 - OTITE MÉDIA AGUDA": "Dr. Renato",
  "IVAS 3 - RINOSSINUSITE AGUDA": "Dr. Renato",
  "LEISHMANIOSE VISCERAL": "Dr. Iuri",
  "MASTOIDITE": "Dr. Marco",
  "MAUS TRATOS E ABUSO SEXUAL": "Dr. Renato",
  "MENINGITES BACTERIANAS": "Dr. Marco",
  "MONONUCLEOSE INFECCIOSA": "Dr. Marco",
  "OBSTRUÇÃO DE VIA AÉREA POR CORPO ESTRANHO": "Dr. Luiz Antônio",
  "OSTEOMIELITE": "Dr. Fabrício",
  "PARADA CARDIORESPIRATÓRIA": "Dr. Luiz Antônio",
  "PARASITOSES INTESTINAIS": "Dra. Ana Luiza",
  "PNEUMONIAS BACTERIANAS": "Dr. Fernando",
  "PRIMOINFECÇÃO E ENCEFALITE HERPÉTICA": "Dr. Iuri",
  "PUNÇÃO LOMBAR": "Dra. Manuela",
  "PÚRPURA DE HENOCH-SCHÖNLEIN": "Dra. Dania",
  "PÚRPURA TROMBOCITOPÊNICA IMUNOLÓGICA": "Dra. Dania e Dr. Fabrício",
  "REANIMAÇÃO DO RN EM SALA DE PARTO": "Dr. Carlos Henrique",
  "SEQUÊNCIA RÁPIDA DE INTUBAÇÃO": "Dr. Rafael",
  "SÍNDROME NEFRÓTICA": "Dra. Dania",
  "TRAUMATISMO CRANIOENCEFÁLICO": "Dra. Manuela",
  "TUBERCULOSE NA INFÂNCIA": "Dr. Fernando",
  "URTICÁRIA, ANGIOEDEMA E ANAFILAXIA": "Dra. Cristianne",
  "VARICELA": "Dr. Marco"
};

async function updateAuthors() {
  const storage = new PostgreSQLStorage();
  
  try {
    console.log('🔍 Buscando rotinas no banco...');
    const routines = await storage.getAllRoutines();
    
    console.log(`📁 Encontradas ${routines.length} rotinas`);
    
    let successCount = 0;
    let notFoundCount = 0;
    
    for (const routine of routines) {
      try {
        // Procurar o autor correto baseado no título
        const author = findAuthorByTitle(routine.title);
        
        if (author && author !== routine.author) {
          await storage.updateRoutine(routine.id, { author });
          console.log(`✅ ${routine.title} → ${author}`);
          successCount++;
        } else if (!author) {
          console.log(`⚠️  Autor não encontrado para: ${routine.title}`);
          notFoundCount++;
        }
      } catch (error) {
        console.error(`❌ Erro ao atualizar ${routine.title}:`, error.message);
      }
    }
    
    console.log('\n📊 Resumo:');
    console.log(`✅ Atualizados: ${successCount}`);
    console.log(`⚠️  Não encontrados: ${notFoundCount}`);
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

function findAuthorByTitle(title) {
  // Tentar match exato primeiro
  if (authorMap[title]) {
    return authorMap[title];
  }
  
  // Tentar match parcial (remover palavras como "ROTINAS", "HRT", etc.)
  const cleanTitle = title
    .replace(/\s+ROTINAS?\s+HRT\s*/gi, '')
    .replace(/\s+HRT\s*/gi, '')
    .replace(/\s+VERSÃO\s+\d+/gi, '')
    .replace(/\s+FINAL/gi, '')
    .replace(/\s+\(\d+\)/gi, '')
    .replace(/\s+-\s+Copia/gi, '')
    .trim();
  
  // Procurar por título similar
  for (const [key, author] of Object.entries(authorMap)) {
    if (key.includes(cleanTitle) || cleanTitle.includes(key)) {
      return author;
    }
  }
  
  return null;
}

updateAuthors();