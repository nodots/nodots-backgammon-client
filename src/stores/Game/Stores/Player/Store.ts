import { action, makeAutoObservable } from 'mobx'
import { INodotsPlayer, NodotsPlayerState, initializing } from './Types'
import chalk from 'chalk'

export class NodotsPlayerStore {
  playerState: NodotsPlayerState

  constructor(player: INodotsPlayer) {
    console.log(chalk.yellow('[Store: Player] constructor player:'), player)
    makeAutoObservable(this)
    this.playerState = initializing(player)
  }
}

export type NodotsPlayerStores = {
  white: NodotsPlayerStore
  black: NodotsPlayerStore
}
