import NodotsGameStore from '../../../../GameStore'
import { NodotsDie } from '../../../../GameStore/types/Dice'

export class DiceEventHandler {
  public die: NodotsDie
  public store: NodotsGameStore

  constructor(die: NodotsDie, store: NodotsGameStore) {
    this.die = die
    this.store = store
  }

  click = (e: React.MouseEvent) => {
    switch (this.store.state.kind) {
      case 'game-rolling':
        this.store.rolling(this.store.state)
        break
      case 'game-confirming-play':
        this.store.confirming(this.store.state)
        break

      default:
        console.warn(
          '[DiceEventHandler] state in which I have no business:',
          this.store.state.kind
        )
    }
  }

  doubleClick = (e: React.MouseEvent) => {
    console.warn('[DiceEventHandler NOT IMPLEMENTED] doubleclick e:', e)
    console.warn(
      '[DiceEventHandler NOT IMPLEMENTED] doubleclick die:',
      this.die
    )
    console.warn(
      '[DiceEventHandler NOT IMPLEMENTED] doubleclick store:',
      this.store
    )
  }
}
