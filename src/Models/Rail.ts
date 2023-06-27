import { PointProp, generateId } from './Backgammon'
import { Checker } from './Checker'
import { CheckerContainer } from './CheckerContainer'

export class Rail {
  id: string
  checkerContainers: {
    black: CheckerContainer,
    white: CheckerContainer
  }

  constructor () {
    this.id = generateId()
    this.checkerContainers = {
      black: new CheckerContainer('off', 'black'),
      white: new CheckerContainer('off', 'white')
    }
  }

  static initialize (setup: PointProp[]) {
    const rail = new Rail()
    const blackRailCheckerSetup: PointProp[] = setup.filter(c => c.position === 'rail' && c.color === 'black')
    if (blackRailCheckerSetup) {
      blackRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          rail.checkerContainers.black.checkers.push(new Checker('black'))
        }
      })
    }

    const whiteRailCheckerSetup: PointProp[] = setup.filter(c => c.position === 'rail' && c.color === 'white')

    if (whiteRailCheckerSetup) {
      whiteRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          rail.checkerContainers.white.checkers.push(new Checker('white'))
        }
      })
    }
    return rail
  }
}