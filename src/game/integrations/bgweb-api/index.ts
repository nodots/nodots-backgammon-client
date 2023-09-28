import { Turn } from '../../turn'
import { Color } from '../../game'
import { Player } from '../../../components/Player/state'
import { Roll } from '../../../components/Die/state/types'
import { Board } from '../../../components/Board/state/types/board'

const black = 'o'
const white = 'x'
const analysisMoves = 5

export interface BgWebApiPlay {
  from: string
  to: string
}
export interface BgWebApi_TurnAnalysis {
  "evaluation": {
    "diff": number
    "eq": number
    "info": {
      "cubeful": boolean
      "plies": number
    }
    "probability": {
      "lose": number
      "loseBG": number
      "loseG": number
      "win": number
      "winBG": number
      "winG": number
    }
  }
  "play": BgWebApiPlay[]
}

interface BgApiPayload {
  board: {
    'o': {
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
      '6': number
      '7': number
      '8': number
      '9': number
      '10': number
      '11': number
      '12': number
      '13': number
      '14': number
      '15': number
      '16': number
      '17': number
      '18': number
      '19': number
      '20': number
      '21': number
      '22': number
      '23': number
      '24': number
      'bar': number
    }
    'x': {
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
      '6': number
      '7': number
      '8': number
      '9': number
      '10': number
      '11': number
      '12': number
      '13': number
      '14': number
      '15': number
      '16': number
      '17': number
      '18': number
      '19': number
      '20': number
      '21': number
      '22': number
      '23': number
      '24': number
      'bar': number
    }

  }
  cubeful: boolean
  dice: Roll
  player: string
  'score-moves': boolean
  'max-moves'?: number
}

type PointLabel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | 'bar'

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

export const BgWebApi_getTurnAnalytics = async (board: Board, roll: Roll, players: { white: Player, black: Player }): Promise<BgWebApi_TurnAnalysis[] | void> => {
  let turnAnalysis: BgWebApi_TurnAnalysis[] | undefined = undefined
  const payload = buildTurnAnalysisPayload(board, roll, players)

  await getMoves(payload as any as JSON).then(async (m) => {
    turnAnalysis = await m.json() as BgWebApi_TurnAnalysis[]
  })
  return turnAnalysis
}

function buildTurnAnalysisPayload (board: Board, roll: Roll, players: { white: Player, black: Player }): BgApiPayload {
  const activePlayer = players.white.active ? players.white : players.black
  const activeColor = activePlayer.color

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
    dice: roll,
    player: activeColor === 'black' ? black : white,
    'score-moves': true
  }

  board.quadrants.forEach(q => {
    q.points.forEach(p => {
      if (p.checkers.length > 0) {
        const counterClockwisePosition = p.positionCounterClockwise
        const clockwisePosition = p.positionClockwise

        let clockwisePlayer: Player | undefined = undefined
        let counterClockwisePlayer: Player | undefined = undefined
        clockwisePlayer = players.white.moveDirection === 'clockwise' ? players.white : players.black
        counterClockwisePlayer = players.white.moveDirection === 'counterclockwise' ? players.white : players.black

        const blackCheckerCount = p.checkers.filter(c => c.color === 'black').length
        const whiteCheckerCount = p.checkers.filter(c => c.color === 'white').length

        let relativePosition: number | undefined

        if (blackCheckerCount > 0) {
          if (clockwisePlayer.color === 'black') {
            relativePosition = clockwisePosition
          } else {
            relativePosition = counterClockwisePosition
          }
          const pString = relativePosition.toString() as PointLabel
          payload.board[black][pString] = blackCheckerCount
        }
        if (whiteCheckerCount > 0) {
          if (clockwisePlayer.color === 'white') {
            relativePosition = clockwisePosition
          } else {
            relativePosition = counterClockwisePosition
          }
          const pString = relativePosition.toString() as PointLabel
          payload.board[white][pString] = whiteCheckerCount
        }
      }
    })
    if (board.off.black.checkers.length > 0) {
      payload.board[black].bar = board.off.black.checkers.length
    }
    if (board.off.white.checkers.length > 0) {
      payload.board[white].bar = board.off.white.checkers.length
    }
  })
  console.log(`black = ${black}`)
  for (const [k, v] of Object.entries(payload.board[black])) {
    if (v > 0) {
      console.log(`${k} : ${v}`)
    }
  }
  console.log(`white = ${white}`)
  for (const [k, v] of Object.entries(payload.board[white])) {
    if (v > 0) {
      console.log(`${k} : ${v}`)
    }
  }

  return payload
}
