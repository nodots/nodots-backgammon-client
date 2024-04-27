import { PlayerCheckers } from '.'
import { CHECKERS_PER_PLAYER, generateId } from '.'
import { Color } from '.'
import NodotsGameStore from '..'
import { NodotsBoardStore, getCheckercontainerById, getCheckers } from './Board'

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

export const getChecker = (board: NodotsBoardStore, id: string): Checker => {
  const checker = getCheckers(board).find((checker) => checker.id === id)
  if (!checker) {
    throw Error(`No checker found for ${id}`)
  }
  return checker
}

export const generateChecker = (
  store: NodotsGameStore,
  color: Color,
  locationId: string
): Checker => {
  return { id: generateId(), color, locationId }
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
