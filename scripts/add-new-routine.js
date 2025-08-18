#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const API_BASE = 'http://localhost:5000';

// Função para extrair informações do nome do arquivo
function extractRoutineInfo(filename) {
  const baseName = path.basename(filename, '.html');
  
  // Mapear nome do arquivo para categoria médica
  const categoryMap = {
    'TRATAMENTO DA CRISE AGUDA DE ASMA': 'Pneumologia'
  };
  
  // Extrair autor do nome do arquivo (último nome antes de ROTINAS HRT)
  const matches = baseName.match(/^(.+?)\s+(\w+)\s+ROTINAS\s+HRT/i);
  let title = baseName;
  let author = 'Dr. Fernando';
  let category = 'Pneumologia';
  
  if (matches) {
    title = matches[1].trim();
    author = `Dr. ${matches[2]}`;
  }
  
  // Verificar se há categoria específica mapeada
  for (const [key, cat] of Object.entries(categoryMap)) {
    if (title.includes(key)) {
      category = cat;
      break;
    }
  }
  
  // Limpar o título
  title = title
    .replace(/ROTINAS HRT.*$/i, '')
    .replace(/FERNANDO$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return { title, author, category };
}

async function addNewRoutine() {
  try {
    console.log('🔍 Processando nova rotina...');
    
    const htmlFile = 'attached_assets/Rotinas/html-output/TRATAMENTO DA CRISE AGUDA DE ASMA FERNANDO ROTINAS HRT.html';
    
    // Verificar se o arquivo existe
    try {
      await fs.access(htmlFile);
    } catch (error) {
      console.error('❌ Arquivo HTML não encontrado:', htmlFile);
      return;
    }
    
    // Ler conteúdo HTML
    const htmlContent = await fs.readFile(htmlFile, 'utf-8');
    
    // Extrair informações
    const { title, author, category } = extractRoutineInfo(htmlFile);
    
    console.log(`📋 Título: ${title}`);
    console.log(`👨‍⚕️ Autor: ${author}`);
    console.log(`🏷️ Categoria: ${category}`);
    
    // Criar rotina via API
    const routineData = {
      title,
      author,
      category,
      htmlContent,
      originalFilename: path.basename(htmlFile),
      conversionMethod: 'pandoc'
    };
    
    const response = await fetch(`${API_BASE}/api/routines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routineData)
    });
    
    if (response.ok) {
      const routine = await response.json();
      console.log(`✅ Rotina criada: ${routine.title} (ID: ${routine.id})`);
    } else {
      const error = await response.text();
      console.error(`❌ Erro ao criar rotina: ${error}`);
    }
    
    console.log('\n📊 Resumo:');
    console.log('✅ Nova rotina adicionada com sucesso');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

addNewRoutine();