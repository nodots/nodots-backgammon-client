import { Color, isColor } from '../../../../game'

/**
 * Checkers are the pieces that move around the board. By tradition they are 
 * "black" and "white" (The Color type in this model)
 */
export type Checker = {
  id: string
  color: Color
}

export const isChecker = (c: unknown): c is Checker => {
  if (typeof c !== 'object') {
    return false
  }
  return true
}
