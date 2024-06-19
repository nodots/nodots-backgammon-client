import { NodotsGameStore } from '../../../../stores/Game/Store'
import { NodotsDie, Roll } from '../../../../stores/Game/types/Dice'

export class DiceEventHandler {
  public die: NodotsDie
  public roll: () => Roll

  constructor(die: NodotsDie, gameStore: NodotsGameStore) {
    this.die = die
    this.roll = () => gameStore.roll()
  }

  clickHandler = () => {
    console.log('[Handler: DiceEvent] die:', this.die)
    const rollResult = this.roll()
    console.log('[Handler: DiceEvent] rollResult:', rollResult)
  }

  doubleClick = (e: React.MouseEvent) => {
    console.log('[Handler: DiceEvent] fucked?')
    console.warn(console.log('[Handler: DiceEvent] fucked?'))
  }
}
