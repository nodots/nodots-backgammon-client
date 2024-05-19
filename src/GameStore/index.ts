import { action, makeAutoObservable } from 'mobx'
import {
  Confirming,
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
  switchDice,
} from './types'
import { NodotsPlayers } from './types/Player'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: NodotsPlayers) {
    makeAutoObservable(this)
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
  switchDice(state: Rolled) {
    this.state = switchDice(state)
  }

  @action
  moving(state: Moving | Rolled, checkerId: string) {
    this.state = moving(state, checkerId)
  }

  @action
  confirming(state: Confirming) {
    this.state = confirming(state)
  }
}

export default NodotsGameStore
