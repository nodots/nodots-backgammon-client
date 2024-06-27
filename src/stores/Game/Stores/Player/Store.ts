import { action, makeAutoObservable } from 'mobx'
import { NodotsPlayer, NodotsPlayerState, initializing } from './Types'
import chalk from 'chalk'

export class NodotsPlayerStore {
  playerState: NodotsPlayerState

  constructor(player: NodotsPlayer) {
    // console.log(chalk.yellow('[Store: Player] constructor player:'), player)
    // makeAutoObservable(this)
    this.playerState = initializing(player)
  }
}

export type NodotsPlayerStores = {
  white: NodotsPlayerStore
  black: NodotsPlayerStore
}
