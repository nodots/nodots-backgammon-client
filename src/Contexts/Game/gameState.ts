// gameState.ts
import { makeAutoObservable } from 'mobx'
import {
  NodotsGame,
  NodotsGameInitializing,
  NodotsPlayer,
  NodotsPlayerInitializing,
} from '../../../nodots_modules/backgammon-types'
import { getPlayerById } from './playerHelpers'
import { getGameById } from './gameHelpers'

class GameState {
  game: NodotsGame | null = null
  player: NodotsPlayer | null = null
  playerId = sessionStorage.getItem('playerId')
  gameId = sessionStorage.getItem('gameId')

  constructor() {
    makeAutoObservable(this)
    this.playerId && getPlayerById(this.playerId).then((p) => this.setPlayer(p))
    this.gameId ? getGameById(this.gameId).then((g) => this.setGame(g)) : null
  }

  setGame(game: NodotsGame) {
    this.game = game
  }

  setPlayer(player: NodotsPlayer) {
    this.player = player
  }
}

export const gameState = new GameState()
