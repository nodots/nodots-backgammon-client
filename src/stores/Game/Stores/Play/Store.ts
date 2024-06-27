import { makeAutoObservable } from 'mobx'
import { NodotsPlayState, initializing } from './Types'
import { PlayerRolling } from '../Player/Types'
import { Roll } from '../../types/Dice'

export class NodotsPlayStore {
  playState: NodotsPlayState

  constructor(player: PlayerRolling, roll: Roll) {
    makeAutoObservable(this)
    this.playState = initializing(player, roll)
  }
}
