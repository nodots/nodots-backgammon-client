import { produce } from 'immer'
import { Game, GameError, Color, isColor, generateId } from './game'
import { Roll } from '../components/die/state/types'
import { isMove } from './move'
import { getCheckerboxCoordinates } from '../components/board/state/types/board'
import { areValidMoves, reducer as moveReducer } from './move/reducer'
import { reducer as diceReducer } from '../components/die/state'
import { reducer as cubeReducer } from '../components/cube/state'
import { Move } from './move'
import { Checkerbox, MoveStatus } from '../components/Checkerbox/state'
import {
  Analytics,
  InitializeTurnAction,
  TurnStatus,
  initializeMoves,
} from './turn'
import { Turn, initializeTurn } from './turn'
import {
  getCheckerBoxes,
  getPipCountForPlayer,
} from '../components/board/state/types/board'
import { Point } from '../components/Point/state/types'
import { Play } from './turn'
import {
  BgWebApi_TurnAnalysis,
  BgWebApi_getTurnAnalytics,
} from './integrations/bgweb-api'
import { isPlayer } from '../components/player/state'

export enum GAME_ACTION_TYPE {
  SET_DICE_VALUES,
  SET_CUBE_VALUE,
  INITIALIZE_TURN,
  FINALIZE_TURN,
  GET_TURN_ANALYTICS,
  MOVE,
  REVERT_MOVE,
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
  // console.log('[Game Reducer] reducer params action.type', GAME_ACTION_TYPE[type])
  // console.log('[Game Reducer] reducer params action.payload', payload)
  switch (type) {
    case GAME_ACTION_TYPE.SET_CUBE_VALUE:
      const newCube = cubeReducer(game.cube, action)
      const newCubeState = produce(game, (draft) => {
        draft.cube = newCube
      })
      return newCubeState
    case GAME_ACTION_TYPE.SET_DICE_VALUES:
      const newDice = diceReducer(game.dice, action)
      const roll: Roll = [
        action.payload.values.die1,
        action.payload.values.die2,
      ]
      if (
        game.activeTurn === undefined ||
        game.activeTurn.status === undefined
      ) {
        if (!isColor(game.activeColor)) {
          throw new GameError({
            model: 'Turn',
            errorMessage: `Invalid activeColor ${game.activeColor}`,
          })
        }
        const activePlayer = game.players[game.activeColor]
        if (!activePlayer || activePlayer.active === false) {
          throw new GameError({
            model: 'Turn',
            errorMessage: `No activePlayer`,
          })
        }

        if (game.activeTurn?.player === undefined) {
          initializeTurn({ board: game.board, player: activePlayer, roll })
        }
      }
      const newGame = produce(game, (draft) => {
        draft.dice = newDice
        if (game.activeTurn) {
          game.activeTurn.moves.forEach((m: Move, i: number) => {
            const dieValue = i % 2 ? roll[1] : roll[0]
            if (draft.activeTurn) {
              draft.activeTurn.moves[i].dieValue = dieValue
            }
          })
        }
      })
      return newGame
    // TODO: Move all of the turn stuff into the turn reducer. ;)
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      if (
        !isColor(game.activeColor) ||
        !isPlayer(game.players[game.activeColor])
      ) {
        throw new GameError({
          model: 'Turn',
          errorMessage: 'No color or active player',
        })
      }
      const initializeMovesPayload: InitializeTurnAction = {
        board: payload.board,
        player: payload.player,
        roll: payload.roll,
        analytics: payload.analytics,
      }
      const moves = initializeMoves(initializeMovesPayload)
      const activeColor: Color = game.activeColor
      return produce(game, (draft) => {
        draft.activeTurn = {
          id: generateId(),
          board: game.board,
          player: game.players[activeColor],
          roll: payload.roll,
          status: TurnStatus.INITIALIZED,
          moves,
          analytics: payload.analytics,
        }
      })

    case GAME_ACTION_TYPE.GET_TURN_ANALYTICS:
      if (!game.activeTurn) {
        throw Error('No game.activeTurn')
      } else {
        BgWebApi_getTurnAnalytics(
          game.board,
          game.activeTurn.roll,
          game.players
        ).then((a) => {
          const gameWAnalytics = produce(game, (draft) => {
            if (draft.activeTurn) {
              const analytics: Analytics = {
                api: 'bgwebapi',
                analysis: a,
              }
              console.log(analytics)
              draft.activeTurn.analytics.push(analytics)
            }
          })
          console.log(gameWAnalytics)
          return gameWAnalytics
        })
      }
      return game
    case GAME_ACTION_TYPE.FINALIZE_TURN:
      return produce(game, (draft) => {
        if (!isColor(game.activeColor)) {
          throw new GameError({
            model: 'Turn',
            errorMessage: 'Invalid color',
          })
        }
        draft.players.black.pipCount = getPipCountForPlayer(
          game.board,
          game.players.black
        )
        draft.players.white.pipCount = getPipCountForPlayer(
          game.board,
          game.players.white
        )

        const activeColor = game.activeColor
        const inActiveColor = activeColor === 'white' ? 'black' : 'white'

        draft.players[activeColor].active = false
        draft.players[inActiveColor].active = true
        draft.activeColor = inActiveColor
        draft.dice[activeColor].dice[0].value = undefined
        draft.dice[activeColor].dice[1].value = undefined

        draft.activeTurn = undefined
      })
    case GAME_ACTION_TYPE.MOVE:
      if (game.activeTurn) {
        let moveResults = moveReducer(game.activeTurn, payload.origin)
        console.log(moveResults.moves)
        if (moveResults) {
          const failedMove = moveResults.moves.find(
            (m) => m.status === MoveStatus.NO_MOVE
          )
          if (isMove(failedMove)) {
            const nextMoveOrder = failedMove.order + 1

            //Check if we have different die values in roll then test with other die value if we have another move
            if (
              isMove(moveResults.moves[nextMoveOrder]) &&
              game.activeTurn.roll[0] !== game.activeTurn.roll[1]
            ) {
              const die1Value = moveResults.moves[failedMove.order].dieValue
              const die2Value = moveResults.moves[nextMoveOrder].dieValue
              const turnDraft = produce(game.activeTurn as Turn, (draft) => {
                draft.moves[failedMove.order].dieValue = die2Value
                draft.moves[nextMoveOrder].dieValue = die1Value
              })
              moveResults = moveReducer(turnDraft, payload.checkerbox)
              return produce(game, (draft) => {
                draft.activeTurn = moveResults
                draft.board = moveResults.board
              })
            } else {
              // TODO: Need to check here if there are any available moves. If not, turn is over.
              if (isColor(game.activeColor)) {
                const activeColor: Color = game.activeColor
                const activePlayer = game.players[activeColor]
                const dieValue = game.activeTurn.roll[failedMove.order]
                const areMoves = areValidMoves(
                  game.activeTurn,
                  activePlayer,
                  dieValue
                )
                if (areMoves) {
                  return game
                } else {
                  return produce(game, (draft) => {
                    draft.activeTurn = moveResults
                    draft.board = moveResults.board
                  })
                }
              }
              return game
            }
          }
          const newGame = produce(game, (draft) => {
            draft.activeTurn = moveResults
            draft.board = moveResults.board
          })
          return newGame
        }
      }

      return game
    case GAME_ACTION_TYPE.REVERT_MOVE: {
      const checkerbox = payload.checkerbox
      if (game.activeTurn && game.activeTurn.moves) {
        const moves = game.activeTurn.moves
        const checkerToRevert =
          checkerbox.checkers[checkerbox.checkers.length - 1]
        const moveIndexToRevert = moves.findIndex(
          (m: Move) => m.checker?.id === checkerToRevert.id
        )
        const moveToRevert = moves[moveIndexToRevert]

        const newMove = produce(moveToRevert as Move, (draft) => {
          draft.origin = undefined
          draft.destination = undefined
          draft.checker = undefined
          draft.status = MoveStatus.INITIALIZED
          draft.mode = undefined
          draft.hit = undefined
        })

        if (moveToRevert && moveToRevert.destination && moveToRevert.origin) {
          const origin: Checkerbox = Object.assign(moveToRevert.destination)
          const destination: Checkerbox = Object.assign(moveToRevert.origin)

          const originInfo = getCheckerboxCoordinates(game.board, origin.id)
          const destinationInfo = getCheckerboxCoordinates(
            game.board,
            destination.id
          )

          const newOriginCheckers = origin.checkers.filter(
            (c) => c.id !== checkerToRevert.id
          )
          const newDestinationCheckers =
            destination.checkers.concat(checkerToRevert)

          const newOrigin = produce(origin, (draft) => {
            draft.checkers = newOriginCheckers
          })

          const newDestination = produce(destination, (draft) => {
            draft.checkers = newDestinationCheckers
          })

          const newBoard = produce(game.board, (draft) => {
            draft.quadrants[originInfo.quadrantIndex].points[
              originInfo.pointIndex
            ] = newOrigin as Point
            draft.quadrants[destinationInfo.quadrantIndex].points[
              destinationInfo.pointIndex
            ] = newDestination as Point
          })

          return produce(game, (draft) => {
            if (draft.activeTurn) {
              draft.board = newBoard
              draft.activeTurn.moves[moveIndexToRevert] = newMove
            }
          })
        }
      }
    }
  }

  saveState(game)
  return game
}
