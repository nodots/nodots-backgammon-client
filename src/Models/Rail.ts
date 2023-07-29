import { CheckerBoxType, PointProp, generateId } from '.'
import { Checker } from './Checker'
import { CheckerBox } from './CheckerBox'

/**
 * Where Checkers go after being "hit" by opposing Player. Checker
 * can reenter the Board in the opposing Player's Home Board (Quadrant
 * closest to opposing Player's Off checkers.)
 */
export class Rail {
  id: string
  checkerBoxes: {
    black: CheckerBox,
    white: CheckerBox
  }

  constructor () {
    this.id = generateId()
    this.checkerBoxes = {
      black: new CheckerBox({ type: CheckerBoxType.RAIL, color: 'black', parent: this }),
      white: new CheckerBox({ type: CheckerBoxType.RAIL, color: 'white', parent: this })
    }
  }

  static initialize (setup: PointProp[]) {
    const rail = new Rail()
    const blackRailCheckerSetup: PointProp[] = setup.filter(c => c.position === 'rail' && c.color === 'black')

    if (blackRailCheckerSetup) {
      blackRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          rail.checkerBoxes.black.checkers.push(new Checker('black', rail.checkerBoxes.black))
        }
      })
    }

    const whiteRailCheckerSetup: PointProp[] = setup.filter(c => c.position === 'rail' && c.color === 'white')

    if (whiteRailCheckerSetup) {
      whiteRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          rail.checkerBoxes.white.checkers.push(new Checker('white', rail.checkerBoxes.white))
        }
      })
    }
    return rail
  }
}