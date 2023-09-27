import { produce } from 'immer'
import { Game, GameError, Color, isColor, generateId } from './game'
import { Roll } from '../components/Die/state/types'
import { getCheckerboxCoordinates, isMove } from './move'
import { areValidMoves, reducer as moveReducer } from './move/reducer'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { Move } from './move'
import { CheckerBox, MoveStatus } from '../components/CheckerBox/state/'
import { InitializeTurnAction, TurnStatus, initializeMoves } from './turn'
import { Turn, initializeTurn } from './turn'
import { getPipCountForPlayer } from '../components/Board/state/types/board'
import { Point } from '../components/Point/state/types'

interface BgWebApiPlay {
  from: string,
  to: string
}

interface BgWebApiResponse {
  "evaluation": {
    "diff": number,
    "eq": number,
    "info": {
      "cubeful": boolean,
      "plies": number
    },
    "probability": {
      "lose": number,
      "loseBG": number,
      "loseG": number,
      "win": number,
      "winBG": number,
      "winG": number
    }
  },
  "play": BgWebApiPlay[]
}

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

        if (game.activeTurn?.player === undefined) {
          initializeTurn({ board: game.board, player: activePlayer, roll })
        }
      }
      const newGame = produce(game, draft => {
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
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      if (isColor(game.activeColor)) {
        const initializeMovesPayload: InitializeTurnAction = {
          board: payload.board,
          player: payload.player,
          roll: payload.roll
        }

        const moves = initializeMoves(initializeMovesPayload)
        const activeColor: Color = game.activeColor
        const newTurn = produce(game, draft => {
          draft.activeTurn = {
            id: generateId(),
            board: game.board,
            player: game.players[activeColor],
            roll: payload.roll,
            status: TurnStatus.INITIALIZED,
            moves
          }
        })

        return newTurn
      }
      return game
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

        draft.activeTurn = undefined
      })
    case GAME_ACTION_TYPE.MOVE:
      if (game.activeTurn) {
        const bgApiPayload = buildBgApiPayload(game)
        console.log(JSON.stringify(bgApiPayload))

        const getMoves = async (bgApiPayload: JSON) => {
          const moves = await fetch('http://localhost:8080/api/v1/getmoves', {
            headers: {
              'content-type': 'application/json',
              'cross-domain': 'true'
            },
            method: 'POST',
            body: JSON.stringify(bgApiPayload)
          })



          return moves
        }

        getMoves(bgApiPayload as any as JSON).then(async (m) => {
          const analysis: BgWebApiResponse[] = await m.json()
          const startingPosition = action.payload.checkerbox.position
          analysis.forEach(a => {
            a.play.forEach(p => {
              if (p.from === startingPosition.toString()) {
                console.log('possible move p:', p)
              }

            })
          })
        })

        let moveResults = moveReducer(game.activeTurn, payload.checkerbox)
        if (moveResults) {
          const failedMove = moveResults.moves.find(m => m.status === MoveStatus.NO_MOVE)
          if (isMove(failedMove)) {
            const nextMoveOrder = failedMove.order + 1

            //Check if we have different die values in roll then test with other die value if we have another move
            if (isMove(moveResults.moves[nextMoveOrder]) && game.activeTurn.roll[0] !== game.activeTurn.roll[1]) {
              const die1Value = moveResults.moves[failedMove.order].dieValue
              const die2Value = moveResults.moves[nextMoveOrder].dieValue
              const turnDraft = produce(game.activeTurn as Turn, draft => {
                draft.moves[failedMove.order].dieValue = die2Value
                draft.moves[nextMoveOrder].dieValue = die1Value
              })
              moveResults = moveReducer(turnDraft, payload.checkerbox)
              return produce(game, draft => {
                draft.activeTurn = moveResults
                draft.board = moveResults.board
              })

            } else {
              // TODO: Need to check here if there are any available moves. If not, turn is over.
              if (isColor(game.activeColor)) {
                const activeColor: Color = game.activeColor
                const activePlayer = game.players[activeColor]
                const dieValue = game.activeTurn.roll[failedMove.order]
                const areMoves = areValidMoves(game.activeTurn, activePlayer, dieValue)
                if (areMoves) {
                  return game
                } else {
                  return produce(game, draft => {
                    draft.activeTurn = moveResults
                    draft.board = moveResults.board
                  })
                }
              }
              return game
            }
          }
          const newGame = produce(game, draft => {
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
        const checkerToRevert = checkerbox.checkers[checkerbox.checkers.length - 1]
        const moveIndexToRevert = moves.findIndex((m: Move) => m.checker?.id === checkerToRevert.id)
        const moveToRevert = moves[moveIndexToRevert]

        const newMove = produce(moveToRevert as Move, draft => {
          draft.origin = undefined
          draft.destination = undefined
          draft.checker = undefined
          draft.status = MoveStatus.INITIALIZED
          draft.mode = undefined
          draft.hit = undefined
        })

        if (moveToRevert && moveToRevert.destination && moveToRevert.origin) {

          const origin: CheckerBox = Object.assign(moveToRevert.destination)
          const destination: CheckerBox = Object.assign(moveToRevert.origin)

          const originInfo = getCheckerboxCoordinates(game.board, origin.id)
          const destinationInfo = getCheckerboxCoordinates(game.board, destination.id)

          const newOriginCheckers = origin.checkers.filter(c => c.id !== checkerToRevert.id)
          const newDestinationCheckers = destination.checkers.concat(checkerToRevert)

          const newOrigin = produce(origin, draft => {
            draft.checkers = newOriginCheckers
          })

          const newDestination = produce(destination, draft => {
            draft.checkers = newDestinationCheckers
          })

          const newBoard = produce(game.board, draft => {
            draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin as Point
            draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination as Point
          })

          return produce(game, draft => {
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

interface BgApiPayload {
  board: {
    'o': {
      '1': number,
      '2': number,
      '3': number,
      '4': number,
      '5': number,
      '6': number,
      '7': number,
      '8': number,
      '9': number,
      '10': number,
      '11': number,
      '12': number,
      '13': number,
      '14': number,
      '15': number,
      '16': number,
      '17': number,
      '18': number,
      '19': number,
      '20': number,
      '21': number,
      '22': number,
      '23': number,
      '24': number,
      'bar': number,
    },
    'x': {
      '1': number,
      '2': number,
      '3': number,
      '4': number,
      '5': number,
      '6': number,
      '7': number,
      '8': number,
      '9': number,
      '10': number,
      '11': number,
      '12': number,
      '13': number,
      '14': number,
      '15': number,
      '16': number,
      '17': number,
      '18': number,
      '19': number,
      '20': number,
      '21': number,
      '22': number,
      '23': number,
      '24': number,
      'bar': number
    },

  },
  cubeful: boolean,
  dice: Roll,
  'max-moves': number,
  player: 'x' | 'o',
  'score-moves': boolean
}

type PointLabel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | 'bar'

function buildBgApiPayload (game: Game): BgApiPayload {
  const black = 'o'
  const white = 'x'

  if (game.activeTurn) {
    const payload: BgApiPayload = {
      board: {
        'x': {
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
          '6': 0,
          '7': 0,
          '8': 0,
          '9': 0,
          '10': 0,
          '11': 0,
          '12': 0,
          '13': 0,
          '14': 0,
          '15': 0,
          '16': 0,
          '17': 0,
          '18': 0,
          '19': 0,
          '20': 0,
          '21': 0,
          '22': 0,
          '23': 0,
          '24': 0,
          'bar': 0
        },
        'o': {
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
          '6': 0,
          '7': 0,
          '8': 0,
          '9': 0,
          '10': 0,
          '11': 0,
          '12': 0,
          '13': 0,
          '14': 0,
          '15': 0,
          '16': 0,
          '17': 0,
          '18': 0,
          '19': 0,
          '20': 0,
          '21': 0,
          '22': 0,
          '23': 0,
          '24': 0,
          'bar': 0
        }
      },
      cubeful: true,
      dice: game.activeTurn.roll,
      'max-moves': 4,
      player: game.activeTurn.player.color === 'black' ? black : white,
      'score-moves': true
    }

    game.board.quadrants.forEach(q => {
      q.points.forEach(p => {
        if (p.checkers.length > 0) {
          const pString = p.position.toString() as PointLabel

          const blackCheckerCount = p.checkers.filter(c => c.color === 'black').length
          const whiteCheckerCount = p.checkers.filter(c => c.color === 'white').length

          if (blackCheckerCount > 0) {
            payload.board[black][pString] = blackCheckerCount
          }
          if (whiteCheckerCount > 0) {
            payload.board[white][pString] = whiteCheckerCount
          }
        }
      })
      if (game.board.off.black.checkers.length > 0) {
        payload.board.x.bar = game.board.off.black.checkers.length
      }
      if (game.board.off.white.checkers.length > 0) {
        payload.board.x.bar = game.board.off.white.checkers.length
      }
    })
    return payload
  }
  throw new GameError({
    model: 'Move',
    errorMessage: 'Could not get BgApiPayload'
  })
}


