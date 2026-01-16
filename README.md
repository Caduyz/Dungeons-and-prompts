# Dungeons & Prompts *(Nome Provisório)*
> Dungeons & Prompts é um RPG de texto baseado em turnos que roda diretamente no terminal utilizando de Raw Mode e Readline para captação de entradas e navegação entre menus.  

Este projeto utiliza das seguintes tecnologias:
- Node.js
- TypeScript
- Raw Mode (process.stdin)
- Readline (Node.js)
- OOP

> Você pode usar o comando `npm run dev` para iniciar o launcher.ts 

# Features do Projeto
## InputHandler
O InputHandler tem como função controlar o estado do Raw Mode (ativo/inativo). Além disso, ele é responsável por criar/remover listeners e converter entradas de teclado em comandos (buffer -> command).

## Navigator
O Navigator atua juntamente com o InputHandler para navegar através dos menus. O Navigator utiliza de mais abstração e não modifica diretamente nenhum estado do Raw Mode, ele apenas chama o InputHandler para obter comandos e validá-los em ações (UP, DOWN, SELECT, CONFIRM, RETURN).

## Menus
Os menus têm como função exibir as interfaces dos menus (que variam conforme o tipo do menu). Eles são dependentes do Navigator, que por sua vez é dependente do InputHandler.
