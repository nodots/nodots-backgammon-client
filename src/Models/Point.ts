import { Quadrant } from './Quadrant'
import { Checker } from './Checker'
import { generateId } from './Backgammon'

export class Point {
  id: string
  quadrant: Quadrant
  currentCheckers?: Checker[];

  constructor(position: number, quadrant: Quadrant, currentCheckers?: Checker[]) {
    this.id = generateId()
    this.quadrant = quadrant
    this.currentCheckers = currentCheckers ? currentCheckers : [];
  }

  addChecker(checker: Checker) {
    this.currentCheckers?.push(checker);
  }

}
