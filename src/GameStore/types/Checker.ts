import { Color, PlayerCheckers, generateId } from '.'
import { NodotsBoardStore, getCheckers } from './Board'

export interface Checker {
  id: string
  color: Color
  checkercontainerId: string
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
  color: Color,
  checkercontainerId: string
): Checker => {
  return { id: generateId(), color, checkercontainerId }
}

export const generateCheckersForCheckercontainerId = (
  color: Color,
  checkercontainerId: string,
  count: number
): Checker[] => {
  const checkers: Checker[] = []

  for (let i = 0; i < count; i++) {
    const checker: Checker = {
      id: generateId(),
      color,
      checkercontainerId,
    }
    checkers.push(checker)
  }
  return checkers
}
