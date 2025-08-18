#!/usr/bin/env node

/**
 * Script para popular o banco com rotinas de exemplo
 * Uso: node scripts/seed-routines.js
 */

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routinesData = [
  {
    title: "Acidentes por Animais Peçonhentos",
    author: "Dr. Luiz Antônio",
    category: "Emergência",
    htmlContent: `
      <h1>Acidentes por Animais Peçonhentos</h1>
      <h2>Protocolo de Atendimento</h2>
      
      <h3>1. Avaliação Inicial</h3>
      <ul>
        <li>Identificar o animal causador</li>
        <li>Avaliar gravidade do quadro</li>
        <li>Verificar sinais vitais</li>
        <li>Examinar local da picada/mordida</li>
      </ul>
      
      <h3>2. Serpentes</h3>
      <h4>Sinais e Sintomas:</h4>
      <ul>
        <li>Dor local intensa</li>
        <li>Edema progressivo</li>
        <li>Sangramento local</li>
        <li>Alterações sistêmicas</li>
      </ul>
      
      <h4>Tratamento:</h4>
      <ul>
        <li>Soro antiofídico conforme protocolo</li>
        <li>Analgesia adequada</li>
        <li>Soroterapia de suporte</li>
        <li>Observação por 24h</li>
      </ul>
      
      <h3>3. Aranhas</h3>
      <h4>Loxosceles (Aranha Marrom):</h4>
      <ul>
        <li>Lesão necrótica progressiva</li>
        <li>Soro antiaracnídico</li>
        <li>Corticoterapia</li>
      </ul>
      
      <h4>Phoneutria (Armadeira):</h4>
      <ul>
        <li>Dor intensa</li>
        <li>Priapismo (casos graves)</li>
        <li>Soro antiaracnídico se indicado</li>
      </ul>
      
      <h3>4. Escorpiões</h3>
      <ul>
        <li>Dor local intensa</li>
        <li>Sintomas sistêmicos em crianças</li>
        <li>Soro antiescorpiônico</li>
        <li>Observação rigorosa</li>
      </ul>
      
      <div style="background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <strong>Importante:</strong> Sempre identificar o animal quando possível e seguir protocolos específicos do hospital.
      </div>
    `,
    conversionMethod: "manual"
  },
  {
    title: "Bronquiolite Viral Aguda",
    author: "Dra. Maria Silva",
    category: "Pneumologia",
    htmlContent: `
      <h1>Bronquiolite Viral Aguda</h1>
      <h2>Protocolo de Atendimento Pediátrico</h2>
      
      <h3>Definição</h3>
      <p>Inflamação aguda dos bronquíolos, mais comum em lactentes menores de 2 anos, principalmente nos primeiros 6 meses de vida.</p>
      
      <h3>Etiologia</h3>
      <ul>
        <li>Vírus Sincicial Respiratório (VSR) - 70% dos casos</li>
        <li>Parainfluenza</li>
        <li>Adenovírus</li>
        <li>Rinovírus</li>
        <li>Metapneumovírus</li>
      </ul>
      
      <h3>Quadro Clínico</h3>
      <h4>Sintomas Iniciais:</h4>
      <ul>
        <li>Coriza</li>
        <li>Tosse</li>
        <li>Febre baixa</li>
      </ul>
      
      <h4>Evolução (2-3 dias):</h4>
      <ul>
        <li>Dispneia</li>
        <li>Sibilos</li>
        <li>Estertores crepitantes</li>
        <li>Retrações intercostais</li>
        <li>Irritabilidade</li>
        <li>Dificuldade alimentar</li>
      </ul>
      
      <h3>Classificação de Gravidade</h3>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Leve</th>
          <th>Moderada</th>
          <th>Grave</th>
        </tr>
        <tr>
          <td>Sibilos ausentes ou discretos</td>
          <td>Sibilos audíveis</td>
          <td>Sibilos intensos ou ausentes (fadiga)</td>
        </tr>
        <tr>
          <td>Sem retrações</td>
          <td>Retrações leves a moderadas</td>
          <td>Retrações intensas</td>
        </tr>
        <tr>
          <td>Alimentação normal</td>
          <td>Dificuldade alimentar leve</td>
          <td>Recusa alimentar</td>
        </tr>
      </table>
      
      <h3>Tratamento</h3>
      <h4>Medidas Gerais:</h4>
      <ul>
        <li>Hidratação adequada</li>
        <li>Aspiração de secreções nasais</li>
        <li>Posição elevada (30°)</li>
        <li>Monitorização contínua</li>
      </ul>
      
      <h4>Oxigenioterapia:</h4>
      <ul>
        <li>Indicada se SatO2 < 94%</li>
        <li>Óculos nasal ou máscara</li>
        <li>Avaliar necessidade de VNI</li>
      </ul>
      
      <div style="background: #d4edda; padding: 10px; border-left: 4px solid #28a745; margin: 20px 0;">
        <strong>Lembrete:</strong> Broncodilatadores não são recomendados rotineiramente. Considerar apenas em casos específicos.
      </div>
    `,
    conversionMethod: "manual"
  },
  {
    title: "Febre sem Sinais Localizatórios",
    author: "Dr. Pedro Santos",
    category: "Infectologia",
    htmlContent: `
      <h1>Febre sem Sinais Localizatórios</h1>
      <h2>Abordagem em Pediatria</h2>
      
      <h3>Definição</h3>
      <p>Temperatura ≥ 38°C (axilar) sem sinais ou sintomas que sugiram foco infeccioso específico ao exame físico inicial.</p>
      
      <h3>Estratificação por Idade</h3>
      
      <h4>0-28 dias (Neonatos)</h4>
      <div style="background: #f8d7da; padding: 10px; border-left: 4px solid #dc3545; margin: 10px 0;">
        <strong>RISCO ALTO</strong> - Hospitalização obrigatória
        <ul>
          <li>Hemograma completo</li>
          <li>Hemocultura</li>
          <li>Urocultura</li>
          <li>Punção lombar</li>
          <li>PCR/PCT</li>
          <li>Antibiótico empírico</li>
        </ul>
      </div>
      
      <h4>29-90 dias (Lactentes jovens)</h4>
      <p><strong>Critérios de Rochester (baixo risco):</strong></p>
      <ul>
        <li>Previamente hígido</li>
        <li>Boa aparência geral</li>
        <li>Leucócitos: 5.000-15.000/mm³</li>
        <li>Bastonetes < 1.500/mm³</li>
        <li>EAS normal</li>
      </ul>
      
      <p><strong>Baixo risco:</strong> Pode ser manejado ambulatorialmente com seguimento rigoroso</p>
      <p><strong>Alto risco:</strong> Hospitalização e investigação completa</p>
      
      <h4>3-36 meses</h4>
      <p><strong>Febre ≥ 39°C:</strong></p>
      <ul>
        <li>Hemograma se aparência tóxica</li>
        <li>Urocultura se sintomas urinários</li>
        <li>Considerar pneumonia oculta</li>
      </ul>
      
      <h4>> 36 meses</h4>
      <p>Investigação guiada por sinais e sintomas específicos</p>
      
      <h3>Exames Complementares</h3>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Idade</th>
          <th>Hemograma</th>
          <th>Urina</th>
          <th>Hemocultura</th>
          <th>Punção Lombar</th>
        </tr>
        <tr>
          <td>0-28 dias</td>
          <td>Sempre</td>
          <td>Sempre</td>
          <td>Sempre</td>
          <td>Sempre</td>
        </tr>
        <tr>
          <td>29-90 dias</td>
          <td>Sempre</td>
          <td>Sempre</td>
          <td>Se alto risco</td>
          <td>Se alto risco</td>
        </tr>
        <tr>
          <td>3-36 meses</td>
          <td>Se indicado</td>
          <td>Se sintomas</td>
          <td>Raramente</td>
          <td>Se suspeita</td>
        </tr>
      </table>
      
      <h3>Tratamento Antibiótico Empírico</h3>
      <h4>Neonatos (0-28 dias):</h4>
      <ul>
        <li>Ampicilina + Gentamicina</li>
        <li>Ou Ampicilina + Cefotaxima</li>
      </ul>
      
      <h4>Lactentes (29-90 dias):</h4>
      <ul>
        <li>Ceftriaxona 50mg/kg/dia</li>
        <li>Considerar ampicilina se < 60 dias</li>
      </ul>
      
      <div style="background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <strong>Importante:</strong> Reavaliar em 24-48h. Se persistir febre sem melhora clínica, considerar outras etiologias.
      </div>
    `,
    conversionMethod: "manual"
  }
];

async function seedRoutines() {
  console.log('🌱 Inserindo rotinas de exemplo no banco de dados...');

  let successful = 0;
  let failed = 0;

  for (const routine of routinesData) {
    try {
      const response = await fetch('http://localhost:5000/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routine)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Rotina criada: ${routine.title} (ID: ${result.id})`);
        successful++;
      } else {
        console.error(`❌ Erro ao criar rotina: ${routine.title}`);
        failed++;
      }
    } catch (error) {
      console.error(`❌ Erro ao conectar com o servidor: ${error.message}`);
      failed++;
    }
  }

  console.log('\n📊 Resumo:');
  console.log(`✅ Sucessos: ${successful}`);
  console.log(`❌ Falhas: ${failed}`);
}

// Executa apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedRoutines().catch(console.error);
}

export { seedRoutines, routinesData };