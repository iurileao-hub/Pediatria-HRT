# Pediatria HRT

Sistema digital de referência para rotinas e protocolos clínicos pediátricos do Hospital Regional de Taguatinga (HRT).

**Progressive Web App (PWA)** com 75+ rotinas médicas pediátricas organizadas por categoria, com busca em tempo real e interface moderna.

## ✨ Funcionalidades

- 📚 **75+ Rotinas Médicas** organizadas em 16 categorias
- 🔍 **Busca em Tempo Real** por título, autor ou categoria
- 📱 **PWA** instalável com cache offline
- ⚡ **Performance Otimizada** com lazy loading de imagens
- 🎨 **Interface Moderna** com design glass-morphism
- 🌐 **100% Frontend** sem necessidade de backend

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 20+
- npm

### Instalação e Desenvolvimento

```bash
# Clonar repositório
git clone https://github.com/iurileao-hub/Pediatria-HRT.git
cd Pediatria-HRT

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`

### Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com hot reload
npm run build    # Build de produção
npm run preview  # Preview do build local (porta 4173)
npm run check    # Verificação TypeScript
npm run analyze  # Análise do bundle (visualizer)
```

## 🛠️ Stack Tecnológico

**Frontend**
- React 18.3 + TypeScript 5.6
- Vite 5.4 (build tool)
- Wouter (roteamento SPA)
- Tailwind CSS 3.4 + shadcn/ui
- PWA com Workbox (Service Worker)

**Dados**
- Arquivos JSON estáticos em `/public/data/`
- 75 rotinas individuais + índice central
- Total: ~20MB de conteúdo médico

## 📦 Deploy

### Vercel (Automático)

O projeto está configurado para deploy automático no Vercel via GitHub:

```bash
git push origin main  # Deploy automático
```

### Deploy Manual

```bash
npm run build
# Deploy da pasta dist/ para qualquer CDN/hosting
```

**Outras plataformas compatíveis:** Netlify, Cloudflare Pages, GitHub Pages

## 📂 Estrutura do Projeto

```
Pediatria-HRT/
├── client/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas (Home, Routines, etc)
│   │   ├── hooks/          # useRoutines, etc
│   │   └── lib/            # Utilities
│   └── index.html
├── public/
│   └── data/
│       ├── routines-index.json      # Índice de rotinas
│       └── routines/{uuid}.json     # 75 rotinas individuais
├── dist/                   # Build de produção (gerado)
├── vite.config.ts
├── vercel.json            # Config Vercel
└── package.json
```

## 📊 Categorias Médicas

Cardiologia • Emergência • Endocrinologia • Gastroenterologia • Geral • Hematologia • Imunologia • Infectologia • Nefrologia • Neonatologia • Neurologia • Nutrologia • Pneumologia • Reumatologia • Toxicologia • UTI

## 🔧 Configuração

### Vite (vite.config.ts)

- **PWA** configurado com estratégia de cache
- **Build otimizado** com code splitting
- **Public directory** apontando para `/public`
- **Aliases** configurados (`@/` → `client/src/`)

### Vercel (vercel.json)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA routing** com fallback para `index.html`
- **Cache otimizado** para `/data/*` e `/assets/*`
- **Headers de segurança** configurados

## 🎨 Customização

### Cores e Temas

Edite `client/src/lib/categories.ts` para ajustar cores das categorias médicas.

### Fontes

O projeto usa a fonte **Crimson Text** (Google Fonts). Para alterar, edite `client/index.html` e `client/src/index.css`.

## 📈 Performance

- ⚡ **First Load:** ~200ms
- 📦 **Bundle Size:** ~300KB (gzip)
- 🎯 **Lighthouse Score:** 95+ em todas as métricas
- 💾 **PWA Cache:** Funciona offline após primeira visita

## 🔒 Segurança

- ✅ Headers de segurança via Vercel
- ✅ Content Security Policy
- ✅ Sem dados sensíveis expostos
- ✅ HTTPS obrigatório em produção

## 📝 Licença

MIT License - Código aberto para uso educacional e médico.

## 👥 Autor

Desenvolvido para o **Hospital Regional de Taguatinga (HRT)**
Departamento de Pediatria

---

**Versão:** 2.0.0
**Última atualização:** Outubro 2025
