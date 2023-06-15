import { Point, QuadrantLocation, generateId } from './Backgammon'

export class Quadrant {
  id: string
  location: QuadrantLocation
  points: Point[]

  constructor(location: QuadrantLocation, points: Point[]) {
    this.id = generateId()
    this.location = location
    this.points = points
  }

}