import { renderer } from "../components/renderer.js";
import { createItem } from "../data/items.js";
import { ItemType } from "../types/index.js";
import { player } from "../launcher.js";
import { renderInventory } from "../components/Inventory.js";

export class GameController {
  private gameIsRunning: boolean = false;

  startGame() {
    this.gameIsRunning = true;

    createItem({
      id: 'health-potion',
      type: ItemType.Consumable,
      name: 'Health Potion',
      description: 'A simple health potion.',
    })
    createItem({
      id: 'slime-ball',
      type: ItemType.Material,
      name: 'Slime Ball',
      description: 'Slime Ball',
    })
    createItem({
      id: 'iron-helmet',
      type: ItemType.Armor,
      name: 'Iron Helmet',
      description: 'Iron Helmet',
      defense: 10
    })
    createItem({
      id: 'iron-sword',
      type: ItemType.Weapon,
      name: 'Iron Sword',
      description: 'Iron Sword',
      damage: 10
    })
    createItem({
      id: 'iron-chestplate',
      type: ItemType.Armor,
      name: 'Iron Chestplate',
      description: 'Iron Chestplate',
      defense: 15
    })

    player.addItemToInventory('health-potion', 10)
    player.addItemToInventory('slime-ball', 10)
    player.addItemToInventory('iron-sword', 1)
    player.addItemToInventory('iron-helmet', 1)
    player.addItemToInventory('iron-chestplate', 1)
    renderInventory()
  }

  openMainMenu() {
    renderer();
  }
}