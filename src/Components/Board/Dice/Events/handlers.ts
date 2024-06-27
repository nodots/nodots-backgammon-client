import { NodotsGameStore } from '../../../../stores/Game/Store'
import {
  NodotsPlayerDice,
  NodotsPlayerDiceActive,
} from '../../../../stores/Game/Stores/Dice/Types'
import { PlayerRolling } from '../../../../stores/Game/Stores/Player/Types'
import { GamePlaying_Rolling } from '../../../../stores/Game/Types'

export class DiceEventHandler {
  public dice: NodotsPlayerDice
  public gameStore: NodotsGameStore

  constructor(dice: NodotsPlayerDice, gameStore: NodotsGameStore) {
    this.dice = dice
    this.gameStore = gameStore
  }

  clickHandler = () => {
    switch (this.gameStore.state.kind) {
      case 'game-playing-rolling':
        const gameState = this.gameStore.state
        const activeColor = gameState.activeColor
        const diceStore = this.gameStore.diceStores[activeColor]
        const diceState = diceStore.diceState as NodotsPlayerDiceActive
        console.log('[Handler: DiceEvent] diceStore:', diceStore)
        console.log('[Handler: DiceEvent] diceState:', diceState)

        diceStore.rollDice(diceState)
        diceState.kind = 'active' // FIXME this is wrong

        // const { diceStores } = this.gameStore
        // this.gameStore.rolling(gameState, diceStore)
        break
      case 'game-playing-moving':
      case 'game-initializing':
      case 'game-ready':
      case 'game-rolling-for-start':
      case 'game-completed':
        break
    }
  }

  doubleClick = (e: React.MouseEvent) => {
    console.log('[Handler: DiceEvent] fucked?')
    console.warn(console.log('[Handler: DiceEvent] fucked?'))
  }
}
