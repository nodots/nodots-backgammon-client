import { action, makeAutoObservable } from 'mobx'
import {
  NodotsGameState,
  Players,
  Ready,
  Rolling,
  ready,
  rolling,
  switchDice,
  notify,
  double,
  Moving,
  moving,
  Confirming,
  confirming,
} from './Types'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: Players) {
    makeAutoObservable(this)
    this.state = ready(players)
  }

  @action
  rolling(state: Ready) {
    this.state = rolling(state)
  }

  @action
  switchDice(state: Rolling) {
    this.state = switchDice(state)
  }

  @action
  notify(state: NodotsGameState, message: string) {
    this.state = notify(state, message)
  }

  @action
  double(state: NodotsGameState) {
    this.state = double(state)
  }

  @action
  moving(state: Rolling | Moving, locationId: string) {
    this.state = moving(state, locationId)
  }

  @action
  confirming(state: Confirming) {
    this.state = confirming(state)
    console.log('confirming new state')
  }
}

export default NodotsGameStore
