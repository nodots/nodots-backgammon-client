import { action, autorun, makeAutoObservable, makeObservable } from 'mobx'
import {
  NodotsGameState,
  Players,
  Ready,
  Rolling,
  ready,
  rolling,
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
}
export default NodotsGameStore
