import { GameRolled, GameDiceSwitched } from '..'
import { generateId, generateTimestamp } from '..'
import { NodotsBoardStore } from '../Board'
import { Roll } from '../Dice'
import { NodotsPlayer } from '../Player'
import { MoveInitializing, NodotsMove } from './move'
import {
  getOriginsForColor,
  getDestinationForOrigin,
  saveGameState,
} from './move/helpers'

export type NodotsPlay = {
  id: string
  kind:
    | 'play-initializing'
    | 'play-active'
    | 'play-completed-partial'
    | 'play-completed-success'
  player: NodotsPlayer
  roll: Roll
  isAuto: boolean
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[] // FIXME: this should either be an array of 2 or 4 moves
}

const buildPlayOptions = (
  board: NodotsBoardStore,
  player: NodotsPlayer,
  roll: Roll
): NodotsMove[] => {
  const possibleMoves: NodotsMove[] = []

  const origins = getOriginsForColor(board, player.color)

  const roll1PossibleMoves: NodotsMove[] = []
  const roll2PossibleMoves: NodotsMove[] = []

  origins.map((origin) => {
    const destination1 = getDestinationForOrigin(board, player, origin, roll[0])
    if (destination1) {
      const moveOption: MoveInitializing = {
        id: generateId(),
        kind: 'move-initializing',
        board,
        player,
        dieValue: roll[0],
        direction: player.direction,
        isAuto: player.automation.move,
        isForced: false,
        timestamp: generateTimestamp(),
      }
    }
    const destination2 = getDestinationForOrigin(board, player, origin, roll[1])
  })

  return possibleMoves
}

export const getNextMoveInPlay = (play: NodotsPlay) => {
  console.log(play.moves)
  return play.moves.find((move) => move.kind === 'move-initializing')
}

export const switchingDice = (
  state: GameRolled | GameDiceSwitched
): GameDiceSwitched | GameRolled => {
  const { players, roll, activeColor, plays } = state
  const activePlayer = players[activeColor]

  if (roll[0] === roll[1]) return state

  const newRoll: Roll = [roll[1], roll[0]]
  plays[plays.length - 1].moves[0].dieValue = newRoll[0]
  plays[plays.length - 1].moves[1].dieValue = newRoll[1]

  const results: GameDiceSwitched = {
    ...state,
    kind: 'game-dice-switched',
    roll: newRoll,
    message: {
      game: `${activePlayer.username} switches dice to ${newRoll[0]} ${newRoll[1]}`,
    },
  }
  saveGameState(results)
  return results
}
