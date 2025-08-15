import { RoutineData } from './routine-types';

// Função auxiliar para gerar ID a partir do título
function generateId(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[()]/g, '') // Remove parênteses
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais exceto espaços e hífens
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, ''); // Remove hífens no início e fim
}

export const routineContents: RoutineData[] = [
  // Emergency
  {
    id: generateId("Acidentes por animais peçonhentos"),
    title: "Acidentes por animais peçonhentos",
    author: "Luiz Antônio",
    category: "Emergência",
    content: [
      {
        type: 'paragraph',
        text: 'São aqueles provocados por picadas ou mordeduras de animais dotados de glândulas secretoras e aparelhos inoculadores de veneno.'
      },
      {
        type: 'paragraph',
        text: 'Estes acidentes são de notificação compulsória no Brasil, desde 31 de agosto de 2010, publicado na Portaria Nº 2.472 (ratificada na Portaria Nº 204, de 17 de fevereiro de 2016) ¹.'
      },
      {
        type: 'paragraph',
        text: 'O diagnóstico deve levar em consideração vários aspectos para determinar o tratamento, como o local do acidente, o tempo decorrido até a assistência, os sinais e sintomas iniciais e a evolução destes, os exames laboratoriais e o conhecimento do socorrista.'
      },
      {
        type: 'paragraph',
        text: 'Antes de descrevermos sobre os acidentes é bom entender que para todos os casos o tratamento deve ser geral e específico.'
      },
      {
        type: 'paragraph',
        text: '<strong>Tratamento geral:</strong> consiste em dar suporte no estado de hidratação, analgesia, suporte ventilatório e circulatório, renal e efeitos adversos dos medicamentos usados.'
      },
      {
        type: 'paragraph',
        text: '<strong>Tratamento específico:</strong> o soro contra o veneno será descrito para cada caso, porém devemos saber que a dose calculada deve ser única, não fracionada, IV, diluído ou não e para crianças ou adultos a quantidade é a mesma, varia conforme a gravidade. Não fazer teste de sensibilidade, deve-se fazer pré-medicação com corticoide e anti-histamínico. Se ocorrer anafilaxia o soro deve ser suspenso e o tratamento de suporte respiratório e circulatório deve ser instituído.'
      },
      {
        type: 'paragraph',
        text: 'Os principais animais peçonhentos que causam acidentes graves no Brasil são algumas espécies de serpentes, de escorpiões, de aranhas e lagartas.'
      },
      {
        type: 'paragraph',
        text: 'A reação à picada depende de algumas variáveis como a parte do corpo atingida, a quantidade de veneno injetado, o peso e as comorbidades da vítima, o tempo de início do tratamento e a espécie do animal envolvido.'
      },
      {
        type: 'paragraph',
        text: 'O diagnóstico e a classificação de gravidade são eminentemente clínicos, uma vez que o agente causador do acidente raramente é trazido ao hospital.'
      },
      {
        type: 'paragraph',
        text: 'O tratamento geral e específico depende das reações apresentadas que podem ser leves, moderadas ou graves. Especialistas recomendam às vítimas que recebam o soro o mais rápido possível, de preferência antes das primeiras três horas após o ataque.'
      },
      {
        type: 'paragraph',
        text: '<strong>Operatório:</strong> quando houver necessidade de desbridamento de tecido necrótico ou fasciotomia por síndrome compartimental.'
      },
      {
        type: 'paragraph',
        text: 'A seguir descreveremos os principais acidentes.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Serpentes'
      },
      {
        type: 'paragraph',
        text: 'As cobras venenosas do Brasil são facilmente identificáveis por causa da fosseta loreal que consiste em dois orifícios situados entre a narina e o olho, um em cada lado da cabeça (com exceção da coral verdadeira).'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Acidente Botrópico'
      },
      {
        type: 'paragraph',
        text: 'Causado por serpentes do grupo das jararacas. Causa a maioria dos acidentes com cobras no Brasil – 75% a 85%. O Cerrado é o seu principal habitat. Possuem escamas, é o que as diferencia de outras espécies. Variadas tonalidades de marrom.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Manifestação clínica:'
      },
      {
        type: 'paragraph',
        text: 'Dor e inchaço no local da picada, às vezes com manchas arroxeadas e sangramento no ferimento causado pela picada; podem ocorrer sangramentos em gengivas, pele e urina. As complicações mais importantes são infecção e necrose na região da picada, choque e insuficiência renal.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Classificação e Soroterapia:'
      },
      {
        type: 'table',
        data: {
          headers: ['Classificação', 'Manifestações locais', 'Manifestações sistêmicas', 'Tempo de coagulação', 'Tempo entre acidente e atendimento', 'Soroterapia SAB/SABC/SABL'],
          rows: [
            ['Mínima', 'mínimas ou ausentes', 'ausentes', 'normal', 'menor 6 horas', 'obs'],
            ['Leve', 'discretas', 'ausentes', 'Normal ou alterado', 'menor que 6 horas', '3 ampolas'],
            ['Moderada', 'evidentes', 'Ausentes', 'Normal ou alterado', '6 horas', '6 ampolas'],
            ['Grave', 'intensas', 'presentes', 'alterado', 'maior que 6 horas', '12 ampolas']
          ]
        }
      },
      {
        type: 'paragraph',
        text: '<em>SAB (soro antibotrópico); SABC (soro antibotrópico-crotálico); SABL (soro antibotrópico-laquético)</em>'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Exames laboratoriais:'
      },
      {
        type: 'list',
        items: [
          'Hemograma completo com leucocitose e neutrofilia com desvio para a esquerda;',
          'Ureia e creatinina, CK, DHL, AST, ALT, ureia e creatinina, TS, TP, TTPA, TC;',
          'EAS com proteinúria, hematúria e leucocitúria.'
        ]
      },
      {
        type: 'heading',
        level: 4,
        text: 'Tratamento específico:'
      },
      {
        type: 'paragraph',
        text: 'Sem clínica de envenenamento Botrópico na admissão, com marca da picada presente ou não, dor e edema mínimos ou ausentes, deixar o paciente em observação mínima de 12 horas.'
      },
      {
        type: 'paragraph',
        text: 'Se houver manifestação de envenenamento: Soro antibotrópico (SAB) ou na sua falta pode-se usar o soro antibotrópico-crotálico (SABC) ou soro antibotrópico-Laquético. Se o TC (tempo de coagulação) permanecer alterado após 24h, após a soroterapia, está indicada dose adicional. Para casos leves de 2 a 4 ampolas, moderados de 4 a 8 ampolas e graves 12 ampolas, conforme quadro 1.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Acidente Laquético'
      },
      {
        type: 'paragraph',
        text: 'Causado por surucucu pico de jaca, surucutinga. Causa em torno de 3% dos acidentes com cobras no Brasil. Aparece mais na região da Amazônia, Mata atlântica e em áreas de matas úmidas do Nordeste.'
      },
      {
        type: 'paragraph',
        text: 'Apresentam no corpo desenhos típicos na forma de losangos que alternam entre as cores amarela e preta. Uma importante característica morfológica destas cobras é que na cauda apresenta a última subfileira de escamas modificadas, sendo estas quilhadas e eriçadas além de apresentar um espinho terminal.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Manifestação clínica:'
      },
      {
        type: 'paragraph',
        text: 'Quadro semelhante ao acidente Botrópico, porém com evolução mais rápida e maior intensidade.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Exames laboratoriais:'
      },
      {
        type: 'list',
        items: [
          'Hemograma completo;',
          'TC prolongado;',
          'Ureia e creatinina, eletrólitos e glicemia.'
        ]
      },
      {
        type: 'heading',
        level: 4,
        text: 'Tratamento específico:'
      },
      {
        type: 'paragraph',
        text: 'Soro antilaquético (SAL). Para casos moderados 10 ampolas e graves 20 ampolas.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Acidente Crotálico'
      },
      {
        type: 'paragraph',
        text: 'Causado pela cascavel. Causa em torno de 7% dos acidentes com cobras no Brasil. Habita áreas de matas e campos em grande parte do território brasileiro.'
      },
      {
        type: 'paragraph',
        text: 'Uma das principais características desta cobra é a presença de um chocalho na parte final de sua cauda. Possuem cor marrom escuro com presença de anéis claros e finos na cauda.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Manifestação clínica:'
      },
      {
        type: 'paragraph',
        text: 'Sensação de formigamento no local, sem lesão evidente; os sinais e sintomas sistêmicos são precoces, como: dificuldade de manter os olhos abertos, com aspecto miastênico, visão turva ou dupla, dor e fraqueza muscular generalizadas, podendo evoluir até insuficiência respiratória e hematúria maciça.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Classificação e Soroterapia:'
      },
      {
        type: 'table',
        data: {
          headers: ['Classificação', 'Facies miastênica', 'Mialgia', 'Urina vermelha ou marrom', 'Oligoanúria', 'Tempo de coagulação', 'Soroterapia SAC/SABC'],
          rows: [
            ['Leve', 'Ausente ou tardia', 'Ausente ou discreta', 'Ausente', 'Ausente', 'Normal ou alterado', '5 ampolas'],
            ['Moderado', 'Discreta', 'Discreta', 'Ausente ou discreta', 'Ausente', 'Normal ou alterado', '10 ampolas'],
            ['Grave', 'Evidente', 'Intensa', 'Evidente', 'Ausente ou presente', 'Normal ou alterado', '20 ampolas']
          ]
        }
      },
      {
        type: 'paragraph',
        text: '<em>SAC (soro anticrotálico); SABC (soro antibotrópico-crotálico)</em>'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Exames laboratoriais:'
      },
      {
        type: 'list',
        items: [
          'Hemograma completo – leucocitose com neutrofilia (desvio para esquerda);',
          'TC prolongado;',
          'Ureia e creatinina, AST e ALT, CK, DHL, ácido úrico podem estar elevados quando mais grave;',
          'Fósforo e potássio podem estar elevados e cálcio reduzido quando há oligúria ou anúria;',
          'EAS com mioglobinúria e proteinúria discreta.'
        ]
      },
      {
        type: 'heading',
        level: 4,
        text: 'Tratamento específico:'
      },
      {
        type: 'paragraph',
        text: 'Soro anticrotálico (SAC) ou na sua falta pode-se usar o soro antibotrópico-crotálico (SABC). Para casos leves 5 ampolas, moderados 10 ampolas e graves 20 ampolas.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Acidente Elapídico'
      },
      {
        type: 'paragraph',
        text: 'Causado por coral verdadeira. Corresponde a 1% dos acidentes por cobras no Brasil. É encontrada em matas das regiões sudeste e sul do Brasil.'
      },
      {
        type: 'paragraph',
        text: 'Possui coloração forte e facilmente reconhecida: listrada em preto, vermelho e amarelo. É considerada uma das mais peçonhentas do Brasil em função da alta toxidade de seu veneno. Uma vez picada, a pessoa pode morrer caso não receba atendimento médico rápido.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Manifestação clínica:'
      },
      {
        type: 'paragraph',
        text: 'Os sintomas aparecem rapidamente: fácies miastênica com ptose palpebral, paralisia da musculatura respiratória, oftalmoplegia, paralisia velopalatina, paralisia flácida dos membros, quadro bastante semelhante ao de envenenamento Crotálico, porém, de maior gravidade. O bloqueio da junção mioneural ocorre pós-sinapse.'
      },
      {
        type: 'paragraph',
        text: 'No local da picada não se observa alteração importante.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Exames laboratoriais:'
      },
      {
        type: 'paragraph',
        text: 'Hemograma completo e CK. Conforme a necessidade clínica.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Tratamento específico:'
      },
      {
        type: 'paragraph',
        text: 'Soro antielapídico (SAE) 10 ampolas para todos os casos, devido à gravidade.'
      },
      {
        type: 'alert',
        alertType: 'warning',
        text: '<strong>Atenção:</strong> o bloqueio neuromuscular, causado pelo efeito neurotóxico do veneno, pode levar a insuficiência respiratória precoce e a indicação de anticolinesterásicos podem ser necessários!!! Atropina (amp 0,25 mg) – crianças 0,05 mg/kg e adultos 0,5 mg – IV; Neostigmina (amp 0,5 mg) – crianças 0,05 mg/kg e adultos 0,5 mg – IV'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Escorpiões'
      },
      {
        type: 'paragraph',
        text: 'Dentre os aracnídeos são os que causam mais acidentes. Os escorpiões amarelos (mais graves) e pretos ou marrons estão entre os dois tipos mais venenosos. Um ataque pode ser fatal se acometer uma criança. São pouco agressivos, tem hábitos noturnos, encontram-se em pilhas de madeira e pedras, cercas e residências.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Manifestação clínica:'
      },
      {
        type: 'paragraph',
        text: 'Após a picada ocorre dor de moderada a intensa, formigamento no local. Distúrbio de comportamento, alteração do nível de consciência, tremores, convulsão, náuseas e vômitos, sialorréia, dor abdominal, diarreia, taquipneica, hiperpneia, crepitações, taquicardia e hiper ou hipotensão arterial, sudorese, extremidades frias e pálidas, pulsos finos e tempo de enchimento capilar maior que 3" sugerem gravidade e o paciente deve ser observado de 6 a 12 horas.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Exames laboratoriais:'
      },
      {
        type: 'list',
        items: [
          'Glicemia elevada nas primeiras 4 horas;',
          'Amilase elevada em 80% dos casos;',
          'Leucograma com leucocitose e neutrofilia;',
          'Hiponatremia e hipocalemia;',
          'CK e CKMB elevados; TC crânio pode mostrar áreas de infartos cerebrais;',
          'Rx Tórax pode mostrar aumento de área cardíaca e edema pulmonar uni ou bilateral.'
        ]
      },
      {
        type: 'heading',
        level: 4,
        text: 'Tratamento específico:'
      },
      {
        type: 'paragraph',
        text: 'Soro antiescorpiônico (SAE) nos acidentes leves, a conduta é observação. Nos acidentes moderados, devem ser administrados 2 a 3 ampolas e nos graves de 4 a 6 ampolas.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Aranhas'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Phoneutria (armadeira)'
      },
      {
        type: 'paragraph',
        text: 'Tem hábitos vespertinos e noturnos, são frequentes dentro de residências e na sua periferia. Gosta de ficar em entulhos, material de construção, lenhas e caixas de sapatos; também podem ser encontradas em árvores com grandes folhas e bananeiras. Raramente levam a quadro grave. Suas picadas ocorrem mais nos pés e mãos. É muito agressiva.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Manifestação clínica:'
      },
      {
        type: 'paragraph',
        text: 'Dor com ou sem irradiação e edema local, imediatamente após a picada, parestesia e sudorese. Se surgirem vômitos, hipertensão arterial, dificuldade respiratória, tremores, espasmos musculares devem ser tratados como acidente grave. Pode evoluir para choque e edema pulmonar.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Tratamento específico:'
      },
      {
        type: 'paragraph',
        text: 'Soro antiaracnídeo (SAAr) de 2 a 4 ampolas IV para casos moderados e de 5 a 10 ampolas para casos graves. Crianças devem ser observadas por pelo menos 6 horas.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Loxósceles (aranha marrom)'
      },
      {
        type: 'paragraph',
        text: 'Hábitos noturnos, vive em pilhas de tijolos, telhas, atrás de móveis, cortinas e eventualmente nas roupas, jardins e gramas. São pouco agressivas. Corresponde à forma mais grave dos acidentes por aracnídeos no Brasil. Acomete mais a área central – tronco e membros proximais, ocorre quando está se vestindo.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Manifestação clínica:'
      },
      {
        type: 'paragraph',
        text: 'Em torno de 90% ocorre manifestação local. A dor é fraca nas primeiras 12 horas e depois pode aumentar de intensidade, pode surgir sinais flogísticos formação de bolhas e até necrose seca local que pode durar até duas semanas e de difícil cicatrização. Astenia, febre e cefaleia. Nos casos graves (10%) pode apresentar exantema, prurido, petéquias, mialgia, náuseas e vômitos, visão turva, sonolência, torpor, irritabilidade e coma. Anemia, icterícia e hemoglobinúria.'
      },
      {
        type: 'heading',
        level: 4,
        text: 'Exames laboratoriais:'
      },
      {
        type: 'list',
        items: [
          'Hemograma: anemia, leucocitose e plaquetopenia;',
          'DHL, bilirrubina e reticulócitos elevados;',
          'Ureia e creatinina elevados;',
          'EAS: proteinúria, hematúria e hemoglobinúria.'
        ]
      },
      {
        type: 'heading',
        level: 4,
        text: 'Tratamento específico:'
      },
      {
        type: 'paragraph',
        text: 'Soro antiaracnídeo (SAAr) ou antiloxoscélico (SALo) 5 ampolas para casos graves com manifestações sistêmicas. Nas manifestações locais apenas observação e cuidados locais. Se houver infecção secundária, usar antibioticoterapia.'
      },
      {
        type: 'alert',
        alertType: 'info',
        text: '<strong>Nota importante:</strong> Para todos os acidentes por animais peçonhentos, é fundamental avaliar a situação vacinal antitetânica do paciente e proceder conforme protocolo. Manter sempre vigilância sobre possíveis reações anafiláticas ao soro.'
      }
    ]
  },
  {
    id: generateId("Afogamento"),
    title: "Afogamento",
    author: "Autor a ser definido",
    category: "Emergência",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Choque Séptico (Emergência)"),
    title: "Choque Séptico (Emergência)",
    author: "Autor a ser definido",
    category: "Emergência",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Emergência Respiratória"),
    title: "Emergência Respiratória",
    author: "Autor a ser definido",
    category: "Emergência",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Intoxicações Exógenas Agudas"),
    title: "Intoxicações Exógenas Agudas",
    author: "Autor a ser definido",
    category: "Emergência",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Parada Cardiorrespiratória (PCR)"),
    title: "Parada Cardiorrespiratória (PCR)",
    author: "Autor a ser definido",
    category: "Emergência",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Traumatismo Cranioencefálico (TCE)"),
    title: "Traumatismo Cranioencefálico (TCE)",
    author: "Autor a ser definido",
    category: "Emergência",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Intensive Care
  {
    id: generateId("Choque Séptico (Aminas Vasoativas)"),
    title: "Choque Séptico (Aminas Vasoativas)",
    author: "Autor a ser definido",
    category: "Terapia Intensiva",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Ventilação Mecânica (Conceitos Básicos)"),
    title: "Ventilação Mecânica (Conceitos Básicos)",
    author: "Autor a ser definido",
    category: "Terapia Intensiva",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Distúrbios Ácido-Básicos"),
    title: "Distúrbios Ácido-Básicos",
    author: "Autor a ser definido",
    category: "Terapia Intensiva",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Distúrbios Eletrolíticos"),
    title: "Distúrbios Eletrolíticos",
    author: "Autor a ser definido",
    category: "Terapia Intensiva",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Punção Lombar"),
    title: "Punção Lombar",
    author: "Autor a ser definido",
    category: "Terapia Intensiva",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Neonatology
  {
    id: generateId("Febre no Recém Nascido"),
    title: "Febre no Recém Nascido",
    author: "Autor a ser definido",
    category: "Neonatologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Hidratação Venosa no RN"),
    title: "Hidratação Venosa no RN",
    author: "Autor a ser definido",
    category: "Neonatologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Icterícia Neonatal"),
    title: "Icterícia Neonatal",
    author: "Autor a ser definido",
    category: "Neonatologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Insuficiência Respiratória no RN"),
    title: "Insuficiência Respiratória no RN",
    author: "Autor a ser definido",
    category: "Neonatologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Reanimação Neonatal"),
    title: "Reanimação Neonatal",
    author: "Autor a ser definido",
    category: "Neonatologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Infants
  {
    id: generateId("Alimentação nos 2 primeiros anos de vida"),
    title: "Alimentação nos 2 primeiros anos de vida",
    author: "Autor a ser definido",
    category: "Lactentes",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Desconforto Respiratório do Lactente (Bronquiolite Viral Aguda)"),
    title: "Desconforto Respiratório do Lactente (Bronquiolite Viral Aguda)",
    author: "Autor a ser definido",
    category: "Lactentes",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Fórmulas Lácteas"),
    title: "Fórmulas Lácteas",
    author: "Autor a ser definido",
    category: "Lactentes",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Alergia à Proteína do Leite de Vaca (APLV)"),
    title: "Alergia à Proteína do Leite de Vaca (APLV)",
    author: "Autor a ser definido",
    category: "Lactentes",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Desidratação Hipernatrêmica"),
    title: "Desidratação Hipernatrêmica",
    author: "Autor a ser definido",
    category: "Lactentes",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Cardiology
  {
    id: generateId("Crise de Hipóxia"),
    title: "Crise de Hipóxia",
    author: "Autor a ser definido",
    category: "Cardiologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Doença de Kawasaki"),
    title: "Doença de Kawasaki",
    author: "Autor a ser definido",
    category: "Cardiologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Endocardite Infecciosa"),
    title: "Endocardite Infecciosa",
    author: "Autor a ser definido",
    category: "Cardiologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Febre Reumática (FR)"),
    title: "Febre Reumática (FR)",
    author: "Autor a ser definido",
    category: "Cardiologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Hipertensão Arterial"),
    title: "Hipertensão Arterial",
    author: "Autor a ser definido",
    category: "Cardiologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Insuficiência Cardíaca Congestiva (ICC)"),
    title: "Insuficiência Cardíaca Congestiva (ICC)",
    author: "Autor a ser definido",
    category: "Cardiologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Pneumology
  {
    id: generateId("Asma (Crise Aguda)"),
    title: "Asma (Crise Aguda)",
    author: "Autor a ser definido",
    category: "Pneumologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Crupe"),
    title: "Crupe",
    author: "Autor a ser definido",
    category: "Pneumologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Derrame Pleural"),
    title: "Derrame Pleural",
    author: "Autor a ser definido",
    category: "Pneumologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Obstrução de Via Aérea por Corpo Estranho (OVACE)"),
    title: "Obstrução de Via Aérea por Corpo Estranho (OVACE)",
    author: "Autor a ser definido",
    category: "Pneumologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Pneumonias Bacterianas"),
    title: "Pneumonias Bacterianas",
    author: "Autor a ser definido",
    category: "Pneumologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Tuberculose"),
    title: "Tuberculose",
    author: "Autor a ser definido",
    category: "Pneumologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Hematology, Rheumatology and Nephrology
  {
    id: generateId("Anemia Falciforme"),
    title: "Anemia Falciforme",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Anemia Ferropriva"),
    title: "Anemia Ferropriva",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Artrite (Abordagem Inicial)"),
    title: "Artrite (Abordagem Inicial)",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Artrite Séptica"),
    title: "Artrite Séptica",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Artrites Reativas ou Reacionais"),
    title: "Artrites Reativas ou Reacionais",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Distúrbio Metabólico / Litíase Renal / Cólica Nefrética"),
    title: "Distúrbio Metabólico / Litíase Renal / Cólica Nefrética",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Glomerulonefrite Difusa Aguda (GNDA)"),
    title: "Glomerulonefrite Difusa Aguda (GNDA)",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Hematúria"),
    title: "Hematúria",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Púrpura de Henoch-Schönlein (PHS)"),
    title: "Púrpura de Henoch-Schönlein (PHS)",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Púrpura Trombocitopênica Idiopática (PTI)"),
    title: "Púrpura Trombocitopênica Idiopática (PTI)",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Síndrome Nefrótica (SN)"),
    title: "Síndrome Nefrótica (SN)",
    author: "Autor a ser definido",
    category: "Hematologia, Reumatologia e Nefrologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Infectology
  {
    id: generateId("Coqueluche"),
    title: "Coqueluche",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Dengue e outra Arboviroses"),
    title: "Dengue e outra Arboviroses",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Hepatites Virais"),
    title: "Hepatites Virais",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Infecções Tegumentares e Miosites"),
    title: "Infecções Tegumentares e Miosites",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Leishmaniose Visceral"),
    title: "Leishmaniose Visceral",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Mastoidite"),
    title: "Mastoidite",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Meningites Bacterianas"),
    title: "Meningites Bacterianas",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Mononucleose Infecciosa"),
    title: "Mononucleose Infecciosa",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Osteomielite"),
    title: "Osteomielite",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Parasitoses Intestinais"),
    title: "Parasitoses Intestinais",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Primoinfecção e Encefalite Herpética"),
    title: "Primoinfecção e Encefalite Herpética",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Varicela"),
    title: "Varicela",
    author: "Autor a ser definido",
    category: "Infectologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Gastroenterology
  {
    id: generateId("Constipação Intestinal"),
    title: "Constipação Intestinal",
    author: "Autor a ser definido",
    category: "Gastroenterologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Diarreias Agudas"),
    title: "Diarreias Agudas",
    author: "Autor a ser definido",
    category: "Gastroenterologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Diarreias Infecciosas"),
    title: "Diarreias Infecciosas",
    author: "Autor a ser definido",
    category: "Gastroenterologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Doença do Refluxo Gastroesofágico"),
    title: "Doença do Refluxo Gastroesofágico",
    author: "Autor a ser definido",
    category: "Gastroenterologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Dor Abdominal Aguda"),
    title: "Dor Abdominal Aguda",
    author: "Autor a ser definido",
    category: "Gastroenterologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Endocrinology
  {
    id: generateId("Cetoacidose Diabética"),
    title: "Cetoacidose Diabética",
    author: "Autor a ser definido",
    category: "Endocrinologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Insulinoterapia"),
    title: "Insulinoterapia",
    author: "Autor a ser definido",
    category: "Endocrinologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // Neurology
  {
    id: generateId("Cefaleias"),
    title: "Cefaleias",
    author: "Autor a ser definido",
    category: "Neurologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Epilepsia e Estado de Mal Epiléptico"),
    title: "Epilepsia e Estado de Mal Epiléptico",
    author: "Autor a ser definido",
    category: "Neurologia",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  // General Pediatrics and Puericulture
  {
    id: generateId("Adenomegalias"),
    title: "Adenomegalias",
    author: "Autor a ser definido",
    category: "Pediatria Geral e Puericultura",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Dor de Crescimento"),
    title: "Dor de Crescimento",
    author: "Autor a ser definido",
    category: "Pediatria Geral e Puericultura",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Faringotonsilite Aguda (IVAS 1)"),
    title: "Faringotonsilite Aguda (IVAS 1)",
    author: "Autor a ser definido",
    category: "Pediatria Geral e Puericultura",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Maus Tratos e Abuso Sexual na Infância"),
    title: "Maus Tratos e Abuso Sexual na Infância",
    author: "Autor a ser definido",
    category: "Pediatria Geral e Puericultura",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Otite Média Aguda (IVAS 2)"),
    title: "Otite Média Aguda (IVAS 2)",
    author: "Autor a ser definido",
    category: "Pediatria Geral e Puericultura",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Rinossinusite Aguda (IVAS 3)"),
    title: "Rinossinusite Aguda (IVAS 3)",
    author: "Autor a ser definido",
    category: "Pediatria Geral e Puericultura",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  },
  {
    id: generateId("Urticária / Angioedema / Anafilaxia"),
    title: "Urticária / Angioedema / Anafilaxia",
    author: "Autor a ser definido",
    category: "Pediatria Geral e Puericultura",
    content: [
      {
        type: 'paragraph',
        text: 'Em breve'
      }
    ]
  }
];