import RootStoreModel from '../RootStore'
import { NodotsGameState } from './Types'
import { NodotsPlayerStore } from './Stores/Player/Store'

// export interface INodotsGameStore {
//   rootStore: RootStoreModel
// }

export class NodotsGameStore {
  private rootStore: RootStoreModel

  constructor(rootStore: RootStoreModel) {
    // console.log('[Store: Game] constructor')
    this.rootStore = rootStore
    console.log(rootStore)
  }
}

// @action
// rollingForStart(gameStore: NodotsGameStore) {
//   this.state = rollingForStart(gameStore)
// }

// @action
// rolling(gameState: GamePlaying_Rolling, diceStore: NodotsDiceStore) {
//   console.log('[Store: Game] rolling gameState:', gameState)
//   console.log('[Store: Game] rolling diceStore:', diceStore)
//   const newState = rolling(gameState, diceStore)
//   // console.log('[Store: Game] rolling newState:', newState)
//   this.state = newState
// }
