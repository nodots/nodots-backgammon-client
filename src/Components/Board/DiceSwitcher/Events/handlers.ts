import NodotsGameStore from '../../../GameStore'
import { NodotsDie } from '../../../GameStore/types/Dice'

export class DiceSwitcherEventHandler {
  public store: NodotsGameStore

  constructor(store: NodotsGameStore) {
    this.store = store
  }

  click = (e: React.MouseEvent) => {
    console.log('[DiceSwitcherEventHandler] click e:', e)
    console.log('[DiceSwitcherEventHandler] click store:', this.store)
    switch (this.store.state.kind) {
      case 'game-dice-switched':
      case 'game-rolled':
        this.store.switchDice(this.store.state)
        break
      default:
        break
    }
  }

  doubleClick = (e: React.MouseEvent) => {
    console.warn('[DiceSwitcherEventHandler NOT IMPLEMENTED] doubleclick e:', e)
    console.warn(
      '[DiceSwitcherEventHandler NOT IMPLEMENTED] doubleclick store:',
      this.store
    )
  }
}
