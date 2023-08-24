import { DieValue } from '../../components/Die/state'
import { Quadrant } from '../../components/Quadrant/state'
import { MoveMode, POINT_COUNT } from '../../components/Board/state'
import { CheckerBox, isCheckerBox } from '../../components/CheckerBox/state'
import { QuadrantLocation } from '../../components/Quadrant/state'

export function bearOffReducer (bearOffQuadrant: Quadrant, dieValue: DieValue): { mode: MoveMode, destination: CheckerBox | undefined } {
  let moveMode: MoveMode | undefined = undefined
  let destination: CheckerBox | undefined = undefined
  moveMode = MoveMode.ERROR
  // bearOffQuadrant.points.forEach(p => {
  //   let bearOffPosition = p.position
  //   if (bearOffQuadrant.location === QuadrantLocation.NE) {
  //     bearOffPosition = POINT_COUNT - (dieValue as number) + 1 as number
  //   }
  //   const bearOffPoint = bearOffQuadrant.points.find(p => p.position === bearOffPosition)
  //   if (isCheckerBox(bearOffPoint) && bearOffPoint.checkers.length > 0) {
  //     moveMode = MoveMode.BEAR_OFF
  //   } else {
  //     moveMode = MoveMode.ERROR
  //     // 
  //     //TODO check p2p and hit
  //   }
  // })
  // if (!moveMode) {
  //   throw Error('No moveMode from bearOfReducer')
  // }
  return { mode: moveMode, destination: destination }
}
