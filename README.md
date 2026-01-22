<<<<<<< HEAD
# Dungeons & Prompts *(Nome Provisório)*
> Dungeons & Prompts é um RPG de texto baseado em turnos que roda diretamente no terminal utilizando de Raw Mode e Readline para captação de entradas e navegação entre menus.  
=======
# Dungeons & Prompts
> Dungeons & Prompts é um RPG de texto baseado em turnos que roda diretamente no terminal utilizando do Ink para captação de entradas, navegação entre menus e renderização de interfaces estilizadas.  
>>>>>>> 81bd3bf (refactor(navigation and menus): now the navigator and menus use Ink)

## Visão Geral

Um RPG clássico com elementos de inventário, progressão de níveis e combate, tudo rodando no terminal sem dependências pesadas.  
Foco em experiência fluida usando controle de entrada (setas, enter, esc) e renderização de interfaces. __*(Pode ser que nem todas as features estejam prontas ainda)*__

**Principais Features _(Atualmente)_**
- Navegação por menus com setas (↑↓←→)
- Fácil criação de menus com interfaces usando o Ink

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
npm run game
```
## Tecnologias utilizadas

- TypeScript
- Ink
- React (Ink)

## Roadmap de Features

- [X] Menus navegáveis com Ink
- [X] Sistema de criação de personagens
- [ ] Sistema de combate por turnos
- [ ] Progressão de personagem
- [ ] Habilidades especiais e passivas
- [ ] Salvamento e carregamento de jogo
- [ ] Loja *(sell/buy)*