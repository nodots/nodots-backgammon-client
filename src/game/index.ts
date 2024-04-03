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
    switch (state.kind) {
      case 'moving':
      case 'rolling':
        this.state = moving(state, locationId)
        break
      default:
        break
    }
  }
}

export default NodotsGameStore
