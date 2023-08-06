import { CheckerBoxType, PointProp, generateId } from '.'
import { Checker } from './Checker'
import { CheckerBox } from './CheckerBox'

/**
 * Destination for Checkers. When all of a Player's Checkers are in an Off 
 * CheckerBox the Player wins.
 */
export class Off {
  id: string
  checkerBoxes: {
    black: CheckerBox,
    white: CheckerBox
  }

  private constructor () {
    this.id = generateId()
    this.checkerBoxes = {
      black: new CheckerBox({ type: CheckerBoxType.OFF, color: 'black', parent: this }),
      white: new CheckerBox({ type: CheckerBoxType.OFF, color: 'white', parent: this })
    }
  }

  static initialize (setup: PointProp[]) {
    const off = new Off()

    const blackOffCheckerSetup: PointProp[] = setup.filter(c => c.position === 'off' && c.color === 'black')
    if (blackOffCheckerSetup) {
      blackOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          off.checkerBoxes.black.checkers.push(new Checker('black', off.checkerBoxes.black))
        }
      })
    }

    const whiteOffCheckerSetup: PointProp[] = setup.filter(c => c.position === 'off' && c.color === 'white')

    if (whiteOffCheckerSetup) {
      whiteOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          off.checkerBoxes.white.checkers.push(new Checker('white', off.checkerBoxes.white))
        }
      })
    }
    return off
  }
}

