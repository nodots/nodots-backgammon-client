import { v4 as generateId } from 'uuid'
import { Player, generateDice } from './player'
import { initCubeState } from '../components/Cube/state'
import { initBoardState } from '../components/Board/state'
import { initDiceState, roll } from '../components/Die/state'
import { Board, Color, Game, Cube, PlayerBoard } from './game'

export interface Players {
  white: Player
  black: Player
}
export class GameState {
  private whitePlayer: Player
  private blackPlayer: Player
  activePlayer: Player | undefined
  players: Players
  board: Board
  cube: Cube
  notificationMessage: string = ''

  constructor() {
    this.whitePlayer = {
      id: generateId(),
      color: 'white',
      moveDirection: 'clockwise',
      username: 'White Stripes',
      active: false,
      pipCount: 167,
      automation: {
        move: false,
        roll: false,
      },
    }

    this.whitePlayer.dice = generateDice(this.whitePlayer)

    this.blackPlayer = {
      id: generateId(),
      color: 'black',
      moveDirection: 'counterclockwise',
      username: 'Black Power',
      active: false,
      pipCount: 167,
      automation: {
        move: false,
        roll: false,
      },
    }

    this.blackPlayer.dice = generateDice(this.blackPlayer)

    this.players = {
      white: this.whitePlayer,
      black: this.blackPlayer,
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

    this.cube = {
      value: 2,
      owner: undefined,
    }

    this.board = {
      white: whiteBoard,
      black: blackBoard,
    }

    this.rollForStart()
  }

  setNotification = (message: string) => (this.notificationMessage = message)

  rollForStart = () => {
    const winningColor = Math.random() >= 0.5 ? 'black' : 'white'
    this.activePlayer = this.players[winningColor]
    this.notificationMessage = `${this.activePlayer.username} wins the opening roll`
    return winningColor
  }

  getPlayers = () => this.players

  getBoard = () => this.board

  getActivePlayer = (): Player =>
    this.players.black.active ? this.players.black : this.players.white

  getClockwisePlayer = (): Player =>
    this.players.black.moveDirection === 'clockwise'
      ? this.players.black
      : this.players.white

  getCounterClockwisePlayer = (): Player =>
    this.players.black.moveDirection === 'counterclockwise'
      ? this.players.black
      : this.players.white
}
