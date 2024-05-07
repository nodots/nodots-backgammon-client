import { action, makeAutoObservable } from 'mobx'
import {
  Confirming,
  Initializing,
  Moving,
  NodotsGameState,
  Rolled,
  Rolling,
  confirming,
  debugging,
  initializing,
  moving,
  rolling,
  rollingForStart,
  switchDice,
} from './types'
import { Players } from './types/Player'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: Players) {
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

  // @action
  // notify(state: NodotsGameState, message: NodotsMessage) {
  //   this.state = notify(state, message)
  // }

  // @action
  // double(state: NodotsGameState) {
  //   this.state = double(state)
  // }

  @action
  moving(state: Rolled | Moving, checkerId: string) {
    this.state = moving(state, checkerId)
  }

  @action
  confirming(state: Confirming) {
    this.state = confirming(state)
  }

  @action
  debugging(state: NodotsGameState, messageText: string) {
    this.state = debugging(state, messageText)
  }
}

export default NodotsGameStore
