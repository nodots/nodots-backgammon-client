import { CheckerBox } from '../../models'

export type RailState = {
  id: string
  checkerBoxes: {
    black: CheckerBox
    white: CheckerBox
  }
}
