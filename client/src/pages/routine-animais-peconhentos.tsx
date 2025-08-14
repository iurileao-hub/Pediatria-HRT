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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        color: isDarkMode ? '#f3f4f6' : '#1f2937',
        transition: 'all 0.3s',
        overflow: 'auto',
        zIndex: 1000
      }}
    >
      {/* Header with theme toggle and close button */}
      <div style={{
        position: 'sticky',
        top: '16px',
        right: '16px',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        padding: '16px 16px 0 0'
      }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '12px',
            borderRadius: '50%',
            backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
            color: isDarkMode ? '#fbbf24' : '#374151',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link href="/routines">
          <button
            style={{
              padding: '12px',
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#ffffff' : '#374151',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </Link>
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Title and author */}
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginBottom: '16px',
            lineHeight: '1.2',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Acidentes por Animais Peçonhentos
          </h1>
          <p style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: isDarkMode ? '#d1d5db' : '#4b5563'
          }}>
            Luiz Antônio
          </p>
        </header>

        {/* Content */}
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.125rem',
          lineHeight: '1.7',
          color: isDarkMode ? '#f3f4f6' : '#1f2937'
        }}>
          
          <p style={{ marginBottom: '24px' }}>
            São aqueles provocados por picadas ou mordeduras de animais dotados de glândulas secretoras e aparelhos inoculadores de veneno.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Estes acidentes são de notificação compulsória no Brasil, desde 31 de agosto de 2010, publicado na Portaria Nº 2.472 (ratificada na Portaria Nº 204, de 17 de fevereiro de 2016) ¹.
          </p>

          <p style={{ marginBottom: '24px' }}>
            O diagnóstico deve levar em consideração vários aspectos para determinar o tratamento, como o local do acidente, o tempo decorrido até a assistência, os sinais e sintomas iniciais e a evolução destes, os exames laboratoriais e o conhecimento do socorrista.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Antes de descrevermos sobre os acidentes é bom entender que para todos os casos o tratamento deve ser geral e específico.
          </p>

          <p style={{ marginBottom: '24px' }}>
            <strong>Tratamento geral:</strong> consiste em dar suporte no estado de hidratação, analgesia, suporte ventilatório e circulatório, renal e efeitos adversos dos medicamentos usados.
          </p>

          <p style={{ marginBottom: '24px' }}>
            <strong>Tratamento específico:</strong> o soro contra o veneno será descrito para cada caso, porém devemos saber que a dose calculada deve ser única, não fracionada, IV, diluído ou não e para crianças ou adultos a quantidade é a mesma, varia conforme a gravidade. Não fazer teste de sensibilidade, deve-se fazer pré-medicação com corticoide e anti-histamínico. Se ocorrer anafilaxia o soro deve ser suspenso e o tratamento de suporte respiratório e circulatório deve ser instituído.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Os principais animais peçonhentos que causam acidentes graves no Brasil são algumas espécies de serpentes, de escorpiões, de aranhas e lagartas.
          </p>

          <p style={{ marginBottom: '24px' }}>
            A reação à picada depende de algumas variáveis como a parte do corpo atingida, a quantidade de veneno injetado, o peso e as comorbidades da vítima, o tempo de início do tratamento e a espécie do animal envolvido.
          </p>

          <p style={{ marginBottom: '24px' }}>
            O diagnóstico e a classificação de gravidade são eminentemente clínicos, uma vez que o agente causador do acidente raramente é trazido ao hospital.
          </p>

          <p style={{ marginBottom: '24px' }}>
            O tratamento geral e específico depende das reações apresentadas que podem ser leves, moderadas ou graves. Especialistas recomendam às vítimas que recebam o soro o mais rápido possível, de preferência antes das primeiras três horas após o ataque.
          </p>

          <p style={{ marginBottom: '24px' }}>
            <strong>Operatório:</strong> quando houver necessidade de desbridamento de tecido necrótico ou fasciotomia por síndrome compartimental.
          </p>

          <p style={{ marginBottom: '48px' }}>
            A seguir descreveremos os principais acidentes.
          </p>

          {/* SERPENTES */}
          <h2 style={{
            fontSize: '2rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '48px',
            marginBottom: '24px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Serpentes
          </h2>

          <p style={{ marginBottom: '24px' }}>
            As cobras venenosas do Brasil são facilmente identificáveis por causa da fosseta loreal que consiste em dois orifícios situados entre a narina e o olho, um em cada lado da cabeça (com exceção da coral verdadeira).
          </p>

          {/* ACIDENTE BOTRÓPICO */}
          <h3 style={{
            fontSize: '1.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '16px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Acidente Botrópico
          </h3>

          <p style={{ marginBottom: '24px' }}>
            Causado por serpentes do grupo das jararacas. Causa a maioria dos acidentes com cobras no Brasil – 75% a 85%. O Cerrado é o seu principal habitat. Possuem escamas, é o que as diferencia de outras espécies. Variadas tonalidades de marrom.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Manifestação clínica:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Dor e inchaço no local da picada, às vezes com manchas arroxeadas e sangramento no ferimento causado pela picada; podem ocorrer sangramentos em gengivas, pele e urina. As complicações mais importantes são infecção e necrose na região da picada, choque e insuficiência renal.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Classificação e Soroterapia:
          </h4>

          <div style={{
            overflowX: 'auto',
            marginBottom: '24px',
            backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <table style={{
              width: '100%',
              fontSize: '0.875rem',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`
                }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Classificação</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Manifestações locais</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Manifestações sistêmicas</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Tempo de coagulação</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Tempo entre acidente e atendimento</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Soroterapia SAB/SABC/SABL</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}` }}>
                  <td style={{ padding: '8px', fontWeight: '600', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Mínima</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>mínimas ou ausentes</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>ausentes</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>normal</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>menor 6 horas</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>obs</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}` }}>
                  <td style={{ padding: '8px', fontWeight: '600', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Leve</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>discretas</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>ausentes</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Normal ou alterado</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>menor que 6 horas</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>3 ampolas</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}` }}>
                  <td style={{ padding: '8px', fontWeight: '600', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Moderada</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>evidentes</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausentes</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Normal ou alterado</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>6 horas</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>6 ampolas</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', fontWeight: '600', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Grave</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>intensas</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>presentes</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>alterado</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>maior que 6 horas</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>12 ampolas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '24px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
            SAB (soro antibotrópico); SABC (soro antibotrópico-crotálico); SABL (soro antibotrópico-laquético)
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Exames laboratoriais:
          </h4>

          <ul style={{ paddingLeft: '24px', marginBottom: '24px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
            <li style={{ marginBottom: '8px' }}>Hemograma completo com leucocitose e neutrofilia com desvio para a esquerda;</li>
            <li style={{ marginBottom: '8px' }}>Ureia e creatinina, CK, DHL, AST, ALT, ureia e creatinina, TS, TP, TTPA, TC;</li>
            <li style={{ marginBottom: '8px' }}>EAS com proteinúria, hematúria e leucocitúria.</li>
          </ul>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Tratamento específico:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Sem clínica de envenenamento Botrópico na admissão, com marca da picada presente ou não, dor e edema mínimos ou ausentes, deixar o paciente em observação mínima de 12 horas.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Se houver manifestação de envenenamento: Soro antibotrópico (SAB) ou na sua falta pode-se usar o soro antibotrópico-crotálico (SABC) ou soro antibotrópico-Laquético. Se o TC (tempo de coagulação) permanecer alterado após 24h, após a soroterapia, está indicada dose adicional. Para casos leves de 2 a 4 ampolas, moderados de 4 a 8 ampolas e graves 12 ampolas, conforme quadro 1.
          </p>

          {/* ACIDENTE LAQUÉTICO */}
          <h3 style={{
            fontSize: '1.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '16px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Acidente Laquético
          </h3>

          <p style={{ marginBottom: '24px' }}>
            Causado por surucucu pico de jaca, surucutinga. Causa em torno de 3% dos acidentes com cobras no Brasil. Aparece mais na região da Amazônia, Mata atlântica e em áreas de matas úmidas do Nordeste.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Apresentam no corpo desenhos típicos na forma de losangos que alternam entre as cores amarela e preta. Uma importante característica morfológica destas cobras é que na cauda apresenta a última subfileira de escamas modificadas, sendo estas quilhadas e eriçadas além de apresentar um espinho terminal.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Manifestação clínica:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Quadro semelhante ao acidente Botrópico, porém com evolução mais rápida e maior intensidade.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Exames laboratoriais:
          </h4>

          <ul style={{ paddingLeft: '24px', marginBottom: '24px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
            <li style={{ marginBottom: '8px' }}>Hemograma completo;</li>
            <li style={{ marginBottom: '8px' }}>TC prolongado;</li>
            <li style={{ marginBottom: '8px' }}>Ureia e creatinina, eletrólitos e glicemia.</li>
          </ul>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Tratamento específico:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Soro antilaquético (SAL). Para casos moderados 10 ampolas e graves 20 ampolas.
          </p>

          {/* ACIDENTE CROTÁLICO */}
          <h3 style={{
            fontSize: '1.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '16px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Acidente Crotálico
          </h3>

          <p style={{ marginBottom: '24px' }}>
            Causado pela cascavel. Causa em torno de 7% dos acidentes com cobras no Brasil. Habita áreas de matas e campos em grande parte do território brasileiro.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Uma das principais características desta cobra é a presença de um chocalho na parte final de sua cauda. Possuem cor marrom escuro com presença de anéis claros e finos na cauda.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Manifestação clínica:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Sensação de formigamento no local, sem lesão evidente; os sinais e sintomas sistêmicos são precoces, como: dificuldade de manter os olhos abertos, com aspecto miastênico, visão turva ou dupla, dor e fraqueza muscular generalizadas, podendo evoluir até insuficiência respiratória e hematúria maciça.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Classificação e Soroterapia:
          </h4>

          <div style={{
            overflowX: 'auto',
            marginBottom: '24px',
            backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <table style={{
              width: '100%',
              fontSize: '0.875rem',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}` }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Classificação</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Facies miastênica</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Mialgia</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Urina vermelha ou marrom</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Oligoanúria</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Tempo de coagulação</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: isDarkMode ? '#ffffff' : '#1f2937' }}>Soroterapia SAC/SABC</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}` }}>
                  <td style={{ padding: '8px', fontWeight: '600', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Leve</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausente ou tardia</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausente ou discreta</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausente</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausente</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Normal ou alterado</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>5 ampolas</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}` }}>
                  <td style={{ padding: '8px', fontWeight: '600', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Moderado</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Discreta</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Discreta</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausente ou discreta</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausente</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Normal ou alterado</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>10 ampolas</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', fontWeight: '600', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Grave</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Evidente</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Intensa</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Evidente</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Ausente ou presente</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>Normal ou alterado</td>
                  <td style={{ padding: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>20 ampolas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '24px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
            SAC (soro anticrotálico); SABC (soro antibotrópico-crotálico)
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Exames laboratoriais:
          </h4>

          <ul style={{ paddingLeft: '24px', marginBottom: '24px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
            <li style={{ marginBottom: '8px' }}>Hemograma completo – leucocitose com neutrofilia (desvio para esquerda);</li>
            <li style={{ marginBottom: '8px' }}>TC prolongado;</li>
            <li style={{ marginBottom: '8px' }}>Ureia e creatinina, AST e ALT, CK, DHL, ácido úrico podem estar elevados quando mais grave;</li>
            <li style={{ marginBottom: '8px' }}>Fósforo e potássio podem estar elevados e cálcio reduzido quando há oligúria ou anúria;</li>
            <li style={{ marginBottom: '8px' }}>EAS com mioglobinúria e proteinúria discreta.</li>
          </ul>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Tratamento específico:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Soro anticrotálico (SAC) ou na sua falta pode-se usar o soro antibotrópico-crotálico (SABC). Para casos leves 5 ampolas, moderados 10 ampolas e graves 20 ampolas.
          </p>

          {/* ACIDENTE ELAPÍDICO */}
          <h3 style={{
            fontSize: '1.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '16px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Acidente Elapídico
          </h3>

          <p style={{ marginBottom: '24px' }}>
            Causado por coral verdadeira. Corresponde a 1% dos acidentes por cobras no Brasil. É encontrada em matas das regiões sudeste e sul do Brasil.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Possui coloração forte e facilmente reconhecida: listrada em preto, vermelho e amarelo. É considerada uma das mais peçonhentas do Brasil em função da alta toxidade de seu veneno. Uma vez picada, a pessoa pode morrer caso não receba atendimento médico rápido.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Manifestação clínica:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Os sintomas aparecem rapidamente: fácies miastênica com ptose palpebral, paralisia da musculatura respiratória, oftalmoplegia, paralisia velopalatina, paralisia flácida dos membros, quadro bastante semelhante ao de envenenamento Crotálico, porém, de maior gravidade. O bloqueio da junção mioneural ocorre pós-sinapse.
          </p>

          <p style={{ marginBottom: '24px' }}>
            No local da picada não se observa alteração importante.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Exames laboratoriais:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Hemograma completo e CK. Conforme a necessidade clínica.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Tratamento específico:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Soro antielapídico (SAE) 10 ampolas para todos os casos, devido à gravidade.
          </p>

          <div style={{
            padding: '16px',
            margin: '24px 0',
            borderRadius: '8px',
            border: `1px solid ${isDarkMode ? '#fbbf24' : '#f59e0b'}`,
            backgroundColor: isDarkMode ? '#451a03' : '#fef3c7',
            color: isDarkMode ? '#fde68a' : '#92400e'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '12px' }}>
              <strong>Atenção:</strong> o bloqueio neuromuscular, causado pelo efeito neurotóxico do veneno, pode levar a insuficiência respiratória precoce e a indicação de anticolinesterásicos podem ser necessários!!!
            </p>
            <ul style={{ paddingLeft: '24px', margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Atropina (amp 0,25 mg) – crianças 0,05 mg/kg e adultos 0,5 mg – IV</li>
              <li>Neostigmina (amp 0,5 mg) – crianças 0,05 mg/kg e adultos 0,5 mg – IV</li>
            </ul>
          </div>

          {/* ESCORPIÕES */}
          <h2 style={{
            fontSize: '2rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '48px',
            marginBottom: '24px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Escorpiões
          </h2>

          <p style={{ marginBottom: '24px' }}>
            Dentre os aracnídeos são os que causam mais acidentes. Os escorpiões amarelos (mais graves) e pretos ou marrons estão entre os dois tipos mais venenosos. Um ataque pode ser fatal se acometer uma criança. São pouco agressivos, tem hábitos noturnos, encontram-se em pilhas de madeira e pedras, cercas e residências.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Manifestação clínica:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Após a picada ocorre dor de moderada a intensa, formigamento no local. Distúrbio de comportamento, alteração do nível de consciência, tremores, convulsão, náuseas e vômitos, sialorréia, dor abdominal, diarreia, taquipneica, hiperpneia, crepitações, taquicardia e hiper ou hipotensão arterial, sudorese, extremidades frias e pálidas, pulsos finos e tempo de enchimento capilar maior que 3" sugerem gravidade e o paciente deve ser observado de 6 a 12 horas.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Exames laboratoriais:
          </h4>

          <ul style={{ paddingLeft: '24px', marginBottom: '24px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
            <li style={{ marginBottom: '8px' }}>Glicemia elevada nas primeiras 4 horas;</li>
            <li style={{ marginBottom: '8px' }}>Amilase elevada em 80% dos casos;</li>
            <li style={{ marginBottom: '8px' }}>Leucograma com leucocitose e neutrofilia;</li>
            <li style={{ marginBottom: '8px' }}>Hiponatremia e hipocalemia;</li>
            <li style={{ marginBottom: '8px' }}>CK e CKMB elevados; TC crânio pode mostrar áreas de infartos cerebrais;</li>
            <li style={{ marginBottom: '8px' }}>Rx Tórax pode mostrar aumento de área cardíaca e edema pulmonar uni ou bilateral.</li>
          </ul>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Tratamento específico:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Soro antiescorpiônico (SAE) nos acidentes leves, a conduta é observação. Nos acidentes moderados, devem ser administrados 2 a 3 ampolas e nos graves de 4 a 6 ampolas.
          </p>

          {/* ARANHAS */}
          <h2 style={{
            fontSize: '2rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '48px',
            marginBottom: '24px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Aranhas
          </h2>

          <h3 style={{
            fontSize: '1.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '16px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Phoneutria (armadeira)
          </h3>

          <p style={{ marginBottom: '24px' }}>
            Tem hábitos vespertinos e noturnos, são frequentes dentro de residências e na sua periferia. Gosta de ficar em entulhos, material de construção, lenhas e caixas de sapatos; também podem ser encontradas em árvores com grandes folhas e bananeiras. Raramente levam a quadro grave. Suas picadas ocorrem mais nos pés e mãos. É muito agressiva.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Manifestação clínica:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Dor com ou sem irradiação e edema local, imediatamente após a picada, parestesia e sudorese. Se surgirem vômitos, hipertensão arterial, dificuldade respiratória, tremores, espasmos musculares devem ser tratados como acidente grave. Pode evoluir para choque e edema pulmonar.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Tratamento específico:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Soro antiaracnídeo (SAAr) de 2 a 4 ampolas IV para casos moderados e de 5 a 10 ampolas para casos graves. Crianças devem ser observadas por pelo menos 6 horas.
          </p>

          <h3 style={{
            fontSize: '1.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '16px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Loxósceles (aranha marrom)
          </h3>

          <p style={{ marginBottom: '24px' }}>
            Hábitos noturnos, vive em pilhas de tijolos, telhas, atrás de móveis, cortinas e eventualmente nas roupas, jardins e gramas. São pouco agressivas. Corresponde à forma mais grave dos acidentes por aracnídeos no Brasil. Acomete mais a área central – tronco e membros proximais, ocorre quando está se vestindo.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Manifestação clínica:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Em torno de 90% ocorre manifestação local. A dor é fraca nas primeiras 12 horas e depois pode aumentar de intensidade, pode surgir sinais flogísticos formação de bolhas e até necrose seca local que pode durar até duas semanas e de difícil cicatrização. Astenia, febre e cefaleia. Nos casos graves (10%) pode apresentar exantema, prurido, petéquias, mialgia, náuseas e vômitos, visão turva, sonolência, torpor, irritabilidade e coma. Anemia, icterícia e hemoglobinúria.
          </p>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Exames laboratoriais:
          </h4>

          <ul style={{ paddingLeft: '24px', marginBottom: '24px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
            <li style={{ marginBottom: '8px' }}>Hemograma: anemia, leucocitose e plaquetopenia;</li>
            <li style={{ marginBottom: '8px' }}>DHL, bilirrubina e reticulócitos elevados;</li>
            <li style={{ marginBottom: '8px' }}>Ureia e creatinina elevados;</li>
            <li style={{ marginBottom: '8px' }}>EAS: proteinúria, hematúria e hemoglobinúria.</li>
          </ul>

          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            marginTop: '32px',
            marginBottom: '12px',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            Tratamento específico:
          </h4>

          <p style={{ marginBottom: '24px' }}>
            Soro antiaracnídeo (SAAr) ou antiloxoscélico (SALo) 5 ampolas para casos graves com manifestações sistêmicas. Nas manifestações locais apenas observação e cuidados locais. Se houver infecção secundária, usar antibioticoterapia.
          </p>

          <div style={{
            padding: '16px',
            margin: '24px 0',
            borderRadius: '8px',
            border: `1px solid ${isDarkMode ? '#3b82f6' : '#2563eb'}`,
            backgroundColor: isDarkMode ? '#1e3a8a' : '#dbeafe',
            color: isDarkMode ? '#bfdbfe' : '#1e40af'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>
              <strong>Nota importante:</strong>
            </p>
            <p style={{ margin: 0 }}>
              Para todos os acidentes por animais peçonhentos, é fundamental avaliar a situação vacinal antitetânica do paciente e proceder conforme protocolo. Manter sempre vigilância sobre possíveis reações anafiláticas ao soro.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}