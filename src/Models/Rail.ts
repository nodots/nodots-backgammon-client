import { CheckerProp, generateId } from '.'
import { Checker } from './Checker'
import { CheckerBox, ICheckerBox } from './CheckerBox'

export class Rail extends CheckerBox {

  private constructor (attrs: ICheckerBox) {
    super(attrs)
  }

  static initialize (setup: CheckerProp[]) {
    const blackCheckerBoxAttrs: ICheckerBox = { color: 'black', position: 'rail' }
    const black = new Rail(blackCheckerBoxAttrs)
    const whiteCheckerBoxAttrs: ICheckerBox = { color: 'white', position: 'rail' }
    const white = new Rail(whiteCheckerBoxAttrs)

    const blackRailCheckerSetup: CheckerProp[] = setup.filter(c => c.position === 'rail' && c.color === 'black')
    if (blackRailCheckerSetup) {
      blackRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          black.checkers.push(new Checker('black', black))
        }
      })
    }

    const whiteRailCheckerSetup: CheckerProp[] = setup.filter(c => c.position === 'rail' && c.color === 'white')

    if (whiteRailCheckerSetup) {
      whiteRailCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          white.checkers.push(new Checker('white', white))
        }
      })
    }
    return { black, white }
  }
}

