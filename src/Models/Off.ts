import { CheckerProp } from '.'
import { Checker } from './Checker'
import { CheckerBox, ICheckerBox } from './CheckerBox'

/**
 * Destination for Checkers. When all of a Player's Checkers are in an Off 
 * CheckerBox the Player wins.
 */
export class Off extends CheckerBox {

  private constructor (attrs: ICheckerBox) {
    super(attrs)
  }

  static initialize (setup: CheckerProp[]) {
    const blackCheckerBoxAttrs: ICheckerBox = { color: 'black', position: 'off' }
    const black = new Off(blackCheckerBoxAttrs)
    const whiteCheckerBoxAttrs: ICheckerBox = { color: 'white', position: 'off' }
    const white = new Off(whiteCheckerBoxAttrs)

    const blackOffCheckerSetup: CheckerProp[] = setup.filter(c => c.position === 'off' && c.color === 'black')
    if (blackOffCheckerSetup) {
      blackOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          black.checkers.push(new Checker('black', black))
        }
      })
    }

    const whiteOffCheckerSetup: CheckerProp[] = setup.filter(c => c.position === 'off' && c.color === 'white')

    if (whiteOffCheckerSetup) {
      whiteOffCheckerSetup.forEach(c => {
        for (let i = 0; i < c.checkerCount; i++) {
          white.checkers.push(new Checker('white', white))
        }
      })
    }
    return { black, white }
  }
}

