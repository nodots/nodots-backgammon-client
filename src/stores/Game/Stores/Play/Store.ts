import { makeAutoObservable } from 'mobx'
import { NodotsPlay, initializing } from './Types'
import { NodotsPlayer, PlayerPlaying, PlayerRolling } from '../Player/Types'

export class NodotsPlayStore {
  state: NodotsPlay
  constructor(player: PlayerRolling) {
    makeAutoObservable(this)
    this.state = initializing(player)
  }
}
