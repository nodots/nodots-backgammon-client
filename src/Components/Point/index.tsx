import { Box } from '@mui/material'
import { Checkerbox as CheckerboxType } from '../Checkerbox/state/types'
import { QuadrantLocation } from '../Quadrant/state/types'
import Checkerbox from '../Checkerbox'
import Checker from '../Checker'
import { Color, generateId } from '../../game/game'
import { ReactElement } from 'react'

export interface Props {
  position: {
    clockwise: number
    counterclockwise: number
  }
  checkers: Color[]
}

const Point: React.FC<Props> = ({ position, checkers }) => {
  let className = 'point'

  className =
    position.clockwise % 2 === 0
      ? (className += ' even')
      : (className += ' odd')

  const getCheckerComponents = () => {
    const checkerComponents: ReactElement[] = []
    checkers.forEach((c) =>
      checkerComponents.push(
        <Checker checker={{ id: generateId(), color: c }} key={generateId()} />
      )
    )
    return checkerComponents
  }

  return <div className={className}>{getCheckerComponents()}</div>
}

export default Point
