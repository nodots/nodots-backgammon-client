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
import {
  INodotsPlayers,
  NodotsPlayersInitializing,
} from './Stores/Player/Types'
import { rolling } from './Stores/Dice/Types'
import { NodotsDiceStore } from './Stores/Dice/Store'
import { NodotsPlayerStore } from './Stores/Player/Store'

export class NodotsGameStore {
  rootStore: RootStore
  gameState: NodotsGameState
  diceStores: {
    white: NodotsDiceStore
    black: NodotsDiceStore
  }
  playerStores: {
    white: NodotsPlayerStore
    black: NodotsPlayerStore
  }

  constructor(rootStore: RootStore, players: INodotsPlayers) {
    makeAutoObservable(this)
    console.log(
      '4.async [Stores: NodotsGameStore] constructor rootStore:',
      rootStore
    )
    this.rootStore = rootStore
    this.gameState = initializing(players)
    this.diceStores = {
      black: new NodotsDiceStore('black'),
      white: new NodotsDiceStore('white'),
    }
    this.playerStores = {
      black: new NodotsPlayerStore(players.black),
      white: new NodotsPlayerStore(players.white),
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
