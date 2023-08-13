import { produce } from 'immer'
import { Game, GameError, Color } from './game'
import { Board } from '../components/Board/state'
import { CheckerBox, isCheckerBox } from '../components/CheckerBox/state/types'
import { reducer as diceReducer, DieValue } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { MoveStatus, MoveMode } from '../components/CheckerBox/state/'
import { Move } from '../components/CheckerBox/state/'
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
    case GAME_ACTION_TYPE.FINALIZE_TURN:
      console.log('GAME_ACTION_TYPE.FINALIZE_TURN')
      return produce(state, draft => {
        // FIXME: typeguard
        const activeColor = state.activeColor as Color
        const inActiveColor = activeColor === 'white' ? 'black' : 'white'

        draft.players[activeColor].active = false
        draft.players[inActiveColor].active = true
        draft.activeColor = inActiveColor

        draft.activeTurn.status = undefined
        draft.activeTurn.id = undefined
        draft.activeTurn.roll = undefined
        draft.activeTurn.moves = []
      })
    case GAME_ACTION_TYPE.MOVE:
      // FIXME: Move all of this stuff to move reducer
      let activeMoveIndex = state.activeTurn.moves.findIndex(m => m.status !== MoveStatus.COMPLETED)
      // FIXME: Typeguard
      const activeColor = state.activeColor as Color
      let activeMove = state.activeTurn.moves[activeMoveIndex]
      console.log('[ActiveMove] activeMove:', activeMove)
      state.activeTurn.moves.forEach((m, i) => {
        console.log(`state.activeTurn.moves[${i}].status:`, MoveStatus[state.activeTurn.moves[i].status])
      })
      if (activeMoveIndex === -1) {
        console.error('No more moves')
      } else {
        // Always set the origin if it isn't set
        if (!activeMove.origin) {
          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex].origin = payload.checkerbox
            draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.ORIGIN_SET
            draft.activeTurn.status = TurnStatus.IN_PROGRESS
          })
        } else if (!activeMove.destination) {

          const newMove = produce(activeMove, draft => {
            draft.destination = payload.checkerbox
            draft.status = MoveStatus.DESTINATION_SET

            if (isCheckerBox(activeMove.origin) && isCheckerBox(payload.checkerbox)) {
              draft.mode = getMoveMode(activeMove.origin, payload.checkerbox, activeColor, activeMove.dieValue)
            } else {
              console.log(draft.destination)
              console.log(activeMove.origin)

              const isD = isCheckerBox(draft.destination)
              console.log(isD)
              //   throw new GameError({
              //     model: 'Move',
              //     errorMessage: 'O/D problem'
              //   })
            }
          })
          let newBoard: Board | undefined = undefined
          switch (newMove.mode) {
            case MoveMode.POINT_TO_POINT:
              newBoard = pointToPoint(state.board, newMove)
              break
            case MoveMode.HIT:
              newBoard = hit(state.board, newMove)
              break
            default:
              newBoard = state.board
          }

          if (!newBoard) {
            throw new GameError({
              model: 'Move',
              errorMessage: `No new board for ${MoveMode[activeMove.mode as MoveMode]}`
            })
          }
          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex] = newMove
            draft.activeTurn.status = TurnStatus.IN_PROGRESS
            draft.board = newBoard as Board
          })
        } else if (activeMove.destination && activeMove.status === MoveStatus.DESTINATION_SET) {
          // Mark current move active

          const priorMove = produce(activeMove, draft => {
            draft.status = MoveStatus.COMPLETED
          })
          // and move to the next
          activeMoveIndex++
          activeMove = state.activeTurn.moves[activeMoveIndex]

          const newMove = produce(activeMove, draft => {
            draft.origin = payload.checkerbox
            draft.status = MoveStatus.ORIGIN_SET
          })

          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex - 1] = priorMove
            draft.activeTurn.moves[activeMoveIndex] = newMove
          })
        } else if (!activeMove.destination && activeMove.status === MoveStatus.ORIGIN_SET) {
          const newMove = produce(activeMove, draft => {
            draft.destination = payload.checkerbox
            draft.status = MoveStatus.DESTINATION_SET
            draft.mode = getMoveMode(activeMove.origin as CheckerBox, draft.destination as CheckerBox, activeColor, activeMove.dieValue)
          })
          console.log('NEW MOVE:', newMove)
          let finalBoard: Board | undefined = undefined

          switch (newMove.mode) {
            case MoveMode.POINT_TO_POINT:
              finalBoard = pointToPoint(state.board, newMove)
              break
            case MoveMode.HIT:
              finalBoard = hit(state.board, newMove)
              break
            default:
              finalBoard = state.board
          }

          if (!finalBoard) {
            throw new GameError({
              model: 'Move',
              errorMessage: `No new board for ${MoveMode[activeMove.mode as MoveMode]}`
            })
          }

          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex] = newMove
            draft.board = finalBoard as Board
          })
        }
      }
      return state
    default:
      return state
  }

  function hit (board: Board, move: Move): Board {
    console.log(board)
    console.log(move)

    if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin or destination'
      })
    }
    const originInfo = getQuadrantAndPointIndexForCheckerbox(board, move.origin.id)
    const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, move.destination.id)
    console.log(originInfo)
    console.log(destinationInfo)

    const newMoveState = produce(board, draft => {
      // FIXME: Tons of problems here
      const hitChecker = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex].checkers[0] as Checker
      console.log('[GameReducer] hitChecker', hitChecker)
      const checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex].checkers[0] as Checker
      console.log('[GameReducer] checkerToMove', checkerToMove)
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex].checkers[0] = checkerToMove
      draft.off[hitChecker.color].checkers[0] = hitChecker




    })
    console.log(newMoveState)
    return board
  }

  function pointToPoint (board: Board, move: Move): Board {
    if (!move.origin || !move.destination) {
      throw new GameError({ model: 'Move', errorMessage: 'Missing origin or destination' })
    }

    // FIXME: Check for mismatch of die value and move
    // if (Math.abs((move.origin.position as number) - (move.destination.position as number)) !== (move.dieValue as number)) {
    //   throw new GameError({ model: 'Move', errorMessage: 'Move does not match die value' })
    // }
    return produce(board, draft => {
      let checkerToMove: Checker | undefined = undefined
      if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Missing origin or destination'
        })
      }
      const originInfo = getQuadrantAndPointIndexForCheckerbox(board, move.origin.id)
      const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, move.destination.id)
      console.log(originInfo)
      if (originInfo.quadrantIndex !== -1 && originInfo.pointIndex !== -1) {
        checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex].checkers[0]
        if (!checkerToMove) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No checker to move'
          })
        } else {
          // FIXME typeguard
          let ctm: Checker = checkerToMove as Checker
          const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
          const newOrigin = produce(oldOrigin, draft => {
            draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
          })
          const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
          const newDestination = produce(oldDestination, draft => {
            draft.checkers.push(ctm)
          })
          return produce(board, draft => {
            draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
            draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination
          })
        }
      } else {
        throw Error('No origin')
      }
    })
  }

  function getQuadrantAndPointIndexForCheckerbox (board: Board, id: string | undefined) {
    let quadrantIndex: number | undefined = undefined
    let pointIndex: number | undefined = undefined
    const checkerbox = getCheckerBoxes(board).find(cb => cb.id === id)

    if (checkerbox) {
      if (typeof checkerbox.position === 'number') {
        if (checkerbox.position >= 7 && checkerbox.position <= 12) {
          // quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.SW)
          quadrantIndex = 1
        } else if (checkerbox.position >= 13 && checkerbox.position <= 18) {
          // quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.NW)
          quadrantIndex = 2
        } else if (checkerbox.position >= 19 && checkerbox.position <= 24) {
          // quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.NE)
          quadrantIndex = 3
        } else {
          quadrantIndex = 0
          // console.log(checkerbox.position)
          // throw new GameError({ model: 'Move', errorMessage: 'No quadrant' })
        }

        if (typeof quadrantIndex !== 'number' ||
          quadrantIndex < 0 ||
          quadrantIndex > 3) {
          console.log(checkerbox.position)
          console.log(typeof checkerbox.position)
          board.quadrants.forEach(q => {
            console.log(QuadrantLocation[q.location])
          })
          throw new GameError({
            model: 'Move',
            errorMessage: 'NO QI'
          })

        }
        pointIndex = state.board.quadrants[quadrantIndex].points.findIndex(p => p.id === id)
      } else {
        throw Error('No origin checkerbox')
      }
      return { quadrantIndex, pointIndex }


    } else {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No checkerbox'
      })
    }
  }

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

