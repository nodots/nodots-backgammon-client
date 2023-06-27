
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

}