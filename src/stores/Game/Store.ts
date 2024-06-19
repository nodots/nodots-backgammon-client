import { makeAutoObservable } from 'mobx'
import { NodotsPlayers } from './Stores/Player/Types'
import { GamePlaying, NodotsColor, NodotsGame, initializing } from './Types'
import { Roll, rollDice } from './types/Dice'

export class NodotsGameStore {
  state: NodotsGame

  constructor(players: NodotsPlayers) {
    makeAutoObservable(this)
    this.state = initializing(players)
  }

  public roll = (color: NodotsColor): GamePlaying => {
    switch (this.state.kind) {
      case 'game-playing':
        const gameState = this.state as GamePlaying // FIXME
        console.log('[Game Store] gameState:', gameState)
        const { id, activeColor, players, board, cube, playStore } = gameState
        const activePlayer = players[activeColor]
        console.log('[Game Store] activePlayer.dice', activePlayer.dice)
        const roll: Roll = rollDice()
        activePlayer.dice[0].value = roll[0]
        activePlayer.dice[1].value = roll[1]

        return {
          kind: 'game-playing',
          players,
          playStore,
          board,
          cube,
          activeColor,
          id,
        }
      case 'game-completed':
      case 'game-initializing':
      case 'game-ready':
      case 'game-rolling-for-start':
        console.warn(`[Game Store] unexpected state ${this.state.kind}`)
        throw Error(`[Game Store] unexpected state ${this.state.kind}`)
    }
  }
}
