import { makeAutoObservable } from 'mobx'
import { initializingPlayer, INodotsPlayer, NodotsPlayerState } from './Types'
import chalk from 'chalk'

export class NodotsPlayerStore {
  playerState: NodotsPlayerState

  constructor(player: INodotsPlayer) {
    console.log(chalk.green('9. [Store: Player] constructor player:'), player)
    makeAutoObservable(this)
    this.playerState = initializingPlayer(player)
  }
}

export type NodotsPlayerStores = {
  white: NodotsPlayerStore
  black: NodotsPlayerStore
}
