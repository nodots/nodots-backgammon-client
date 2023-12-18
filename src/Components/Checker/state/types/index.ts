import { Color } from '../../../../game'

/**
 * Checkers are the pieces that move around the board. By tradition they are
 * "black" and "white" (The Color type in this model)
 */
export type Checker = {
  id: string
  color: Color
}

// FIXME: Write proper typecheck
export const isChecker = (c: unknown): c is Checker => {
  if (typeof c !== 'object') {
    return false
  }

  return true
}

// For importing setup
export interface CheckerProp {
  color: string
  checkerCount: number
  position: any
}
