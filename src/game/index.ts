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
}
export default NodotsGameStore
