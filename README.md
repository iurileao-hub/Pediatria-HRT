# Pediatria HRT

Sistema digital de referência para rotinas e protocolos clínicos pediátricos do Hospital Regional de Taguatinga (HRT).

## 📋 Sobre o Projeto

Aplicação web frontend-only que disponibiliza **75+ rotinas médicas pediátricas** em formato HTML com imagens incorporadas, organizadas por categorias e com busca em tempo real.

### Funcionalidades

- ✅ **Biblioteca de Rotinas**: 75+ protocolos clínicos pediátricos
- 🔍 **Busca em Tempo Real**: Pesquisa por título, autor ou categoria
- 🏷️ **16 Categorias Médicas**: Infectologia, Emergência, Neonatologia, Cardiologia, etc.
- 📱 **Design Responsivo**: Interface glass-morphism com tema sunset
- ⚡ **Performance Otimizada**: Dados estáticos em JSON, carregamento lazy
- 🎨 **Tipografia Profissional**: Fonte Georgia para legibilidade médica

## 🏗️ Arquitetura

### Stack Tecnológico

**Frontend**
- React 18.3.1 + TypeScript 5.6.3
- Vite 5.4.19 (build tool)
- Wouter (roteamento leve)
- Tailwind CSS 3.4.17
- shadcn/ui + Radix UI
- DOMPurify (sanitização HTML)

**Dados**
- JSON estáticos em `/public/data/`
- Estrutura híbrida: index + arquivos individuais
- ~20KB index + 75 arquivos de rotinas

## 📂 Estrutura do Projeto

```
Pediatria-HRT/
├── client/                    # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes UI
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── hooks/            # useRoutines, etc.
│   │   ├── types/            # TypeScript types
│   │   └── lib/              # Utils e helpers
│   └── index.html
├── public/
│   └── data/
│       ├── routines-index.json    # Metadata (20KB)
│       └── routines/              # 75 arquivos JSON individuais
│           ├── {uuid}.json
│           └── ...
├── dist/                     # Build de produção (gerado)
├── vite.config.ts
├── vercel.json              # Configuração Vercel
└── package.json
```

## 🚀 Desenvolvimento

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/Pediatria-HRT.git
cd Pediatria-HRT

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Build de produção
npm run preview  # Preview do build local
npm run check    # Verificação de tipos TypeScript
```

## 📦 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/Pediatria-HRT)

**Passos manuais:**

1. Instalar Vercel CLI: `npm i -g vercel`
2. Fazer login: `vercel login`
3. Deploy: `vercel --prod`

A configuração está em `vercel.json`:
- Build automático com Vite
- Cache agressivo para `/data/*` (1 ano)
- Headers de segurança
- SPA routing configurado

### Outras Plataformas

**Netlify:**
```bash
npm run build
# Fazer deploy da pasta dist/
```

**GitHub Pages:**
- Ajustar `base` em `vite.config.ts`
- Usar GitHub Actions para build

**Cloudflare Pages:**
- Build command: `npm run build`
- Output directory: `dist`

## 📊 Dados

### Estrutura de Dados

**`routines-index.json`** (lista de rotinas):
```json
[
  {
    "id": "uuid",
    "title": "Título da Rotina",
    "author": "Dr. Nome",
    "category": "Categoria",
    "createdAt": "2025-01-15T...",
    "updatedAt": "2025-01-15T...",
    "dataFile": "/data/routines/uuid.json"
  }
]
```

**`routines/{uuid}.json`** (rotina completa):
```json
{
  "id": "uuid",
  "title": "Título da Rotina",
  "author": "Dr. Nome",
  "category": "Categoria",
  "htmlContent": "<h1>Conteúdo HTML completo...</h1>",
  "originalFilename": "arquivo.docx",
  "conversionMethod": "mammoth",
  "createdAt": "2025-01-15T...",
  "updatedAt": "2025-01-15T..."
}
```

### Categorias Disponíveis

- Cardiologia
- Emergência
- Endocrinologia
- Gastroenterologia
- Geral
- Hematologia
- Imunologia
- Infectologia
- Nefrologia
- Neonatologia
- Neurologia
- Nutrologia
- Pneumologia
- Reumatologia
- Toxicologia
- UTI

## 🔒 Segurança

- ✅ DOMPurify para sanitização de HTML
- ✅ Headers de segurança configurados
- ✅ Sem dados sensíveis no frontend
- ✅ HTTPS obrigatório em produção

## 📝 Adicionando Novas Rotinas

Para adicionar uma nova rotina:

1. Converter DOCX para HTML (usar Mammoth.js ou similar)
2. Criar arquivo JSON em `public/data/routines/{uuid}.json`
3. Atualizar `public/data/routines-index.json`
4. Commit e push (deploy automático no Vercel)

## 🎨 Customização

### Temas e Cores

Editar `client/src/index.css` e `tailwind.config.ts` para ajustar:
- Cores das categorias
- Tema sunset gradient
- Efeitos glass-morphism

### Fontes

Atualmente usa Georgia (serif). Para trocar:
1. Importar fonte em `client/index.html`
2. Atualizar `fontFamily` em `client/src/index.css`

## 🔧 Tecnologias Detalhadas

### Frontend
- **React**: UI declarativa
- **TypeScript**: Type safety
- **Vite**: Build rápido e HMR
- **Wouter**: Roteamento (3KB)
- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: Componentes acessíveis
- **Framer Motion**: Animações suaves
- **DOMPurify**: Sanitização XSS

### Build & Deploy
- **Vite**: Bundler moderno
- **Vercel**: Hospedagem e CDN
- **esbuild**: Transformações rápidas

## 📈 Performance

- **First Load**: ~200ms
- **Lista de Rotinas**: 20KB (index JSON)
- **Rotina Individual**: ~280KB (cached após primeira visita)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)

## 🌳 Branches

- `main`: Código de produção (frontend-only)
- `source-documents`: Arquivos DOCX originais (27MB, preservação histórica)

## 📄 Licença

MIT License - Veja [LICENSE](LICENSE) para detalhes.

## 👥 Autores

Desenvolvido para o Hospital Regional de Taguatinga (HRT)
Departamento de Pediatria

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para questões técnicas ou sugestões, abra uma [issue](https://github.com/seu-usuario/Pediatria-HRT/issues).

---

**Versão**: 2.0.0 (Frontend-only)
**Última atualização**: Janeiro 2025
