import { NodotsColor, MoveDirection, generateId } from '../../Types'
import { NodotsDice, Roll, generateDice, rollDice } from '../../types/Dice'

export type NodotsPlayer = {
  username: string
  color: NodotsColor
  direction: MoveDirection
  automation: {
    move: boolean
    roll: boolean
  }
}

export interface NodotsPlayers {
  black: NodotsPlayer
  white: NodotsPlayer
}

export interface NodotsPipCounts {
  black: number
  white: number
}

export interface PlayerInitializing extends NodotsPlayer {
  kind: 'player-initializing'
}

export interface PlayerReady extends NodotsPlayer {
  kind: 'player-ready'
  id: string
  pipCount: number
  dice: NodotsDice
}

export interface PlayerRolling extends NodotsPlayer {
  kind: 'player-rolling'
  id: string
  pipCount: number
  dice: NodotsDice
  roll: () => Roll
}

export interface PlayerMoving extends NodotsPlayer {
  kind: 'player-moving'
  id: string
  pipCount: number
  dice: NodotsDice
}

export interface PlayerWinning extends NodotsPlayer {
  kind: 'player-winning'
  id: string
  pipCount: number
}

export interface PlayerResiginging extends NodotsPlayer {
  kind: 'player-resigning'
  id: string
  pipCount: number
}

export type NodotsPlayerState =
  | PlayerInitializing
  | PlayerReady
  | PlayerRolling
  | PlayerMoving
  | PlayerResiginging
  | PlayerWinning

export const initializing = (player: NodotsPlayer): PlayerReady => {
  const dice = generateDice(player)
  return {
    kind: 'player-ready',
    id: generateId(),
    username: player.username,
    color: player.color,
    direction: player.direction,
    automation: player.automation,
    pipCount: 167,
    dice,
  }
}

export const rolling = (playerState: PlayerRolling): PlayerMoving => {
  console.log('[Type: Player] rolling playerState:', playerState.dice)
  const roll = rollDice() // this is crap. Should be called from player
  // playerState.dice[0].value = roll[0]
  // playerState.dice[1].value = roll[1]
  // console.log('[Type: Player] rolling dice:', dice)
  // console.log('[Type: Player] rolling roll:', roll)
  // dice[0].value = roll[0]
  // dice[1].value = roll[1]
  return {
    ...playerState,
    kind: 'player-moving',
    dice: playerState.dice,
  }
}
