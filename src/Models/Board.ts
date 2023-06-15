import { Quadrant } from './Quadrant'
import { Rail } from './Rail'
import { NUMBER_POINTS } from './Backgammon'

export class Board {
  rail: Rail
  quadrants: Quadrant[]

  constructor(quadrants: Quadrant[], rail: Rail) {
    this.quadrants = quadrants
    this.rail = rail

  }

  // toAscii() {
  //   console.log('Board.toAscii()')
  //   console.log('+ 13 - 14 - 15 - 16 - 17 - 18 ------ 19 - 20 - 21 - 22 - 23 - 24 - +')
  //   this.getRows()
  //   console.log('+ 12 - 11 - 10 -  9 -  8 -  7 ------  6 -  5 -  4 -  3 -  2 -  1 - +')
  // }

  // private getRows() {
  // }

}
