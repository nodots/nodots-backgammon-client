import { action, makeAutoObservable } from 'mobx'
import { Players } from './types/Player'
import {
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
    console.log('Store: rolling')
    this.state = rolling(state)
  }

  @action
  switchDice(state: Rolled) {
    console.log('switchDice state:', state)
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
    console.log(`store.moving`)
    this.state = moving(state, checkerId)
  }

  @action
  confirming(state: Moving) {
    this.state = confirming(state)
    console.log('confirming new state')
  }

  @action
  debugging(state: NodotsGameState, messageText: string) {
    this.state = debugging(state, messageText)
  }
}

export default NodotsGameStore
