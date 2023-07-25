import { CheckerBox } from '../../Models'

export type RailState = {
  id: string
  checkerBoxes: {
    black: CheckerBox
    white: CheckerBox
  }
}
