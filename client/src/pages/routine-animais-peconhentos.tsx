import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Moon, Sun } from "lucide-react";

export default function RoutineAnimaisPeconhentos() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    setIsDarkMode(stored === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Header with theme toggle and close button */}
      <div className="fixed top-0 right-0 p-4 z-50 flex gap-3">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <Link href="/routines">
          <button
            className={`p-3 rounded-full transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Title and author */}
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4 leading-tight">
            Acidentes por Animais Peçonhentos
          </h1>
          <p className={`text-xl font-serif italic ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Luiz Antônio
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none font-serif leading-relaxed">
          <div className={`space-y-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            
            <p>
              São aqueles provocados por picadas ou mordeduras de animais dotados de glândulas secretoras e aparelhos inoculadores de veneno.
            </p>

            <p>
              Estes acidentes são de notificação compulsória no Brasil, desde 31 de agosto de 2010, publicado na Portaria Nº 2.472 (ratificada na Portaria Nº 204, de 17 de fevereiro de 2016) ¹.
            </p>

            <p>
              O diagnóstico deve levar em consideração vários aspectos para determinar o tratamento, como o local do acidente, o tempo decorrido até a assistência, os sinais e sintomas iniciais e a evolução destes, os exames laboratoriais e o conhecimento do socorrista.
            </p>

            <p>
              Antes de descrevermos sobre os acidentes é bom entender que para todos os casos o tratamento deve ser geral e específico.
            </p>

            <p>
              <strong>Tratamento geral:</strong> consiste em dar suporte no estado de hidratação, analgesia, suporte ventilatório e circulatório, renal e efeitos adversos dos medicamentos usados.
            </p>

            <p>
              <strong>Tratamento específico:</strong> o soro contra o veneno será descrito para cada caso, porém devemos saber que a dose calculada deve ser única, não fracionada, IV, diluído ou não e para crianças ou adultos a quantidade é a mesma, varia conforme a gravidade. Não fazer teste de sensibilidade, deve-se fazer pré-medicação com corticoide e anti-histamínico. Se ocorrer anafilaxia o soro deve ser suspenso e o tratamento de suporte respiratório e circulatório deve ser instituído.
            </p>

            <p>
              Os principais animais peçonhentos que causam acidentes graves no Brasil são algumas espécies de serpentes, de escorpiões, de aranhas e lagartas.
            </p>

            <p>
              A reação à picada depende de algumas variáveis como a parte do corpo atingida, a quantidade de veneno injetado, o peso e as comorbidades da vítima, o tempo de início do tratamento e a espécie do animal envolvido.
            </p>

            <p>
              O diagnóstico e a classificação de gravidade são eminentemente clínicos, uma vez que o agente causador do acidente raramente é trazido ao hospital.
            </p>

            <p>
              O tratamento geral e específico depende das reações apresentadas que podem ser leves, moderadas ou graves. Especialistas recomendam às vítimas que recebam o soro o mais rápido possível, de preferência antes das primeiras três horas após o ataque.
            </p>

            <p>
              <strong>Operatório:</strong> quando houver necessidade de desbridamento de tecido necrótico ou fasciotomia por síndrome compartimental.
            </p>

            <p>
              A seguir descreveremos os principais acidentes.
            </p>

            <h2 className="text-3xl font-serif font-bold mt-12 mb-6">
              Serpentes
            </h2>

            <p>
              As cobras venenosas do Brasil são facilmente identificáveis por causa da fosseta loreal que consiste em dois orifícios situados entre a narina e o olho, um em cada lado da cabeça (com exceção da coral verdadeira).
            </p>

            <h3 className="text-2xl font-serif font-bold mt-10 mb-4">
              Acidente Botrópico
            </h3>

            <p>
              Causado por serpentes do grupo das jararacas. Causa a maioria dos acidentes com cobras no Brasil – 75% a 85%. O Cerrado é o seu principal habitat. Possuem escamas, é o que as diferencia de outras espécies. Variadas tonalidades de marrom.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Manifestação clínica:
            </h4>

            <p>
              Dor e inchaço no local da picada, às vezes com manchas arroxeadas e sangramento no ferimento causado pela picada; podem ocorrer sangramentos em gengivas, pele e urina. As complicações mais importantes são infecção e necrose na região da picada, choque e insuficiência renal.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Classificação e Soroterapia:
            </h4>

            <div className={`overflow-x-auto mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className="text-left p-2">Classificação</th>
                    <th className="text-left p-2">Manifestações locais</th>
                    <th className="text-left p-2">Manifestações sistêmicas</th>
                    <th className="text-left p-2">Tempo de coagulação</th>
                    <th className="text-left p-2">Tempo entre acidente e atendimento</th>
                    <th className="text-left p-2">Soroterapia SAB/SABC/SABL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="p-2 font-semibold">Mínima</td>
                    <td className="p-2">mínimas ou ausentes</td>
                    <td className="p-2">ausentes</td>
                    <td className="p-2">normal</td>
                    <td className="p-2">menor 6 horas</td>
                    <td className="p-2">obs</td>
                  </tr>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="p-2 font-semibold">Leve</td>
                    <td className="p-2">discretas</td>
                    <td className="p-2">ausentes</td>
                    <td className="p-2">Normal ou alterado</td>
                    <td className="p-2">menor que 6 horas</td>
                    <td className="p-2">3 ampolas</td>
                  </tr>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="p-2 font-semibold">Moderada</td>
                    <td className="p-2">evidentes</td>
                    <td className="p-2">Ausentes</td>
                    <td className="p-2">Normal ou alterado</td>
                    <td className="p-2">6 horas</td>
                    <td className="p-2">6 ampolas</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Grave</td>
                    <td className="p-2">intensas</td>
                    <td className="p-2">presentes</td>
                    <td className="p-2">alterado</td>
                    <td className="p-2">maior que 6 horas</td>
                    <td className="p-2">12 ampolas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm italic">
              SAB (soro antibotrópico); SABC (soro antibotrópico-crotálico); SABL (soro antibotrópico-laquético)
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Exames laboratoriais:
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Hemograma completo com leucocitose e neutrofilia com desvio para a esquerda;</li>
              <li>Ureia e creatinina, CK, DHL, AST, ALT, ureia e creatinina, TS, TP, TTPA, TC;</li>
              <li>EAS com proteinúria, hematúria e leucocitúria.</li>
            </ul>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Tratamento específico:
            </h4>

            <p>
              Sem clínica de envenenamento Botrópico na admissão, com marca da picada presente ou não, dor e edema mínimos ou ausentes, deixar o paciente em observação mínima de 12 horas.
            </p>

            <p>
              Se houver manifestação de envenenamento: Soro antibotrópico (SAB) ou na sua falta pode-se usar o soro antibotrópico-crotálico (SABC) ou soro antibotrópico-Laquético. Se o TC (tempo de coagulação) permanecer alterado após 24h, após a soroterapia, está indicada dose adicional. Para casos leves de 2 a 4 ampolas, moderados de 4 a 8 ampolas e graves 12 ampolas, conforme quadro 1.
            </p>

            <h3 className="text-2xl font-serif font-bold mt-10 mb-4">
              Acidente Laquético
            </h3>

            <p>
              Causado por surucucu pico de jaca, surucutinga. Causa em torno de 3% dos acidentes com cobras no Brasil. Aparece mais na região da Amazônia, Mata atlântica e em áreas de matas úmidas do Nordeste.
            </p>

            <p>
              Apresentam no corpo desenhos típicos na forma de losangos que alternam entre as cores amarela e preta. Uma importante característica morfológica destas cobras é que na cauda apresenta a última subfileira de escamas modificadas, sendo estas quilhadas e eriçadas além de apresentar um espinho terminal.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Manifestação clínica:
            </h4>

            <p>
              Quadro semelhante ao acidente Botrópico, porém com evolução mais rápida e maior intensidade.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Exames laboratoriais:
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Hemograma completo;</li>
              <li>TC prolongado;</li>
              <li>Ureia e creatinina, eletrólitos e glicemia.</li>
            </ul>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Tratamento específico:
            </h4>

            <p>
              Soro antilaquético (SAL). Para casos moderados 10 ampolas e graves 20 ampolas.
            </p>

            <h3 className="text-2xl font-serif font-bold mt-10 mb-4">
              Acidente Crotálico
            </h3>

            <p>
              Causado pela cascavel. Causa em torno de 7% dos acidentes com cobras no Brasil. Habita áreas de matas e campos em grande parte do território brasileiro.
            </p>

            <p>
              Uma das principais características desta cobra é a presença de um chocalho na parte final de sua cauda. Possuem cor marrom escuro com presença de anéis claros e finos na cauda.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Manifestação clínica:
            </h4>

            <p>
              Sensação de formigamento no local, sem lesão evidente; os sinais e sintomas sistêmicos são precoces, como: dificuldade de manter os olhos abertos, com aspecto miastênico, visão turva ou dupla, dor e fraqueza muscular generalizadas, podendo evoluir até insuficiência respiratória e hematúria maciça.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Classificação e Soroterapia:
            </h4>

            <div className={`overflow-x-auto mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className="text-left p-2">Classificação</th>
                    <th className="text-left p-2">Facies miastênica</th>
                    <th className="text-left p-2">Mialgia</th>
                    <th className="text-left p-2">Urina vermelha ou marrom</th>
                    <th className="text-left p-2">Oligoanúria</th>
                    <th className="text-left p-2">Tempo de coagulação</th>
                    <th className="text-left p-2">Soroterapia SAC/SABC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="p-2 font-semibold">Leve</td>
                    <td className="p-2">Ausente ou tardia</td>
                    <td className="p-2">Ausente ou discreta</td>
                    <td className="p-2">Ausente</td>
                    <td className="p-2">Ausente</td>
                    <td className="p-2">Normal ou alterado</td>
                    <td className="p-2">5 ampolas</td>
                  </tr>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="p-2 font-semibold">Moderado</td>
                    <td className="p-2">Discreta</td>
                    <td className="p-2">Discreta</td>
                    <td className="p-2">Ausente ou discreta</td>
                    <td className="p-2">Ausente</td>
                    <td className="p-2">Normal ou alterado</td>
                    <td className="p-2">10 ampolas</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Grave</td>
                    <td className="p-2">Evidente</td>
                    <td className="p-2">Intensa</td>
                    <td className="p-2">Evidente</td>
                    <td className="p-2">Ausente ou presente</td>
                    <td className="p-2">Normal ou alterado</td>
                    <td className="p-2">20 ampolas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm italic">
              SAC (soro anticrotálico); SABC (soro antibotrópico-crotálico)
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Exames laboratoriais:
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Hemograma completo – leucocitose com neutrofilia (desvio para esquerda);</li>
              <li>TC prolongado;</li>
              <li>Ureia e creatinina, AST e ALT, CK, DHL, ácido úrico podem estar elevados quando mais grave;</li>
              <li>Fósforo e potássio podem estar elevados e cálcio reduzido quando há oligúria ou anúria;</li>
              <li>EAS com mioglobinúria e proteinúria discreta.</li>
            </ul>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Tratamento específico:
            </h4>

            <p>
              Soro anticrotálico (SAC) ou na sua falta pode-se usar o soro antibotrópico-crotálico (SABC). Para casos leves 5 ampolas, moderados 10 ampolas e graves 20 ampolas.
            </p>

            <h3 className="text-2xl font-serif font-bold mt-10 mb-4">
              Acidente Elapídico
            </h3>

            <p>
              Causado por coral verdadeira. Corresponde a 1% dos acidentes por cobras no Brasil. É encontrada em matas das regiões sudeste e sul do Brasil.
            </p>

            <p>
              Possui coloração forte e facilmente reconhecida: listrada em preto, vermelho e amarelo. É considerada uma das mais peçonhentas do Brasil em função da alta toxidade de seu veneno. Uma vez picada, a pessoa pode morrer caso não receba atendimento médico rápido.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Manifestação clínica:
            </h4>

            <p>
              Os sintomas aparecem rapidamente: fácies miastênica com ptose palpebral, paralisia da musculatura respiratória, oftalmoplegia, paralisia velopalatina, paralisia flácida dos membros, quadro bastante semelhante ao de envenenamento Crotálico, porém, de maior gravidade. O bloqueio da junção mioneural ocorre pós-sinapse.
            </p>

            <p>
              No local da picada não se observa alteração importante.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Exames laboratoriais:
            </h4>

            <p>
              Hemograma completo e CK. Conforme a necessidade clínica.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Tratamento específico:
            </h4>

            <p>
              Soro antielapídico (SAE) 10 ampolas para todos os casos, devido à gravidade.
            </p>

            <div className={`p-4 my-6 rounded-lg ${isDarkMode ? 'bg-yellow-900/30 border-yellow-600' : 'bg-yellow-50 border-yellow-300'} border`}>
              <p className="font-semibold">
                <strong>Atenção:</strong> o bloqueio neuromuscular, causado pelo efeito neurotóxico do veneno, pode levar a insuficiência respiratória precoce e a indicação de anticolinesterásicos podem ser necessários!!!
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>Atropina (amp 0,25 mg) – crianças 0,05 mg/kg e adultos 0,5 mg – IV</li>
                <li>Neostigmina (amp 0,5 mg) – crianças 0,05 mg/kg e adultos 0,5 mg – IV</li>
              </ul>
            </div>

            <h2 className="text-3xl font-serif font-bold mt-12 mb-6">
              Escorpiões
            </h2>

            <p>
              Dentre os aracnídeos são os que causam mais acidentes. Os escorpiões amarelos (mais graves) e pretos ou marrons estão entre os dois tipos mais venenosos. Um ataque pode ser fatal se acometer uma criança. São pouco agressivos, tem hábitos noturnos, encontram-se em pilhas de madeira e pedras, cercas e residências.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Manifestação clínica:
            </h4>

            <p>
              Após a picada ocorre dor de moderada a intensa, formigamento no local. Distúrbio de comportamento, alteração do nível de consciência, tremores, convulsão, náuseas e vômitos, sialorréia, dor abdominal, diarreia, taquipneica, hiperpneia, crepitações, taquicardia e hiper ou hipotensão arterial, sudorese, extremidades frias e pálidas, pulsos finos e tempo de enchimento capilar maior que 3" sugerem gravidade e o paciente deve ser observado de 6 a 12 horas.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Exames laboratoriais:
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Glicemia elevada nas primeiras 4 horas;</li>
              <li>Amilase elevada em 80% dos casos;</li>
              <li>Leucograma com leucocitose e neutrofilia;</li>
              <li>Hiponatremia e hipocalemia;</li>
              <li>CK e CKMB elevados; TC crânio pode mostrar áreas de infartos cerebrais;</li>
              <li>Rx Tórax pode mostrar aumento de área cardíaca e edema pulmonar uni ou bilateral.</li>
            </ul>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Tratamento específico:
            </h4>

            <p>
              Soro antiescorpiônico (SAE) nos acidentes leves, a conduta é observação. Nos acidentes moderados, devem ser administrados 2 a 3 ampolas e nos graves de 4 a 6 ampolas.
            </p>

            <h2 className="text-3xl font-serif font-bold mt-12 mb-6">
              Aranhas
            </h2>

            <h3 className="text-2xl font-serif font-bold mt-10 mb-4">
              Phoneutria (armadeira)
            </h3>

            <p>
              Tem hábitos vespertinos e noturnos, são frequentes dentro de residências e na sua periferia. Gosta de ficar em entulhos, material de construção, lenhas e caixas de sapatos; também podem ser encontradas em árvores com grandes folhas e bananeiras. Raramente levam a quadro grave. Suas picadas ocorrem mais nos pés e mãos. É muito agressiva.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Manifestação clínica:
            </h4>

            <p>
              Dor com ou sem irradiação e edema local, imediatamente após a picada, parestesia e sudorese. Se surgirem vômitos, hipertensão arterial, dificuldade respiratória, tremores, espasmos musculares devem ser tratados como acidente grave. Pode evoluir para choque e edema pulmonar.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Tratamento específico:
            </h4>

            <p>
              Soro antiaracnídeo (SAAr) de 2 a 4 ampolas IV para casos moderados e de 5 a 10 ampolas para casos graves. Crianças devem ser observadas por pelo menos 6 horas.
            </p>

            <h3 className="text-2xl font-serif font-bold mt-10 mb-4">
              Loxósceles (aranha marrom)
            </h3>

            <p>
              Hábitos noturnos, vive em pilhas de tijolos, telhas, atrás de móveis, cortinas e eventualmente nas roupas, jardins e gramas. São pouco agressivas. Corresponde à forma mais grave dos acidentes por aracnídeos no Brasil. Acomete mais a área central – tronco e membros proximais, ocorre quando está se vestindo.
            </p>

            <h4 className="text-xl font-serif font-semibold mt-8 mb-3">
              Manifestação clínica:
            </h4>

            <p>
              Em torno de 90% ocorre manifestação local. A dor é fraca nas primeiras 12 horas e depois pode aumentar de intensidade, pode surgir sinais flogísticos formação de bolhas e até necrose seca local que pode durar até duas semanas e de difícil cicatrização. Astenia, febre e cefaleia. Nos casos graves (10%) pode apresentar exantema, prurido, petéquias, mialgia, náuseas e vômitos, visão turva, sonolência, torpor, irritabilidade e coma. Anemia, icterícia e hemoglobinúria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}