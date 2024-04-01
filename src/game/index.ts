import { action, makeObservable } from 'mobx'
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
    makeObservable(this)
    this.state = ready(players)
  }

  @action
  rolling = (state: Ready | Rolling) => {
    switch (state.kind) {
      case 'ready':
      case 'rolling':
        this.state = rolling(state)
    }
  }
}
export default NodotsGameStore
