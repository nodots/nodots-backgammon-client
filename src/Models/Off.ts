import { Checker, PointProp, generateId } from '.'
import { CheckerBox } from './CheckerBox'

export class Off {
  id: string
  checkerBoxes: {
    black: CheckerBox,
    white: CheckerBox
  }

  private constructor () {
    this.id = generateId()
    this.checkerBoxes = {
      black: new CheckerBox('off', 'black'),
      white: new CheckerBox('off', 'white')
    }
  }

  static initialize (setup: PointProp[]) {
    const off = new Off()

    const blackOffCheckerSetup: PointProp[] = setup.filter(c => c.position === 'off' && c.color === 'black')
    if (blackOffCheckerSetup) {
      blackOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          off.checkerBoxes.black.checkers.push(new Checker('black'))
        }
      })
    }

    const whiteOffCheckerSetup: PointProp[] = setup.filter(c => c.position === 'off' && c.color === 'white')

    if (whiteOffCheckerSetup) {
      whiteOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          off.checkerBoxes.white.checkers.push(new Checker('white'))
        }
      })
    }
    return off
  }


}

