import { produce } from 'immer'
import { Game, GameError, Color, isColor, CHECKERS_PER_PLAYER } from './game'
import { Board } from '../components/Board/state'
import { Roll } from '../components/Die/state/types'
import { CheckerBox, isCheckerBox } from '../components/CheckerBox/state/types'
import { pointToPoint, off, hit, reenter } from './move'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { MoveStatus, MoveMode, Move } from '../components/CheckerBox/state/'
import { turnReducer } from '../components/Player/state'
import { getBearOffQuadrantLocation, initializeTurn } from '../components/Player/state/types'
import { POINT_COUNT, getCheckerBoxes } from '../components/Board/state/types/board'
import { QuadrantLocation } from '../components/Quadrant/state'
import { getHomeQuadrantLocation } from '../components/Player/state/types/player'

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
  console.log('[Game Context] reducer params action.type', GAME_ACTION_TYPE[type])
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

        initializeTurn({ board: state.board, player: activePlayer, roll })
      }
      return produce(state, draft => {
        draft.dice = newDice
      })
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      const newTurn = turnReducer(state.activeTurn, action)
      const possibleMoves = newTurn.moves.filter(m => m.status !== MoveStatus.NO_MOVE)
      if (possibleMoves.length === 0) {
        console.error('Resetting activeTurn. No moves.', state)
        return produce(state, draft => {
          draft.activeTurn.id = undefined
          draft.activeTurn.player = undefined
          draft.activeTurn.status = undefined
          draft.activeTurn.board = undefined
          draft.activeTurn.moves = []
          draft.activeColor = state.activeColor === 'black' ? 'white' : 'black'
          draft.players.white.active = false
          draft.players.black.active = false
          draft.players[draft.activeColor].active = true
        })
      } else {
        return produce(state, draft => {
          draft.activeTurn = newTurn
        })

      }

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
        draft.dice[activeColor].dice[0].value = undefined
        draft.dice[activeColor].dice[1].value = undefined

        draft.activeTurn.status = undefined
        draft.activeTurn.id = undefined
        draft.activeTurn.roll = undefined
        draft.activeTurn.moves = []
      })
    case GAME_ACTION_TYPE.MOVE:
      // FIXME: Move all of this stuff to move reducer
      console.log(state.activeTurn.moves)
      let activeMove = state.activeTurn.moves.find(m => m.status === MoveStatus.INITIALIZED)

      if (!isColor(state.activeColor)) {
        throw new GameError({
          model: 'Turn',
          errorMessage: 'Invalid color'
        })
      }
      const activeColor = state.activeColor as Color
      const activePlayer = state.players[activeColor]
      // const homeQuadrant = state.board.quadrants.find(q => q.location === activePlayer.bearOffQuadrantLocation)
      const bearOffQuadrantLocation = getBearOffQuadrantLocation(activePlayer.moveDirection)
      const bearOffQuadrant = state.board.quadrants.find(q => q.location === bearOffQuadrantLocation)
      if (bearOffQuadrant === undefined) {
        throw new GameError({
          model: 'Turn',
          errorMessage: 'Invalid color'
        })
      }
      console.log('[ActiveMove] activeMove:', activeMove)
      let moveMode: MoveMode | undefined = undefined
      let origin: CheckerBox | undefined = undefined
      let destination: CheckerBox | undefined = undefined
      if (activeMove === undefined) {
        console.error(state)
        return state
      }
      state.activeTurn.moves.forEach((m, i) => {
        console.log(`state.activeTurn.moves[${i}].status:`, MoveStatus[state.activeTurn.moves[i].status])
      })
      if (!activeMove) {
        console.error('No more moves')
      } else {
        origin = payload.checkerbox
        if (!isCheckerBox(origin)) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No origin checkerbox'
          })
        }
        let totalHomeboardCheckers = state.board.off[activePlayer.color].checkers.length
        bearOffQuadrant.points.forEach(p => {
          if (p.checkers.length > 0 && p.checkers[0].color === activePlayer.color) {
            totalHomeboardCheckers += p.checkers.length
          }
        })

        if (origin.checkers.length > 0 && origin.checkers[0].color !== activePlayer.color) {
          // noop
          console.error('Not your checker')
          return state
        }
        else if (totalHomeboardCheckers === CHECKERS_PER_PLAYER) {
          moveMode = MoveMode.BEAR_OFF
          destination = state.board.off[activePlayer.color]
        } else if (typeof origin.position === 'number') {
          const destinationPosition =
            activePlayer.moveDirection === 'clockwise'
              ? origin.position + activeMove.dieValue
              : origin.position - activeMove.dieValue
          destination = getCheckerBoxes(state.board).find((cb: CheckerBox) => cb.position === destinationPosition)
          if (!destination) {
            console.log(destinationPosition)
            throw new GameError({
              model: 'Move',
              errorMessage: `No destination position from ${origin.position} with ${activeMove.dieValue}`
            })
          }
          if (
            destination.checkers.length === 0 ||
            (
              destination.checkers.length >= 1 &&
              destination.checkers[0].color === activePlayer.color
            )
          ) {
            moveMode = MoveMode.POINT_TO_POINT
          } else if (
            destination.checkers.length === 1 &&
            destination.checkers[0].color !== activePlayer.color
          ) {
            moveMode = MoveMode.HIT
          } else {
            console.log(origin)
            console.log(destination)
            console.log(activeMove)
            console.log(activePlayer)
            return state
          }
          if (moveMode === undefined) {
            moveMode = MoveMode.NO_MOVE
          }
          console.log(MoveMode[moveMode])
        } else {
          if (origin.position === 'rail') {
            if (activeMove === undefined) {
              throw new GameError({
                model: 'Move',
                errorMessage: 'No activeMove'
              })
            }
            console.log('REENTER')
            const homeQuadrantLocation = getHomeQuadrantLocation(activePlayer.moveDirection)
            const homeQuadrant = state.board.quadrants.find(q => q.location === homeQuadrantLocation)
            if (homeQuadrant === undefined) {
              throw new GameError({
                model: 'Move',
                errorMessage: 'No homeQuadrant'
              })
            }
            // FIXME
            const am = activeMove as Move
            if (activePlayer.moveDirection === 'counterclockwise') {
              destination = homeQuadrant.points.find(p => p.position === POINT_COUNT - am.dieValue + 1)
            } else {
              destination = homeQuadrant.points.find(p => p.position === am.dieValue)
            }
            if (destination === undefined) {
              throw new GameError({
                model: 'Move',
                errorMessage: 'No destination'
              })
            }
            console.error('THERE IS A BUG RIGHT HERE')
            console.log(destination.checkers.length)
            // console.log(destination.checkers[0].color)
            console.error(activePlayer)
            console.log(activePlayer.color)
            if (destination.checkers.length > 1 && destination.checkers[0].color !== activePlayer.color) {
              console.log(am)
              console.log(state.activeTurn.moves)
              // moveMode = MoveMode.NO_MOVE
            }
            moveMode = MoveMode.REENTER
          } else {
            throw Error('Huh?')
          }
        }
        console.log('moveMode', MoveMode[moveMode])

        const newMove = produce(activeMove, draft => {
          draft.origin = origin
          draft.destination = destination
          draft.status = MoveStatus.COMPLETED
        })

        let finalBoard: Board | undefined = undefined

        switch (moveMode) {
          case MoveMode.POINT_TO_POINT:
            finalBoard = pointToPoint(state.board, newMove)
            break
          case MoveMode.HIT:
            finalBoard = hit(state.board, newMove)
            break
          case MoveMode.BEAR_OFF:
            finalBoard = off(state.board, newMove)
            break
          case MoveMode.REENTER:
            finalBoard = reenter(state.board, newMove)
            console.log(finalBoard?.off)
            break
          default:
            return state
        }
        if (!finalBoard) {
          throw new GameError({
            model: 'Move',
            errorMessage: `No new board for ${MoveMode[activeMove.mode as MoveMode]}`
          })
        }
        // FIXME
        let activeMoveIndex = state.activeTurn.moves.findIndex(m => m.id === newMove.id)
        const newState = produce(state, draft => {
          draft.activeTurn.moves[activeMoveIndex] = newMove
          draft.board = finalBoard as Board
        })
        return newState
      }

      return state
  }
  return state
}