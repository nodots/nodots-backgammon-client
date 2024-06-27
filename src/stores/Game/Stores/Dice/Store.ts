import { action, makeAutoObservable } from 'mobx'
import chalk from 'chalk'
import { NodotsColor } from '../../Types'
import {
  NodotsPlayerDiceActive,
  NodotsPlayerDiceInactive,
  NodotsPlayerDiceState,
  initializing,
  rolling,
  setActive,
} from './Types'

export class NodotsDiceStore {
  diceState: NodotsPlayerDiceState

  constructor(color: NodotsColor) {
    this.diceState = initializing(color)
  }

  @action
  setActive = (diceState: NodotsPlayerDiceInactive): void => {
    console.log('[Stores: Dice] setActive color:', diceState.color)
    this.diceState = setActive(diceState)
  }

  @action
  rollDice = (diceState: NodotsPlayerDiceActive) => {
    this.diceState = rolling(diceState)
  }
}
