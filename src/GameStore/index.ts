import { action, makeAutoObservable } from 'mobx'
import {
  ConfirmingPlay,
  DiceSwitched,
  Initializing,
  Moving,
  NodotsGameState,
  Rolled,
  Rolling,
  confirming,
  initializing,
  moving,
  rolling,
  rollingForStart,
  switchingDice,
} from './types'
import { NodotsPlayers } from './types/Player'
import { resetGameState } from './types/move/helpers'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: NodotsPlayers) {
    const ts = new Date().toLocaleTimeString()
    console.log(
      `${ts}: NodotsGameStore Constructor for ${players.black.id} & ${players.white.id}`
    )
    makeAutoObservable(this)
    resetGameState()
    this.state = initializing(players)
  }

  @action
  rollForStart(state: Initializing) {
    this.state = rollingForStart(state)
  }

  @action
  rolling(state: Rolling) {
    this.state = rolling(state)
  }

  @action
  switchDice(state: Rolled | DiceSwitched) {
    this.state = switchingDice(state)
  }

  @action
  moving(state: Moving | Rolled | DiceSwitched, checkerId: string) {
    this.state = moving(state, checkerId)
  }

  @action
  confirming(state: ConfirmingPlay) {
    this.state = confirming(state)
  }
}

export default NodotsGameStore
