import { NodotsGameStore } from '../../../../stores/Game/Store'
import { PlayerRolling } from '../../../../stores/Game/Stores/Player/Types'
import { GamePlaying_Rolling } from '../../../../stores/Game/Types'
import { NodotsDie } from '../../../../stores/Game/types/Dice'

export class DiceEventHandler {
  public die: NodotsDie
  public gameStore: NodotsGameStore

  constructor(die: NodotsDie, gameStore: NodotsGameStore) {
    this.die = die
    this.gameStore = gameStore
  }

  clickHandler = () => {
    const gameState = this.gameStore.state
    console.log('[Handler: DiceEvent] die:', this.die)
    console.log('[Handler: DiceEvent] gameStore:', this.gameStore)
    switch (gameState.kind) {
      case 'game-playing-rolling':
        const gameState = this.gameStore.state as GamePlaying_Rolling // FIXME
        const { activeColor, players } = gameState
        const activePlayer = players[activeColor] as PlayerRolling // FIXME
        this.gameStore.rolling(gameState, activePlayer)
        break
      case 'game-playing-moving':
      case 'game-initializing':
      case 'game-ready':
      case 'game-rolling-for-start':
      case 'game-completed':
        break
      default:
        console.error(`Unexpected gameState ${this.gameStore.state.kind}`)
    }
  }

  doubleClick = (e: React.MouseEvent) => {
    console.log('[Handler: DiceEvent] fucked?')
    console.warn(console.log('[Handler: DiceEvent] fucked?'))
  }
}
