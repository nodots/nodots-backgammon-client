import { Quadrant } from './Quadrant'
import { Rail } from './Rail'

export class Board {
  rail: Rail
  quadrants: Quadrant[]

  constructor(quadrants: Quadrant[], rail: Rail) {
    this.quadrants = quadrants
    this.rail = rail

  }

}
