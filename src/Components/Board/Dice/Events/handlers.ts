import { NodotsGameStore } from '../../../../stores/Game/Store'
import { GamePlaying, NodotsColor } from '../../../../stores/Game/Types'
import { NodotsDie, Roll } from '../../../../stores/Game/types/Dice'

export class DiceEventHandler {
  public die: NodotsDie
  public roll: (color: NodotsColor) => GamePlaying
  public gameStore: NodotsGameStore

  constructor(die: NodotsDie, gameStore: NodotsGameStore) {
    this.die = die
    this.gameStore = gameStore
    this.roll = this.gameStore.roll
  }

  clickHandler = () => {
    console.log('[Handler: DiceEvent] die:', this.die)
    console.log('[Handler: DiceEvent] gameStore:', this.gameStore)
    switch (this.gameStore.state.kind) {
      case 'game-playing':
        const gameState = this.gameStore.state as GamePlaying
        const { activeColor } = gameState
        const rollResult = this.roll(activeColor)
        console.log('[Handler: DiceEvent] rollResult', rollResult)
    }
  }

  doubleClick = (e: React.MouseEvent) => {
    console.log('[Handler: DiceEvent] fucked?')
    console.warn(console.log('[Handler: DiceEvent] fucked?'))
  }
}
