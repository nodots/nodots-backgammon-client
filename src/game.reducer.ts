import { produce } from 'immer'
import { Game } from './game'
import { CheckerBox } from './components/CheckerBox/state/types'
import { reducer as diceReducer, DieValue } from './components/Die/state/'
import { reducer as cubeReducer } from './components/Cube/state/'
import { MoveMode, MoveStatus, reducer as moveReducer } from './components/CheckerBox/state/'
import { turnReducer } from './components/Player/state/reducers'
import { Color, GameError } from './models'

export enum GAME_ACTION_TYPE {
  SET_DICE_VALUES,
  SET_CUBE_VALUE,
  INITIALIZE_TURN,
  MOVE
}

export const reducer = (state: Game, action: any): Game => {
  const { type, payload } = action
  if (!state.activeColor) {
    throw new GameError({ model: 'Move', errorMessage: 'No active color' })
  }
  console.log('[Game Context] reducer params state', state)
  console.log('[Game Context] reducer params action.type', type)
  console.log('[Game Context] reducer params action.payload', payload)
  switch (type) {
    case GAME_ACTION_TYPE.SET_CUBE_VALUE:
      const newCube = cubeReducer(state.cube, action)
      const newCubeState = produce(state, draft => {
        draft.cube = newCube
      })
      return newCubeState
    case GAME_ACTION_TYPE.SET_DICE_VALUES:
      const newDice = diceReducer(state.dice, action)
      return produce(state, draft => {
        draft.dice = newDice
      })
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      const newTurn = turnReducer(state.activeTurn, action)
      return produce(state, draft => {
        draft.activeTurn = newTurn
      })
    case GAME_ACTION_TYPE.MOVE:
      // FIXME: Move all of this stuff to move reducer
      const activeMoveIndex = state.activeTurn.moves.findIndex(m => m.status !== MoveStatus.COMPLETED)
      if (activeMoveIndex >= 0) {
        if (state.activeTurn.moves[activeMoveIndex].status === MoveStatus.INITIALIZED) {
          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex].origin = payload.checkerbox
            draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.ORIGIN_SET
          })
        } else if (state.activeTurn.moves[activeMoveIndex].status === MoveStatus.ORIGIN_SET) {
          return produce(state, draft => {
            //FIXME: Needs typeguard
            const moveMode = getMoveMode(state.activeTurn.moves[activeMoveIndex].origin as CheckerBox, payload.checkerbox, state.activeColor as Color, state.activeTurn.moves[activeMoveIndex].dieValue)
            draft.activeTurn.moves[activeMoveIndex].destination = payload.checkerbox
            draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.COMPLETED
            draft.activeTurn.moves[activeMoveIndex].mode = moveMode
            // FIXME: Barf
            const checkerToMove = draft.activeTurn.moves[activeMoveIndex].origin?.checkers.pop()
            if (!checkerToMove) {
              throw new GameError({ model: 'Move', errorMessage: 'No checker to move' })
            }
            draft.activeTurn.moves[activeMoveIndex].destination?.checkers.concat(checkerToMove)
          })
        } else {
          throw new GameError({ model: 'Move', errorMessage: 'No more moves left in turn' })
        }
      }
      return state
    default:
      return state
  }

  function getMoveMode (origin: CheckerBox, destination: CheckerBox, activeColor: Color, dieValue: DieValue): MoveMode {
    if (origin.position === 'off') {
      throw new GameError({ model: 'Move', errorMessage: 'Cannot move from off' })
    }
    if (destination.position === 'rail') {
      throw new GameError({ model: 'Move', errorMessage: 'Cannot move to rail' })
    }
    if (typeof origin.position === 'number' && typeof destination.position === 'number') {
      const activePlayer = state.players[activeColor as Color]
      if (!activePlayer || !activePlayer.active) {
        throw new GameError({ model: 'Move', errorMessage: 'No active player' })
      }
      if (destination.checkers && destination.checkers.length > 1 && destination.checkers[0].color !== activeColor) {
        throw new GameError({ model: 'Move', errorMessage: 'Destination is owned by opponent' })
      }
      if (destination.position === origin.position) {
        throw new GameError({ model: 'Move', errorMessage: 'Origin and destination cannot be the same' })
      }
      if (activePlayer.moveDirection === 'clockwise' && destination.position < origin.position) {
        throw new GameError({ model: 'Move', errorMessage: 'Player moves clockwise' })
      }
      if (activePlayer.moveDirection === 'counterclockwise' && destination.position > origin.position) {
        throw new GameError({ model: 'Move', errorMessage: 'Player moves counterclockwise' })
      }
      if (Math.abs(origin.position - destination.position) !== dieValue) {
        throw new GameError({ model: 'Move', errorMessage: 'Move does not match die value' })
      }
      if (destination.checkers && destination.checkers.length === 1 && destination.checkers[0].color !== activeColor) {
        return MoveMode.HIT
      } else {
        return MoveMode.POINT_TO_POINT
      }
    } else if (origin.position === 'rail' && typeof destination.position === 'number') {
      return MoveMode.REENTER
    } else if (destination.position === 'off') {
      return MoveMode.OFF
    } else {
      throw new GameError({ model: 'Move', errorMessage: 'Unknown MoveMode' })
    }
  }
}