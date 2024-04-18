import { action, makeAutoObservable } from 'mobx'
import { Players } from './types/Player'
import {
  Initializing,
  Moving,
  NodotsGameState,
  Ready,
  Rolling,
  confirming,
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
  rolling(state: Ready) {
    this.state = rolling(state)
  }

  @action
  switchDice(state: Rolling) {
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
  moving(state: Rolling | Moving, checkerId: string) {
    console.log(`store.moving`)
    this.state = moving(state, checkerId)
  }

  @action
  confirming(state: Moving) {
    this.state = confirming(state)
    console.log('confirming new state')
  }
}

export default NodotsGameStore
