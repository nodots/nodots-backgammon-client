import { action, makeAutoObservable } from 'mobx'
import { NodotsGameStore } from './Game/Store'
import { NodotsPlayers } from './Game/Stores/Player/Types'

class RootStore {
  name: string
  gameStore: NodotsGameStore

  constructor(players: NodotsPlayers) {
    makeAutoObservable(this)
    this.name = 'Nodots Backgammon Root'
    this.gameStore = new NodotsGameStore(players)
  }

  // @action
  // rolling(state: GameRolling) {
  //   console.log('[Game Store] state:', state)
  // }

  // @action
  // rollForStart(state: GameInitializing) {
  //   this.state = rollingForStart(state)
  // }

  // @action
  // rolling(state: GameRolling) {
  //   this.state = rolling(state)
  // }

  // @action
  // switchDice(state: GamePlaying) {
  //   this.state = switchDice(state)
  // }

  // @action
  // moving(state: Moving | Rolled, checkerId: string) {
  //   this.state = moving(state, checkerId)
  // }

  // @action
  // confirming(state: Confirming) {
  //   this.state = confirming(state)
  // }
}

export default RootStore
