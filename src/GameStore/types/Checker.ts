import { PlayerCheckers } from './Player'
import { CHECKERS_PER_PLAYER, generateId } from '.'
import { Color } from '.'

export interface Checker {
  id: string
  color: Color
  locationId: string
}
export interface NodotsGameCheckers {
  white: PlayerCheckers
  black: PlayerCheckers
}
export const buildCheckersForColor = (color: Color): PlayerCheckers => {
  const checkers: Checker[] = []
  for (let i = 0; i < CHECKERS_PER_PLAYER; i++) {
    const checker: Checker = {
      id: generateId(),
      color,
      locationId: '',
    }
    checkers.push(checker)
  }
  if (checkers.length !== CHECKERS_PER_PLAYER) {
    throw new Error(`Invalid number of checkers for player ${checkers.length}`)
  }
  return checkers as PlayerCheckers
}
