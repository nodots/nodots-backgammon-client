import { action, makeAutoObservable } from 'mobx'
import {
  NodotsGameState,
  NodotsMessage,
  Players,
  Ready,
  Rolling,
  ready,
  rollForStart,
  rolling,
  switchDice,
  notify,
  double,
  Moving,
  moving,
  Confirming,
  confirming,
  RollForStart,
} from './Types'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: Players) {
    makeAutoObservable(this)
    this.state = ready(players)
  }

  @action
  rollForStart(state: Ready) {
    this.state = rollForStart(state)
    console.log(this.state.game.activeColor)
  }

  @action
  rolling(state: RollForStart | Rolling) {
    console.log('Rolling')
    this.state = rolling(state)
  }

  @action
  switchDice(state: Rolling) {
    this.state = switchDice(state)
  }

  @action
  notify(state: NodotsGameState, message: NodotsMessage) {
    this.state = notify(state, message)
  }

  @action
  double(state: NodotsGameState) {
    this.state = double(state)
  }

  @action
  moving(state: Rolling | Moving, checkerId: string) {
    const { game } = state
    const { activeColor } = game
    try {
      this.state = moving(state, checkerId)
    } catch (e) {
      throw e
    }
  }

  @action
  confirming(state: Confirming) {
    this.state = confirming(state)
    console.log('confirming new state')
  }
}

export default NodotsGameStore
