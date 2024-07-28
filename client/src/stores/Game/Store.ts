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
import chalk from 'chalk'
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

  // The entry point to the game logic. i.e., it's an interface
  constructor(rootStore: RootStore, players: INodotsPlayers) {
    makeAutoObservable(this)
    console.log(
      chalk.underline.magenta(
        "The entry point to the game logic. i.e., it's an interface "
      )
    )
    console.log(
      chalk.green('4. [Stores: NodotsGameStore] constructor rootStore:'),
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
