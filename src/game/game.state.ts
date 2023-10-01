import { v4 as generateId } from 'uuid'
import { initCubeState } from '../components/cube/state'
import { Player } from '../components/player/state'
import { initBoardState } from '../components/board/state'
import { initDiceState, roll } from '../components/die/state'
import { Game } from './game'

// FIXME: needs to be from user input
const blackPlayer: Player = {
  id: generateId(),
  color: 'black',
  active: false,
  pipCount: 167,
  moveDirection: 'clockwise',
  dice: initDiceState.black,
  isRobot: false,
  isAutoRoll: false
}
const whitePlayer: Player = {
  id: generateId(),
  color: 'white',
  active: false,
  pipCount: 167,
  moveDirection: 'counterclockwise',
  dice: initDiceState.white,
  isRobot: false,
  isAutoRoll: false
}

// FIXME: Unused
// Game starts by both players rolling one die to determine who goes first
function rollForStart (white: Player, black: Player): Player {
  const whiteRoll = roll()
  const blackRoll = roll()
  // no ties
  if (whiteRoll === blackRoll) {
    rollForStart(white, black)
  }
  return blackRoll > whiteRoll ? black : white
}
// const winner = rollForStart(whitePlayer, blackPlayer)
// const winner = whitePlayer
const winner = blackPlayer
winner.color === 'black' ? blackPlayer.active = true : whitePlayer.active = true

const defaultGameState: Game = {
  board: initBoardState,
  dice: initDiceState,
  cube: initCubeState,
  activeColor: winner.color,
  players: {
    black: blackPlayer,
    white: whitePlayer,
  }
}

export const initialGameState = defaultGameState