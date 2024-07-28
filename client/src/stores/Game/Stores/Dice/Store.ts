import { makeAutoObservable } from 'mobx'
import chalk from 'chalk'
import { NodotsColor } from '../../Types'
import {
  NodotsPlayerDiceActive,
  NodotsPlayerDiceInactive,
  NodotsPlayersDiceBlack,
  NodotsPlayersDiceInactive,
  NodotsPlayersDiceWhite,
  initializing,
  rolling,
  setPlayersDiceActive,
} from './Types'
import { INodotsPlayers } from '../Player/Types'

export interface NodotsDiceStores {
  white: NodotsDiceStore
  black: NodotsDiceStore
}

export const initializingDiceStores = () =>
  console.log('INITIALIZING DICE STORES')
export class NodotsDiceStore {
  diceState:
    | NodotsPlayersDiceBlack
    | NodotsPlayersDiceWhite
    | NodotsPlayersDiceInactive

  constructor(color: NodotsColor) {
    makeAutoObservable(this)
    this.diceState = initializing()
  }

  setPlayersDiceActive = (
    diceState:
      | NodotsPlayersDiceInactive
      | NodotsPlayersDiceBlack
      | NodotsPlayersDiceWhite,
    color: NodotsColor
  ): void => {
    this.diceState = setPlayersDiceActive(diceState, color)
  }

  // rollDice = (diceState: NodotsPlayerDiceActive) => {
  //   console.log('[Stores: Dice] rollDice diceState:', diceState)
  //   this.diceState = rolling(diceState)
  // }
}
