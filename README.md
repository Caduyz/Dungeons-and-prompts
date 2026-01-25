# Dungeons & Prompts
> Dungeons & Prompts é um RPG de texto baseado em turnos que roda diretamente no terminal utilizando do Ink para captação de entradas, navegação entre menus e renderização de interfaces estilizadas.  

## Visão Geral

Um RPG clássico com elementos de inventário, progressão de níveis e combate, tudo rodando no terminal sem dependências pesadas.  
Foco em experiência fluida usando controle de entrada (setas, enter, esc) e renderização de interfaces. __*(Pode ser que nem todas as features estejam prontas ainda)*__

**Principais Features _(Atualmente)_**
- Navegação por menus com setas (↑↓←→)
- Fácil criação de menus com interfaces usando o Ink
- Inventário com divisão por abas (filtros)

## Instalação

### Pré-requisitos
- Node.js ≥ 20
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
npm run game
```
## Tecnologias utilizadas

- TypeScript
- Ink
- React (Ink)

## Roadmap de Features

- [X] Menus navegáveis com Ink
- [X] Sistema de criação de personagens
- [X] Sistema de inventário
- [ ] Sistema de combate por turnos
- [ ] Progressão de personagem
- [ ] Habilidades especiais e passivas
- [ ] Salvamento e carregamento de jogo
- [ ] Loja *(sell/buy)*