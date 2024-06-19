import { makeAutoObservable } from 'mobx'
import { NodotsPlayers } from './Stores/Player/Types'
import { NodotsGame, initializing } from './Types'
import { Roll } from './types/Dice'

export class NodotsGameStore {
  state: NodotsGame

  constructor(players: NodotsPlayers) {
    makeAutoObservable(this)
    this.state = initializing(players)
  }

  public roll = (): Roll => [6, 3]
}
