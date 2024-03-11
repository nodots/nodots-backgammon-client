import { useAuth0 } from '@auth0/auth0-react'
import BoardComponent from '../../components/Board'
import NavBar from '../../components/core/core'
import { PlayerBoard, Board } from '../../game'
import { Player, generateDice } from '../../game/player'
import { generateId } from '../../game/game'
import { Die } from '../../components/Die/state/types/die'
const API_SERVER = 'http://127.0.0.1:3300'
const USER_END_POINT = `${API_SERVER}/user`

const showAds = false

const whitePlayer: Player = {
  id: generateId(),
  color: 'white',
  moveDirection: 'counterclockwise',
  active: true,
  pipCount: 167,
  automation: {
    move: false,
    roll: false,
  },
}

whitePlayer.dice = generateDice(whitePlayer)

const blackPlayer: Player = {
  id: generateId(),
  color: 'black',
  moveDirection: 'clockwise',
  active: false,
  pipCount: 167,
  automation: {
    move: false,
    roll: false,
  },
}

blackPlayer.dice = generateDice(blackPlayer)

const players: Players = {
  white: whitePlayer,
  black: blackPlayer,
}

const whiteBoard: PlayerBoard = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 5,
  7: 0,
  8: 3,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 5,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: 2,
  bar: 0,
}

const blackBoard: PlayerBoard = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 5,
  7: 0,
  8: 3,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 5,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: 2,
  bar: 0,
}

const board: Board = {
  white: whiteBoard,
  black: blackBoard,
}

export interface Players {
  white: Player
  black: Player
}
// interface Props {
//   board: Board
//   players: Players
// }

export const GamePage: React.FC = () => {
  const { user } = useAuth0()

  return (
    <div id="GameContainer">
      <BoardComponent board={board} players={players} />
    </div>
  )
}
