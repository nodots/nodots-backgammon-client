import { action, makeAutoObservable } from 'mobx'
import {
  GameConfirmingPlay,
  GameDiceSwitched,
  GameInitializing,
  GameMoving,
  NodotsGameState,
  GameRolled,
  GameRolling,
  confirming,
  doubling,
  initializing,
  moving,
  rolling,
  rollingForStart,
  reverting,
} from './types'
import { switchingDice } from './types/Play'
import { NodotsPlayers } from './types/Player'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: NodotsPlayers) {
    const ts = new Date().toLocaleTimeString()
    console.log(
      `${ts}: [NodotsGameStore] Constructor for ${players.black.id} & ${players.white.id}`
    )
    makeAutoObservable(this)
    this.state = initializing(players)
  }

  @action
  rollForStart(state: GameInitializing) {
    this.state = rollingForStart(state)
  }

  @action
  rolling(state: GameRolling) {
    this.state = rolling(state)
  }

  @action
  doubling(state: GameRolling) {
    this.state = doubling(state)
  }

  @action
  switchDice(state: GameRolled | GameDiceSwitched) {
    this.state = switchingDice(state)
  }

  @action
  moving(state: GameMoving | GameRolled | GameDiceSwitched, checkerId: string) {
    this.state = moving(state, checkerId)
  }

  @action
  confirming(state: GameConfirmingPlay) {
    this.state = confirming(state)
  }

  @action
  reverting(state: GameMoving | GameConfirmingPlay) {
    this.state = reverting(state)
  }
}

export default NodotsGameStore
