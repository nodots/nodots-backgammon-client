import { Color, generateId } from './Backgammon';
import { Point } from './Point';

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
  id: string;
  color: Color;
  position: Point;

  constructor(color: Color, position: Point) {
    this.id = generateId();
    this.color = color;
    this.position = position;
  }
}
