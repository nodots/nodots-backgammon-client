// gameState.ts
import { makeAutoObservable } from 'mobx'
import {
  NodotsGame,
  NodotsGameInitializing,
  NodotsPlayer,
  NodotsPlayerInitializing,
} from '../../../nodots_modules/backgammon-types'

class GameState {
  game: NodotsGame | NodotsGameInitializing | null = null
  player: NodotsPlayer | NodotsPlayerInitializing | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setGame(game: any) {
    this.game = game
  }

  setPlayer(player: any) {
    this.player = player
  }
}

export const gameState = new GameState()
