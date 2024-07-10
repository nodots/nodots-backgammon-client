import { action, makeAutoObservable } from 'mobx'
import RootStore from '../RootStore'
import {
  GameInitialized,
  GameInitializing,
  GamePlayingRolling,
  GameRollingForStart,
  NodotsGameState,
  initializing,
  rollingForStart,
} from './Types'
import { NodotsPlayersInitializing } from './Stores/Player/Types'
import { rolling } from './Stores/Dice/Types'
import { NodotsDiceStore } from './Stores/Dice/Store'

export class NodotsGameStore {
  rootStore: RootStore
  gameState: NodotsGameState
  diceStores: {
    white: NodotsDiceStore
    black: NodotsDiceStore
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    console.log(
      '4.async [Stores: NodotsGameStore] constructor rootStore:',
      rootStore
    )
    this.rootStore = rootStore
    this.gameState = initializing()
    this.diceStores = {
      black: new NodotsDiceStore('black'),
      white: new NodotsDiceStore('white'),
    }
  }

  rollingForStart(
    gameState: GameInitialized,
    diceStores: NodotsDiceStore,
    players: NodotsPlayersInitializing
  ) {
    console.log(
      '[Stores: Game] calling Store.rollingForStart gameState:',
      gameState
    )

    this.gameState = rollingForStart(this.diceStores, gameState, players)
    console.log(
      '[Stores: Game] back from Store.rollingForStart NEW gameState:',
      gameState
    )
  }
}
