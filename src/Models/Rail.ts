import { PointProp, generateId } from '.'
import { Checker } from './Checker'
import { CheckerBox } from './CheckerBox'

export class Rail {
  id: string
  checkerBoxes: {
    black: CheckerBox,
    white: CheckerBox
  }

  constructor () {
    this.id = generateId()
    this.checkerBoxes = {
      black: new CheckerBox('off', 'black'),
      white: new CheckerBox('off', 'white')
    }
  }

  static initialize (setup: PointProp[]) {
    const rail = new Rail()
    const blackRailCheckerSetup: PointProp[] = setup.filter(c => c.position === 'rail' && c.color === 'black')
    if (blackRailCheckerSetup) {
      blackRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          rail.checkerBoxes.black.checkers.push(new Checker('black'))
        }
      })
    }

    const whiteRailCheckerSetup: PointProp[] = setup.filter(c => c.position === 'rail' && c.color === 'white')

    if (whiteRailCheckerSetup) {
      whiteRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          rail.checkerBoxes.white.checkers.push(new Checker('white'))
        }
      })
    }
    return rail
  }
}