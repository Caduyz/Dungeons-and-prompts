# Dungeons & Prompt
## InputHandler
O InputHandler tem como função controlar o estado do Raw Mode (ativo/inativo). Além disso, ele é responsável por criar/remover listeners e converter entradas de teclado em comandos (buffer -> command).

## Navigator
O Navigator atua juntamente com o InputHandler para navegar através dos menus. O Navigator utiliza de mais abstração e não modifica diretamente nenhum estado do Raw Mode, ele apenas chama o InputHandler para obter comandos e validá-los em ações (UP, DOWN, SELECT, CONFIRM, RETURN).