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
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        color: isDarkMode ? '#f3f4f6' : '#1f2937',
        transition: 'all 0.3s'
      }}
    >
      {/* Header with theme toggle and close button */}
      <div style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 50,
        display: 'flex',
        gap: '12px'
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
        padding: '64px 24px 24px 24px'
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
                  <th style={{
                    textAlign: 'left',
                    padding: '8px',
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                  }}>Classificação</th>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px',
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                  }}>Manifestações locais</th>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px',
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                  }}>Manifestações sistêmicas</th>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px',
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                  }}>Tempo de coagulação</th>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px',
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                  }}>Tempo entre acidente e atendimento</th>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px',
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                  }}>Soroterapia SAB/SABC/SABL</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{
                  borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`
                }}>
                  <td style={{
                    padding: '8px',
                    fontWeight: '600',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>Mínima</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>mínimas ou ausentes</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>ausentes</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>normal</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>menor 6 horas</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>obs</td>
                </tr>
                <tr style={{
                  borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`
                }}>
                  <td style={{
                    padding: '8px',
                    fontWeight: '600',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>Leve</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>discretas</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>ausentes</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>Normal ou alterado</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>menor que 6 horas</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>3 ampolas</td>
                </tr>
                <tr style={{
                  borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`
                }}>
                  <td style={{
                    padding: '8px',
                    fontWeight: '600',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>Moderada</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>evidentes</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>Ausentes</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>Normal ou alterado</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>6 horas</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>6 ampolas</td>
                </tr>
                <tr>
                  <td style={{
                    padding: '8px',
                    fontWeight: '600',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>Grave</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>intensas</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>presentes</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>alterado</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>maior que 6 horas</td>
                  <td style={{
                    padding: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}>12 ampolas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{
            fontSize: '0.875rem',
            fontStyle: 'italic',
            marginBottom: '24px',
            color: isDarkMode ? '#f3f4f6' : '#1f2937'
          }}>
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

          <ul style={{
            paddingLeft: '24px',
            marginBottom: '24px',
            color: isDarkMode ? '#f3f4f6' : '#1f2937'
          }}>
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

          {/* Continue with more sections as needed */}
        </div>
      </div>
    </div>
  );
}