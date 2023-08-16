import { produce } from 'immer'
import { Game, GameError, Color, isColor } from './game'
import { Board } from '../components/Board/state'
import { Roll } from '../components/Die/state/types'
import { CheckerBox, isCheckerBox } from '../components/CheckerBox/state/types'
import { getMoveMode, pointToPoint, off, hit, reenter } from './move'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { MoveStatus, MoveMode } from '../components/CheckerBox/state/'
import { turnReducer } from '../components/Player/state'
import { TurnStatus, initializeTurn } from '../components/Player/state/types'

export enum GAME_ACTION_TYPE {
  SET_DICE_VALUES,
  SET_CUBE_VALUE,
  INITIALIZE_TURN,
  FINALIZE_TURN,
  MOVE
}

export const reducer = (state: Game, action: any): Game => {
  const { type, payload } = action
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
      console.log(action)
      if (state.activeTurn === undefined || state.activeTurn.status === undefined) {
        if (!isColor(state.activeColor)) {
          throw new GameError({
            model: 'Turn',
            errorMessage: `Invalid activeColor ${state.activeColor}`
          })
        }
        const activePlayer = state.players[state.activeColor]
        if (!activePlayer || activePlayer.active === false) {
          throw new GameError({
            model: 'Turn',
            errorMessage: `No activePlayer`
          })
        }
        const roll: Roll = [action.payload.values.die1, action.payload.values.die2]

        initializeTurn({ player: activePlayer, roll })
      }
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
        if (!isColor(state.activeColor)) {
          throw new GameError({
            model: 'Turn',
            errorMessage: 'Invalid color'
          })
        }
        const activeColor = state.activeColor
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
      if (!isColor(state.activeColor)) {
        throw new GameError({
          model: 'Turn',
          errorMessage: 'Invalid color'
        })
      }
      const activeColor = state.activeColor as Color
      const activePlayer = state.players[activeColor]
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
          if (activePlayer.color !== payload.checkerbox.color) {
            throw new GameError({
              model: 'Move',
              errorMessage: 'Not your checker to move'
            })
          }
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
              draft.mode = getMoveMode(activeMove.origin, payload.checkerbox, activeColor, activePlayer, activeMove.dieValue)
              console.log(draft.mode)
            } else {
              throw new GameError({
                model: 'Game',
                errorMessage: 'Invalid origin or destination'
              })
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
            case MoveMode.OFF:
              newBoard = off(state.board, newMove)
              break
            case MoveMode.REENTER:
              console.log('[Game Reducer] MoveMode.REENTER newMove', newMove)
              newBoard = reenter(state.board, newMove)
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
          if (activePlayer.color !== payload.checkerbox.color) {
            throw new GameError({
              model: 'Move',
              errorMessage: 'Not your checker to move'
            })
          }


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
            draft.mode = getMoveMode(activeMove.origin as CheckerBox, draft.destination as CheckerBox, activeColor, activePlayer, activeMove.dieValue)
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



}