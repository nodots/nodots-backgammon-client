import { produce } from 'immer'
import { Game, GameError, isColor } from './game'
import { Roll } from '../components/Die/state/types'
import { isMove } from './move'
import { reducer as moveReducer } from './move/reducer'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { Move } from './move'
import { MoveStatus } from '../components/CheckerBox/state/'
import { turnReducer } from '../components/Player/state'
import { Turn, initializeTurn } from './turn'
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
          const dieValue = i % 2 ? roll[1] : roll[0]
          draft.activeTurn.moves[i].dieValue = dieValue
        })
      })
      return newGame
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      const newTurn = turnReducer(game.activeTurn, action)
      const possibleMoves = newTurn.moves.filter(m => m.status === MoveStatus.INITIALIZED)
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
      let moveResults = moveReducer(game.activeTurn, payload.checkerbox)
      if (moveResults) {
        const failedMove = moveResults.moves.find(m => m.status === MoveStatus.NO_MOVE)
        console.log(failedMove)
        console.log(moveResults)
        // Check is we have different die values in roll then test with other die value if we have another move
        if (isMove(failedMove) && game.activeTurn.roll[0] !== game.activeTurn.roll[1]) {
          const nextMoveOrder = failedMove.order + 1
          if (isMove(moveResults.moves[nextMoveOrder])) {
            const die1Value = moveResults.moves[failedMove.order].dieValue
            const die2Value = moveResults.moves[nextMoveOrder].dieValue
            const turnDraft = produce(game.activeTurn as Turn, draft => {
              draft.moves[failedMove.order].dieValue = die2Value
              draft.moves[nextMoveOrder].dieValue = die1Value
            })
            console.log(turnDraft)
            moveResults = moveReducer(turnDraft, payload.checkerbox)
            return produce(game, draft => {
              draft.activeTurn = moveResults
              draft.board = moveResults.board
            })
          }
        }
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