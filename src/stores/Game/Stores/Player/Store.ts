import { action, makeAutoObservable } from 'mobx'
import { NodotsPlayer, NodotsPlayerState, initializing } from './Types'
import chalk from 'chalk'

// 1 Game has 2 Players
// 1 Game has Many Plays
// 1 Play has 1 Player
// 1 Play has many Moves
// 1 Play has a Roll through Player
export class NodotsPlayerStore {
  playerState: NodotsPlayerState

  constructor(player: NodotsPlayer) {
    console.log(chalk.yellow('[Store: Player] constructor player:'), player)
    makeAutoObservable(this)
    this.playerState = initializing(player)
  }
}
