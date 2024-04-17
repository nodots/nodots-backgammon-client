import { action, makeAutoObservable } from 'mobx'
import {
  NodotsGameState,
  NodotsMessage,
  Players,
  Initializing,
  RollingForStart,
  Ready,
  Rolling,
  initializing,
  rollingForStart,
  rolling,
  switchDice,
  double,
  Moving,
  moving,
  Confirming,
} from './Types'

class NodotsGameStore {
  state: NodotsGameState

  constructor(players: Players) {
    makeAutoObservable(this)
    this.state = initializing(players)
  }

  @action
  rollForStart(state: Initializing) {
    this.state = rollingForStart(state)
  }

  @action
  rolling(state: RollingForStart | Ready) {
    this.state = rolling(state)
  }

  @action
  switchDice(state: Rolling) {
    this.state = switchDice(state)
  }

  // @action
  // notify(state: NodotsGameState, message: NodotsMessage) {
  //   this.state = notify(state, message)
  // }

  // @action
  // double(state: NodotsGameState) {
  //   this.state = double(state)
  // }

  // @action
  // moving(state: Rolling | Moving, checkerId: string) {
  //   const { activeColor } = state
  //   try {
  //     this.state = moving(state, checkerId)
  //   } catch (e) {
  //     throw e
  //   }
  // }

  // @action
  // confirming(state: Confirming) {
  //   this.state = confirming(state)
  //   console.log('confirming new state')
  // }
}

export default NodotsGameStore
