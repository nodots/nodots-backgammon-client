import { NodotsGameStore } from './Game/Store'

class RootStore {
  name: string
  gameStore?: NodotsGameStore

  constructor() {
    console.log('[Stores: Root] constructor')
    this.name = 'Nodots Backgammon Root'
  }
}

export default RootStore
