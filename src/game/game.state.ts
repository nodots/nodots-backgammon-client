import { initCubeState } from '../components/Cube/state'
import { Player } from '../components/Player/state'
import { initBoardState } from '../components/Board/state'
import { initDiceState, roll } from '../components/Die/state'
import { Game, generateId } from './game'
import { QuadrantLocation } from '../components/Quadrant/state'

// FIXME: needs to be from user input
const blackPlayer: Player = {
  id: generateId(),
  color: 'black',
  active: false,
  moveDirection: 'clockwise',
  dice: initDiceState.black,
  homeQuadrant: QuadrantLocation.SE
}
const whitePlayer: Player = {
  id: generateId(),
  color: 'white',
  active: false,
  moveDirection: 'counterclockwise',
  dice: initDiceState.white,
  homeQuadrant: QuadrantLocation.NE
}
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
const winner = rollForStart(whitePlayer, blackPlayer)
winner.color === 'black' ? blackPlayer.active = true : whitePlayer.active = true

export const initialGameState: Game = {
  board: initBoardState,
  dice: initDiceState,
  cube: initCubeState,
  activeTurn: {
    id: undefined,
    board: undefined,
    player: undefined,
    status: undefined,
    roll: undefined,
    moves: []
  },
  activeColor: winner.color,
  players: {
    black: blackPlayer,
    white: whitePlayer,
  },
}
