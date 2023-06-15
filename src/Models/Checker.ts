import { Color, generateId } from './Backgammon'
import { Point } from './Point'

// class Move {
//   id: string
//   color: Color
//   startingPoint: Point
//   endingPoint: Point
//   constructor(color: Color, startingPoint: Point, endingPoint: Point) {
//     this.id = generateId()
//     this.color = color
//     this.startingPoint = startingPoint
//     this.endingPoint = endingPoint
//   }
// }
export class Checker {
  id: string
  color: Color
  point?: Point

  constructor(color: Color, point?: Point) {
    this.id = generateId()
    this.color = color
    this.point = point || undefined
  }
}
