import { PlayerCheckers } from '.'
import { CHECKERS_PER_PLAYER, generateId } from '.'
import { Color } from '.'
import { NodotsBoardStore, getCheckers } from './Board'

export interface Checker {
  id: string
  color: Color
  locationId: string
  highlight?: boolean
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

export const getChecker = (board: NodotsBoardStore, id: string): Checker => {
  const checker = getCheckers(board).find((checker) => checker.id === id)
  if (!checker) {
    throw Error(`No checker found for ${id}`)
  }
  return checker
}

export const generateChecker = (color: Color): Checker => {
  return { id: generateId(), color, locationId: '' }
}

export const generateCheckersForLocationId = (
  color: Color,
  locationId: string,
  count: number
): Checker[] => {
  const checkers: Checker[] = []
  for (let i = 0; i < count; i++) {
    const checker: Checker = {
      id: generateId(),
      color,
      locationId,
    }
    checkers.push(checker)
  }
  return checkers
}
