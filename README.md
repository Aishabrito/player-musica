# 🎶 Notas Ocultas - Player de Música

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> Um player de música imersivo com estética Indie, efeito Glassmorphism e controles interativos.

![Demonstração do Player](./src/assets/preview.gif)

## 📖 Sobre o Projeto

O **Notas Ocultas** é uma aplicação web desenvolvida para explorar interfaces modernas e manipulação avançada de áudio no Front-end. O objetivo foi criar uma experiência visual relaxante e misteriosa, utilizando transparências e ícones vetoriais.

Diferente de players simples, este projeto foca na **experiência do usuário (UX)** e na **organização de código (Clean Code)**.

## ⚠️ Observação Técnica

Este é um projeto **Front-end Only**.
A aplicação simula o funcionamento de um player real utilizando **dados estáticos (Mock Data)** organizados em arquivos separados. Não há conexão com banco de dados; todas as músicas e capas são carregadas localmente para demonstrar a arquitetura da aplicação.

## ✨ Funcionalidades

* 👆 **Barra de Progresso Interativa (Seek):** Clique em qualquer ponto da barra para adiantar ou voltar a música (cálculo dinâmico via `useRef`).
* ⏯️ **Controles Completos:** Play, Pause, Próxima, Anterior.
* 🔀 **Algoritmo de Shuffle:** Modo aleatório inteligente que evita repetir a música atual.
* 📱 **Design Responsivo:** Layout fluido que funciona em Mobile e Desktop.



## 🚀 Tecnologias

* **[React](https://reactjs.org/)**: Hooks (`useState`, `useEffect`, `useRef`).
* **[Tailwind CSS](https://tailwindcss.com/)**: Estilização utilitária e responsiva.
* **[Lucide React](https://lucide.dev/)**: Ícones SVG leves e customizáveis.
* **[Vite](https://vitejs.dev/)**: Ferramenta de build de alta performance.

## 📂 Como Rodar o Projeto

Pré-requisitos: Node.js instalado.

```bash
# 1. Clone este repositório
git clone [https://github.com/aisha-brito/notas-ocultas.git](https://github.com/aisha-brito/notas-ocultas.git)

# 2. Entre na pasta
cd notas-ocultas

# 3. Instale as dependências
npm install

# 4. Rode o servidor
npm run dev
