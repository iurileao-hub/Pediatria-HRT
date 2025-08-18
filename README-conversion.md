# Sistema de Conversão de Documentos DOCX para HTML

Este sistema permite converter arquivos DOCX das rotinas médicas para HTML, que são então disponibilizados no aplicativo web para consulta pelos usuários.

## Ferramentas Disponíveis

### 1. Script de Conversão em Lote

**Localização:** `scripts/convert-batch.js`

**Uso:**
```bash
node scripts/convert-batch.js [pasta] [método]
```

**Parâmetros:**
- `pasta` (opcional): Caminho para a pasta com arquivos DOCX. Padrão: `./attached_assets`
- `método` (opcional): `mammoth` ou `pandoc`. Padrão: `mammoth`

**Exemplos:**
```bash
# Converte todos os arquivos .docx da pasta attached_assets usando Mammoth
node scripts/convert-batch.js

# Converte arquivos de uma pasta específica usando Pandoc
node scripts/convert-batch.js ./rotinas-medicas pandoc

# Converte com método específico
node scripts/convert-batch.js ./attached_assets mammoth
```

**Funcionalidades:**
- Detecta automaticamente todos os arquivos .docx na pasta
- Converte usando Mammoth.js ou Pandoc
- Salva arquivos HTML na pasta `html-output`
- Salva rotinas automaticamente no banco de dados
- Gera relatório de conversão em JSON
- Extrai metadados do nome do arquivo

### 2. Script de Rotinas de Exemplo

**Localização:** `scripts/seed-routines.js`

**Uso:**
```bash
node scripts/seed-routines.js
```

**Funcionalidade:**
- Insere rotinas médicas de exemplo no banco de dados
- Útil para testar o sistema com conteúdo real

## Métodos de Conversão

### Mammoth.js (Recomendado)
- **Vantagens:** Melhor preservação de formatação simples, mais rápido
- **Desvantagens:** Limitado para documentos muito complexos
- **Ideal para:** Documentos com formatação básica (títulos, listas, tabelas simples)

### Pandoc
- **Vantagens:** Suporte mais amplo para elementos complexos, melhor para documentos acadêmicos
- **Desvantagens:** Pode ser mais pesado, formatação menos consistente
- **Ideal para:** Documentos com elementos complexos (fórmulas, referências, estruturas avançadas)

## Estrutura de Saída

Após a conversão, os arquivos são organizados da seguinte forma:

```
pasta-origem/
├── arquivo1.docx
├── arquivo2.docx
└── html-output/
    ├── arquivo1.html
    ├── arquivo2.html
    └── conversion-report.json
```

## Relatório de Conversão

O arquivo `conversion-report.json` contém:
- Timestamp da conversão
- Método utilizado
- Estatísticas de sucesso/falha
- Detalhes de cada arquivo convertido
- Mensagens de erro (se houver)

## Extração de Metadados

O sistema automaticamente extrai metadados dos nomes dos arquivos:
- **Título:** Nome do arquivo sem extensão (formatado)
- **Categoria:** Primeira palavra/parte do nome do arquivo
- **Autor:** Padrão "HRT" (Hospital Regional de Taguatinga)
- **Arquivo Original:** Nome completo do arquivo

## Integração com o Banco de Dados

As rotinas convertidas são automaticamente:
- Salvas no banco de dados da aplicação
- Disponibilizadas na interface web
- Acessíveis pelos usuários através do app

## API Endpoints

O sistema também disponibiliza endpoints REST:

### Rotinas
- `GET /api/routines` - Lista todas as rotinas
- `GET /api/routines/:id` - Busca rotina específica
- `POST /api/routines` - Cria nova rotina
- `DELETE /api/routines/:id` - Remove rotina

### Conversão (para uso administrativo)
- `POST /api/convert/single` - Converte arquivo único
- `POST /api/convert/batch` - Conversão em lote
- `GET /api/convert/jobs` - Lista jobs de conversão

## Exemplo Prático

1. **Preparar arquivos:** Coloque todos os arquivos .docx em uma pasta (ex: `./rotinas-pediatria`)

2. **Executar conversão:**
   ```bash
   node scripts/convert-batch.js ./rotinas-pediatria mammoth
   ```

3. **Verificar resultados:**
   - Arquivos HTML em `./rotinas-pediatria/html-output/`
   - Rotinas no banco de dados via `curl http://localhost:5000/api/routines`
   - Acesso via web app em `/routines`

## Solução de Problemas

### Arquivo não encontrado
- Verifique se o caminho da pasta está correto
- Confirme que existem arquivos .docx na pasta

### Erro de conversão
- Verifique se o Pandoc está instalado (para método pandoc)
- Confirme que os arquivos .docx não estão corrompidos
- Tente o método alternativo de conversão

### Erro de conexão com banco
- Verifique se o servidor está rodando (`npm run dev`)
- Confirme que a porta 5000 está disponível

## Dependências

- **Node.js** (versão 20+)
- **mammoth** - Conversão DOCX para HTML
- **pandoc** - Conversor universal de documentos (sistema)
- **Servidor web** - Deve estar rodando para salvar no banco

## Notas Importantes

1. Os arquivos DOCX devem ter nomes descritivos para melhor extração de metadados
2. O servidor web deve estar rodando para salvar rotinas no banco
3. Arquivos HTML são salvos localmente e também no banco de dados
4. O sistema preserva o arquivo original e cria versões HTML separadamente