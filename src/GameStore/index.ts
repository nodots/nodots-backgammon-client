import { action, makeAutoObservable } from 'mobx'
import {
  GameInitializing,
  GamePlayingMoving,
  GamePlayingRolling,
  GameRollingForStart,
  NodotsGame,
  NodotsPlayerPlaying,
  NodotsPlayerReady,
  NodotsPlayers,
  NodotsPlayersPlaying,
} from '../../nodots_modules/backgammon-types'
import { URL } from 'url'

const _initializeGame = (
  players: NodotsPlayers,
  apiUrl: string
): NodotsGame => {
  return {
    id: undefined,
  }
}

const _rollForStart = (state: GameInitializing, apiUrl: string): NodotsGame => {
  return state
}

const _roll = (state: GameRollingForStart, apiUrl: string): NodotsGame => {
  return state
}

const _switchDice = (state: GamePlayingRolling, apiUrl: string): NodotsGame => {
  return state
}

const _move = (
  state: GamePlayingRolling | GamePlayingMoving,
  checkerId: string,
  apiUrl: string
): NodotsGame => {
  console.log(checkerId)
  return state
}

class NodotsGameStore {
  game: NodotsGame
  apiBaseUrl: string

  constructor(players: NodotsPlayers, apiUrl: string) {
    this.apiBaseUrl = apiUrl
    this.game = _initializeGame(players, apiUrl)
  }

  @action
  rollForStart(state: GameInitializing) {
    this.game = _rollForStart(state, this.apiBaseUrl)
  }

  @action
  roll(state: GameRollingForStart) {
    this.game = _roll(state, this.apiBaseUrl)
  }

  @action
  switchDice(state: GamePlayingRolling) {
    this.game = _switchDice(state, this.apiBaseUrl)
  }

  @action
  move(state: GamePlayingRolling | GamePlayingMoving, checkerId: string) {
    this.game = _move(state, checkerId, this.apiBaseUrl)
  }

  getClockwisePlayer(
    players: NodotsPlayersPlaying
  ): NodotsPlayerPlaying | NodotsPlayerReady {
    return players.black.direction === 'clockwise'
      ? players.black
      : players.white
  }

  getCounterClockwisePlayer(
    players: NodotsPlayersPlaying
  ): NodotsPlayerPlaying | NodotsPlayerReady {
    return players.black.direction === 'counterclockwise'
      ? players.black
      : players.white
  }
}

export default NodotsGameStore
