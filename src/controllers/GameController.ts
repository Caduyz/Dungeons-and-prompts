import { createItem } from "../data/items.js";
import { BodySlot, ItemType } from "../types/index.js";
import { player } from "../launcher.js";
import { renderApp } from "../components/App.js";
import { CLASSES } from '../core/entities/classes.js'

export class GameController {
  private gameIsRunning: boolean = false;

  startGame() {
    this.gameIsRunning = true;
    console.clear()

    // Debugging only
    createItem({
      id: 'health-potion',
      type: ItemType.Consumable,
      effect: 'none',
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
      equippableSlot: BodySlot.Head,
      availableClasses: CLASSES,
      description: 'A warrior helmet made of iron.',
      defense: 5
    })
    createItem({
      id: 'iron-sword',
      type: ItemType.Weapon,
      name: 'Iron Sword',
      mainAttribute: 'strength',
      availableClasses: CLASSES,
      description: 'A long sword made of iron.',
      damage: 8
    })
    createItem({
      id: 'iron-chestplate',
      type: ItemType.Armor,
      name: 'Iron Chestplate',
      equippableSlot: BodySlot.Chest,
      availableClasses: CLASSES,
      description: 'A warrior chesplate made of iron.',
      defense: 12
    })

    player.addItemToInventory('health-potion', 10)
    player.addItemToInventory('slime-ball', 10)
    player.addItemToInventory('iron-sword', 1)
    player.addItemToInventory('iron-helmet', 1)
    player.addItemToInventory('iron-chestplate', 1)

    this.openMainMenu()
  }

  openMainMenu() {
    renderApp();
  }
}