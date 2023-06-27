import { Checker, PointProp } from './Backgammon'
import { CheckerContainer } from './CheckerContainer'

export class Off {
  checkerContainers: {
    black: CheckerContainer,
    white: CheckerContainer
  }

  constructor () {
    this.checkerContainers = {
      black: new CheckerContainer('off', 'black'),
      white: new CheckerContainer('off', 'white')
    }
  }

  static initialize (setup: PointProp[]) {
    console.log('intialize')
    const off = new Off()
    const blackOffCheckerSetup: PointProp[] = setup.filter(c => c.position === 'off' && c.color === 'black')
    if (blackOffCheckerSetup) {
      blackOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          off.checkerContainers.black.checkers.push(new Checker('black'))
        }
      })
    }

    const whiteOffCheckerSetup: PointProp[] = setup.filter(c => c.position === 'off' && c.color === 'white')

    if (whiteOffCheckerSetup) {
      whiteOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          off.checkerContainers.white.checkers.push(new Checker('white'))
        }
      })
    }
    return off
  }


}

