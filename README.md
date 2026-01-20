# Dungeons & Prompts *(Nome Provisório)*
> Dungeons & Prompts é um RPG de texto baseado em turnos que roda diretamente no terminal utilizando de Raw Mode e Readline para captação de entradas e navegação entre menus.  

## Visão Geral

Um RPG clássico com elementos de exploração, inventário, progressão de níveis e combate, tudo rodando no terminal sem dependências pesadas.  
Foco em experiência fluida usando controle de input raw (setas, enter, esc) e renderização ANSI. __*(Pode ser que nem todas as features estejam prontas ainda)*__

**Principais Features _(Atualmente)_**
- Navegação por menus com setas (↑↓←→)

## Instalação

### Pré-requisitos
- Node.js ≥ 18
- npm ou pnpm / yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/Caduyz/Dungeons-and-prompts
cd Dungeons-and-prompts

# Instale as dependências
npm install
# ou
pnpm install
# ou
yarn install

# Rode o jogo
npm run dev
```
## Tecnologias utilizadas

- TypeScript
- Node.js (stdin raw mode + ANSI escape codes)

## Roadmap de Features

- [X] Navegação com Raw Mode
- [ ] Sistema de criação de personagens
- [ ] Sistema de combate por turnos
- [ ] Progressão de personagem
- [ ] Habilidades especiais e passivas
- [ ] Salvamento e carregamento de jogo
- [ ] Loja *(sell/buy)*
- [ ] Suporte a cores ANSI
- [ ] Sons via terminal (beeps ou bibliotecas leves)