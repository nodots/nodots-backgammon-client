import { action, makeAutoObservable } from 'mobx'
import {
  GameInitializing,
  GamePlaying,
  GameRolling,
  GameRollingForStart,
  NodotsGame,
} from './Game'
import { NodotsPlayers } from './Player/Types'
import { buildBoard } from './Game/types/Board'
import { generateId } from './Game/types'
import { NodotsCube } from './Game/types/Cube'
import { rollDice, rollForStart } from './Game/types/Dice'

// Start of code that should be in store.ts or something.
const initializing = (players: NodotsPlayers): GameInitializing => {
  console.log('[GameStore] initializing')
  const board = buildBoard(players)
  const cube: NodotsCube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }
  return {
    activeStore: 'self',
    kind: 'game-initializing',
    players,
    board,
    cube,
    plays: [],
  }
}

const rollingForStart = (state: GameInitializing): GameRollingForStart => {
  console.log('[GameStore] rollingForStart')
  const { players } = state
  const winner = rollForStart(players)
  return {
    ...state,
    kind: 'game-rolling-for-start',
    activeColor: winner.color,
  }
}

const rolling = (state: GameRolling): GamePlaying => {
  const { kind, ...previous } = state
  console.log('[GameStore] rollingForStart')
  const roll = rollDice()
  return {
    ...previous,
    kind: 'game-playing',
    roll,
  }
}
// End of code that should be elsewhere. FIXME

class NodotsGameStore {
  constructor(players: NodotsPlayers) {
    makeAutoObservable(this)
  }

  @action
  rollForStart(state: GameInitializing) {
    this.state = rollingForStart(state)
  }

  @action
  rolling(state: GameRolling) {
    this.state = rolling(state)
  }

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

export default NodotsGameStore
