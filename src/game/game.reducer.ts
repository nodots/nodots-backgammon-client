import { produce } from 'immer'
import { Board } from '../components/Board/state'
import { Game, GameError, isColor } from './game'
import { Roll } from '../components/Die/state/types'
import { isTurn, Turn } from './turn'
import { pointToPoint, hit, off, reenter, isMove } from './move'
import { reducer as moveReducer } from './move/reducer'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { Move } from './move'
import { MoveStatus, MoveMode } from '../components/CheckerBox/state/'
import { turnReducer } from '../components/Player/state'
import { initializeTurn } from './turn'
import { revert } from './move/revert'
import { getPipCountForPlayer } from '../components/Board/state/types/board'
import CheckerBox from '../components/CheckerBox'

export enum GAME_ACTION_TYPE {
  SET_DICE_VALUES,
  SET_CUBE_VALUE,
  INITIALIZE_TURN,
  FINALIZE_TURN,
  MOVE,
  REVERT_MOVE
}

const saveState = (game: Game): void => {
  localStorage.setItem('game', JSON.stringify(game))
}

export const retrieveState = (): Game | undefined => {
  const gameString = localStorage.getItem('game')
  let game: Game | undefined = undefined
  if (gameString) {
    game = JSON.parse(gameString)
  }
  return game
}

export const reducer = (game: Game, action: any): Game => {
  const { type, payload } = action
  // console.log('[Game Reducer] reducer params state', state)
  // console.log('[Game Reducer] reducer params action.type', GAME_ACTION_TYPE[type])
  // console.log('[Game Reducer] reducer params action.payload', payload)
  switch (type) {
    case GAME_ACTION_TYPE.SET_CUBE_VALUE:
      const newCube = cubeReducer(game.cube, action)
      const newCubeState = produce(game, draft => {
        draft.cube = newCube
      })
      return newCubeState
    case GAME_ACTION_TYPE.SET_DICE_VALUES:
      const newDice = diceReducer(game.dice, action)
      const roll: Roll = [action.payload.values.die1, action.payload.values.die2]
      console.warn('[SET_DICE_VALUES]: SET_DICE_VALUES state.dice:', game.dice)
      console.warn('[SET_DICE_VALUES]: SET_DICE_VALUES type', type)
      console.warn('[SET_DICE_VALUES]: SET_DICE_VALUES payload.values:', payload.values)
      if (game.activeTurn === undefined || game.activeTurn.status === undefined) {
        if (!isColor(game.activeColor)) {
          throw new GameError({
            model: 'Turn',
            errorMessage: `Invalid activeColor ${game.activeColor}`
          })
        }
        const activePlayer = game.players[game.activeColor]
        if (!activePlayer || activePlayer.active === false) {
          throw new GameError({
            model: 'Turn',
            errorMessage: `No activePlayer`
          })
        }

        if (game.activeTurn.player === undefined) {
          initializeTurn({ board: game.board, player: activePlayer, roll })
        }
      }
      const newGame = produce(game, draft => {
        draft.dice = newDice
        game.activeTurn.moves.forEach((m: Move, i: number) => {
          console.warn(`[SET_DICE_VALUES] m:`, roll)
          const dieValue = i % 2 ? roll[1] : roll[0]
          draft.activeTurn.moves[i].dieValue = dieValue
        })
      })
      console.warn('[SET_DICE_VALUES] newGame:', newGame)
      return newGame
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      const newTurn = turnReducer(game.activeTurn, action)
      console.warn('[TRACE] GAME_ACTION_TYPE.INITIALIZE_TURN newTurn:', newTurn)
      const possibleMoves = newTurn.moves.filter(m => m.status === MoveStatus.INITIALIZED)
      console.warn('[TRACE] GAME_ACTION_TYPE.INITIALIZE_TURN possibleMoves:', newTurn.moves)
      if (possibleMoves.length === 0) {
        return produce(game, draft => {
          draft.activeTurn.id = undefined
          draft.activeTurn.player = undefined
          draft.activeTurn.status = undefined
          draft.activeTurn.board = undefined
          draft.activeTurn.moves = []
          draft.activeColor = game.activeColor === 'black' ? 'white' : 'black'
          draft.players.white.active = false
          draft.players.black.active = false
          draft.players[draft.activeColor].active = true
        })
      } else {
        return produce(game, draft => {
          draft.activeTurn = newTurn
        })
      }

    case GAME_ACTION_TYPE.FINALIZE_TURN:
      return produce(game, draft => {
        if (!isColor(game.activeColor)) {
          throw new GameError({
            model: 'Turn',
            errorMessage: 'Invalid color'
          })
        }
        draft.players.black.pipCount = getPipCountForPlayer(game.board, game.players.black)
        draft.players.white.pipCount = getPipCountForPlayer(game.board, game.players.white)

        const activeColor = game.activeColor
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
      const moveResults = moveReducer(game.activeTurn, payload.checkerbox)
      if (moveResults) {
        return produce(game, draft => {
          draft.activeTurn = moveResults
          draft.board = moveResults.board
        })
      } else {
        // throw new GameError({
        //   model: 'Move',
        //   errorMessage: 'No moveResults'
        // })
        console.error('[User Message]: no more moves. Click dice again to finalize move or double-click to revert.')
      }
      return game
    case GAME_ACTION_TYPE.REVERT_MOVE: {
      const checkerToRevert = payload.checkerbox.checkers[payload.checkerbox.checkers.length - 1]
      if (!checkerToRevert) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No checkerToRevert'
        })
      }
      const moveToRevert = game.activeTurn.moves.find(m => m.checker?.id === checkerToRevert.id)
      if (!moveToRevert) {
        console.error('Cannot revert')
      }
      if (isMove(moveToRevert)) {
        const revertResults = revert(game.board, moveToRevert)
        const revertMoveIndex = game.activeTurn.moves.findIndex(m => m.id === moveToRevert.id)

        const revertedState = produce(game, draft => {
          draft.activeTurn.moves[revertMoveIndex] = revertResults.move
          draft.board = revertResults.board
        })

        console.log('[Revert] revertedState:', revertedState)
        return revertedState
      }

    }
  }

  saveState(game)
  return game
}