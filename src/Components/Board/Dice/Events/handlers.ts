import NodotsGameStore from '../../../../stores'
import { NodotsDie } from '../../../../stores/Game/types/Dice'

export class DiceEventHandler {
  public die: NodotsDie

  constructor(die: NodotsDie) {
    this.die = die
    this.clickHandler = die.roll
  }

  clickHandler = () => {
    console.log(this.clickHandler)
  }

  doubleClick = (e: React.MouseEvent) => {
    console.warn('[DiceEventHandler NOT IMPLEMENTED] doubleclick e:', e)
    console.warn(
      '[DiceEventHandler NOT IMPLEMENTED] doubleclick die:',
      this.die
    )
  }
}
