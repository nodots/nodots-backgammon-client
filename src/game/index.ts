import { action, autorun, makeAutoObservable, makeObservable } from 'mobx'
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
    console.log('rolling')
    this.state = rolling(state)
  }

  @action
  switchDice(state: Rolling) {
    console.log('switchDice')
    this.state = switchDice(state)
  }

  @action
  notify(state: NodotsGameState, message: string) {
    this.state = notify(state, message)
  }

  @action
  double(state: NodotsGameState) {
    console.log('double')
    this.state = double(state)
  }

  @action
  moving(state: Rolling | Moving, locationId: string) {
    // console.log(`moving ${state.kind} from:`, locationId)
    switch (state.kind) {
      case 'moving':
      case 'rolling':
        this.state = moving(state, locationId)
        console.log(this.state)
        break
      default:
        console.log(state)
    }
  }
}
export default NodotsGameStore
