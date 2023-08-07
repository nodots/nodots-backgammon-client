import { CheckerBoxPosition, Color } from '../../../../models'

export type Point = {
  color: Color,
  position: CheckerBoxPosition

  // static initialize (setup: CheckerProp[]): Point[] {
  //   const points: Point[] = []
  //   for (let i = 0; i < POINT_COUNT; i++) {
  //     const position = i + 1
  //     const pointAttrs: ICheckerBox = {
  //       position,
  //     }
  //     const point = new Point(pointAttrs)
  //     const config = setup.find(p => p.position === position)
  //     if (config) {
  //       for (let i = 0; i < config.checkerCount; i++) {
  //         point.checkers.push(new Checker(config.color, point))
  //       }
  //     }

  //     points.push(point)
  //   }
  //   return points
  // }
}
