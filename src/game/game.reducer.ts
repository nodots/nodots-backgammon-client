import { produce } from 'immer'
import { Board } from '../components/Board/state'
import { Game, GameError, isColor } from './game'
import { Roll } from '../components/Die/state/types'
import { pointToPoint, hit, off, reenter, isMove } from './move'
import { reducer as moveReducer } from './move/reducer'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { Move } from './move'
import { MoveStatus, MoveMode } from '../components/CheckerBox/state/'
import { turnReducer } from '../components/Player/state'
import { initializeTurn } from '../components/Player/state/types'
import { revert } from './move/revert'
import { getPipCountForPlayer } from '../components/Board/state/types/board'

export enum GAME_ACTION_TYPE {
  SET_DICE_VALUES,
  SET_CUBE_VALUE,
  INITIALIZE_TURN,
  FINALIZE_TURN,
  MOVE,
  REVERT_MOVE
}

const saveState = (state: Game): void => {
  localStorage.setItem('game', JSON.stringify(state))
}

export const retrieveState = (): Game | undefined => {
  const gameString = localStorage.getItem('game')
  let game: Game | undefined = undefined
  if (gameString) {
    game = JSON.parse(gameString)
  }
  return game
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
      console.log('[Game Reducer]: SET_DICE_VALUES state.dice:', state.dice)
      console.log('[Game Reducer]: SET_DICE_VALUES type', type)
      console.log('[Game Reducer]: SET_DICE_VALUES payload.values:', payload.values)
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
        if (state.activeTurn.player === undefined) {
          initializeTurn({ board: state.board, player: activePlayer, roll })
        }
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
      return produce(state, draft => {
        if (!isColor(state.activeColor)) {
          throw new GameError({
            model: 'Turn',
            errorMessage: 'Invalid color'
          })
        }
        draft.players.black.pipCount = getPipCountForPlayer(state.board, state.players.black)
        draft.players.white.pipCount = getPipCountForPlayer(state.board, state.players.white)

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
      const activeTurn = produce(state.activeTurn, draft => {
        if (state.activeTurn.board === undefined) {
          draft.board = state.board
        }
        if (state.activeTurn.player === undefined) {
          if (!isColor(state.activeColor)) {
            throw new GameError({
              model: 'Move',
              errorMessage: 'Invalid color'
            })
          }
          draft.player = state.players[state.activeColor]
        }
      })
      console.error(activeTurn)
      console.log(payload)
      const newMove = moveReducer(activeTurn, payload.checkerbox)
      console.log('[GAME_REDUCER] newMove:', newMove)
      let finalBoard: Board | undefined = undefined
      let finalMove: Move | undefined = undefined
      if (!newMove) {
        console.error('No newMove')
      }
      switch (newMove.mode) {
        case MoveMode.POINT_TO_POINT:
          finalBoard = pointToPoint(state.board, newMove)
          break
        case MoveMode.HIT:
          const hitResults = hit(state.board, newMove)
          finalBoard = hitResults.board
          finalMove = hitResults.move
          break
        case MoveMode.BEAR_OFF:
          finalBoard = off(state.board, newMove)
          break
        case MoveMode.REENTER:
          finalBoard = reenter(state.board, newMove)
          break
        default:
          return state
      }
      if (!finalBoard) {
        throw new GameError({
          model: 'Move',
          errorMessage: `No new board for ${MoveMode[newMove.mode as MoveMode]}`
        })
      }

      let activeMoveIndex = state.activeTurn.moves.findIndex(m => m.id === newMove.id)
      const newState = produce(state, draft => {
        // reset origin and destination for reverted move
        draft.board = finalBoard as Board
        draft.activeTurn.moves[activeMoveIndex] = finalMove || newMove
      })


      saveState(newState)
      return newState

    case GAME_ACTION_TYPE.REVERT_MOVE: {
      const checkerToRevert = payload.checkerbox.checkers[payload.checkerbox.checkers.length - 1]
      if (!checkerToRevert) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No checkerToRevert'
        })
      }
      const moveToRevert = state.activeTurn.moves.find(m => m.checker?.id === checkerToRevert.id)
      if (!moveToRevert) {
        // throw new GameError({
        //   model: 'Move',
        //   errorMessage: 'No moveToRevert'
        // })
        console.error('Cannot revert')
      }
      if (isMove(moveToRevert)) {
        const revertResults = revert(state.board, moveToRevert)

        const revertMoveIndex = state.activeTurn.moves.findIndex(m => m.id === moveToRevert.id)

        const revertedState = produce(state, draft => {
          draft.activeTurn.moves[revertMoveIndex] = revertResults.move
          draft.board = revertResults.board
        })

        console.log('[Revert] revertedState:', revertedState)


        return revertedState

      }

    }
  }


  saveState(state)
  return state
}