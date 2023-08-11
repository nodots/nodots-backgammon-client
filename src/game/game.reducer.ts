import { produce } from 'immer'
import { Game, GameError, Color } from './game'
import { Board } from '../components/Board/state'
import { CheckerBox } from '../components/CheckerBox/state/types'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { MoveStatus } from '../components/CheckerBox/state/'
import { turnReducer } from '../components/Player/state/reducers'
import { Checker } from '../components/Checker/state'
import { TurnStatus } from '../components/Player/state/types'
import { QuadrantLocation } from '../components/Quadrant/state/types'

export enum GAME_ACTION_TYPE {
  SET_DICE_VALUES,
  SET_CUBE_VALUE,
  INITIALIZE_TURN,
  FINALIZE_TURN,
  MOVE
}

export const reducer = (state: Game, action: any): Game => {
  const { type, payload } = action
  if (!state.activeColor) {
    throw new GameError({ model: 'Move', errorMessage: 'No active color' })
  }
  // console.log('[Game Context] reducer params state', state)
  // console.log('[Game Context] reducer params action.type', type)
  // console.log('[Game Context] reducer params action.payload', payload)
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
    case GAME_ACTION_TYPE.FINALIZE_TURN:
      console.log('GAME_ACTION_TYPE.FINALIZE_TURN')
      return produce(state, draft => {
        if (!state.activeColor || !state.players[state.activeColor].active || !state.activeTurn.status) {
          throw new GameError(
            {
              model: 'Turn',
              errorMessage: 'No active color or player or turn'
            }
          )
        }
        // FIXME
        const activeColor = state.activeColor as Color
        const inactiveColor = activeColor === 'black' ? 'black' : 'white'

        return produce(state, draft => {
          draft.activeTurn.id = undefined
          draft.activeTurn.player = undefined
          draft.activeTurn.roll = undefined
          draft.activeTurn.status = undefined
          draft.players[activeColor].active = false
          draft.players[inactiveColor].active = true
          draft.activeColor = inactiveColor
        })

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
        } else if (state.activeTurn.moves[activeMoveIndex].status === MoveStatus.ORIGIN_SET
          && state.activeTurn.moves[activeMoveIndex].origin
        ) {
          const originCheckers = state.activeTurn.moves[activeMoveIndex].origin?.checkers as Checker[]
          const newOriginCheckers = produce(originCheckers, draft => {
            draft.splice(originCheckers.length - 1, 1)
          })
          const destinationCheckers = payload.checkerbox.checkers as Checker[]
          const newDestinationCheckers = produce(destinationCheckers, draft => {
            const checkerToMove = originCheckers[originCheckers.length - 1]
            draft.push(checkerToMove)
          })
          const newOrigin = produce(state.activeTurn.moves[activeMoveIndex].origin as CheckerBox, draft => {
            draft.checkers = newOriginCheckers
          })
          const destination = produce(payload.checkerbox as CheckerBox, draft => {
            draft.checkers = newDestinationCheckers
          })
          const newMoveState = produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex].origin = newOrigin
            draft.activeTurn.moves[activeMoveIndex].destination = destination
            draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.COMPLETED
            draft.activeTurn.status = TurnStatus.IN_PROGRESS
          })
          const newBoardState = produce(newMoveState, draft => {
            const checkerboxes = getCheckerBoxes(state.board)
            const originInfo = getQuadrantAndPointIndexForCheckerbox(checkerboxes, newMoveState.activeTurn.moves[activeMoveIndex].origin?.id)
            if (originInfo.quadrantIndex && originInfo.pointIndex) {
              // console.log(state.board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex])
              draft.board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex].checkers = newOriginCheckers
            } else {
              throw Error('No origin')
            }
            const destinationInfo = getQuadrantAndPointIndexForCheckerbox(checkerboxes, newMoveState.activeTurn.moves[activeMoveIndex].destination?.id)
            if (destinationInfo.quadrantIndex && destinationInfo.pointIndex) {
              // console.log(state.board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex])
              draft.board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex].checkers = newDestinationCheckers
            } else {
              throw Error('No destination')
            }
            if (activeMoveIndex === draft.activeTurn.moves.length - 1) {
              draft.activeTurn.status = TurnStatus.AWAITING_FINALIZATION
            }
          })
          return newBoardState
        } else {
          throw new GameError({ model: 'Move', errorMessage: 'No more moves left in turn' })
        }
      }
      return state
    default:
      return state
  }

  function getQuadrantAndPointIndexForCheckerbox (checkerboxes: CheckerBox[], id: string | undefined) {
    let quadrantIndex: number | undefined = undefined
    let pointIndex: number | undefined = undefined
    const originCB = checkerboxes.find(cb => cb.id === id)
    if (originCB) {
      if (typeof originCB.position === 'number') {
        if (originCB.position >= 1 && originCB.position <= 6) {
          quadrantIndex = state.board.quadrants.findIndex(q => q.location === QuadrantLocation.SE)
        } else if (originCB.position >= 7 && originCB.position <= 12) {
          quadrantIndex = state.board.quadrants.findIndex(q => q.location === QuadrantLocation.SW)
        } else if (originCB.position >= 13 && originCB.position <= 18) {
          quadrantIndex = state.board.quadrants.findIndex(q => q.location === QuadrantLocation.NW)
        } else if (originCB.position >= 19 && originCB.position <= 24) {
          quadrantIndex = state.board.quadrants.findIndex(q => q.location === QuadrantLocation.NE)
        } else {
          throw new GameError({ model: 'Move', errorMessage: 'No quadrant' })
        }
      }
      if (!quadrantIndex) {
        throw Error('No quadrant')
      }
      pointIndex = state.board.quadrants[quadrantIndex].points.findIndex(p => p.id === id)
    } else {
      throw Error('No origin checkerbox')
    }
    return { quadrantIndex, pointIndex }
  }

  // function setMoveCheckerBoxes (origin: CheckerBox, destination: CheckerBox): { origin: CheckerBox, destination: CheckerBox } {
  //   const checkerToMove = origin.checkers[origin.checkers.length - 1]
  //   const newOriginCheckers = origin.checkers.slice(0, -1)
  //   const newDestinationCheckers = destination.checkers.concat(checkerToMove)

  //   const newOrigin: CheckerBox = {
  //     ...origin,
  //     checkers: newOriginCheckers
  //   }

  //   const newDestination: CheckerBox = {
  //     ...destination,
  //     checkers: newDestinationCheckers
  //   }

  //   console.log(checkerToMove)
  //   console.log(newOriginCheckers)
  //   console.log(newDestinationCheckers)

  //   return {
  //     origin: newOrigin,
  //     destination: newDestination
  //   }

  // }

  function getCheckerBoxes (board: Board): CheckerBox[] {
    const checkerBoxes: CheckerBox[] = []
    board.quadrants.forEach(q => {
      checkerBoxes.push(...q.points)
    })
    checkerBoxes.push(board.off.white)
    checkerBoxes.push(board.off.black)
    checkerBoxes.push(board.rail.white)
    checkerBoxes.push(board.rail.black)
    return checkerBoxes
  }

  // function getMoveMode (origin: CheckerBox, destination: CheckerBox, activeColor: Color, dieValue: DieValue): MoveMode {
  //   if (origin.position === 'off') {
  //     throw new GameError({ model: 'Move', errorMessage: 'Cannot move from off' })
  //   }
  //   if (destination.position === 'rail') {
  //     throw new GameError({ model: 'Move', errorMessage: 'Cannot move to rail' })
  //   }
  //   if (typeof origin.position === 'number' && typeof destination.position === 'number') {
  //     const activePlayer = state.players[activeColor as Color]
  //     if (!activePlayer || !activePlayer.active) {
  //       throw new GameError({ model: 'Move', errorMessage: 'No active player' })
  //     }
  //     if (destination.checkers && destination.checkers.length > 1 && destination.checkers[0].color !== activeColor) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Destination is owned by opponent' })
  //     }
  //     if (destination.position === origin.position) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Origin and destination cannot be the same' })
  //     }
  //     if (activePlayer.moveDirection === 'clockwise' && destination.position < origin.position) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Player moves clockwise' })
  //     }
  //     if (activePlayer.moveDirection === 'counterclockwise' && destination.position > origin.position) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Player moves counterclockwise' })
  //     }
  //     // if (Math.abs(origin.position - destination.position) !== dieValue) {
  //     //   throw new GameError({ model: 'Move', errorMessage: 'Move does not match die value' })
  //     // }
  //     if (destination.checkers && destination.checkers.length === 1 && destination.checkers[0].color !== activeColor) {
  //       return MoveMode.HIT
  //     } else {
  //       return MoveMode.POINT_TO_POINT
  //     }
  //   } else if (origin.position === 'rail' && typeof destination.position === 'number') {
  //     return MoveMode.REENTER
  //   } else if (destination.position === 'off') {
  //     return MoveMode.OFF
  //   } else {
  //     throw new GameError({ model: 'Move', errorMessage: 'Unknown MoveMode' })
  //   }
  // }
}