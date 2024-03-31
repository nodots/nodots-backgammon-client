import { NodotsGameState, Players, ready } from './Types'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: Players) {
    this.state = ready(players)
  }
}
export default NodotsGameStore
