import { Color } from '../../../../models'

/**
 * Checkers are the pieces that move around the board. By tradition they are 
 * "black" and "white" (The Color type in this model)
 */
export type Checker = {
  id: string
  color: Color
}

