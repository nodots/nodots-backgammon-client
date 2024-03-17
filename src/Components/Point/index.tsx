import { Box, Container, PaletteColor, useTheme } from '@mui/material'
import { Checkerbox as CheckerboxType } from '../Checkerbox/state/types'
import { QuadrantLocation } from '../Quadrant/state/types'
import Checkerbox from '../Checkerbox'
import Checker from '../Checker'
import { Color, generateId } from '../../game/game'
import { ReactElement } from 'react'
import { Latitude, Longitude } from '../Board/state/types'

export interface Props {
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  longitude: Longitude
  checkers: Color[]
}

const Point: React.FC<Props> = ({
  position,
  checkers,
  latitude,
  longitude,
}) => {
  const theme = useTheme()
  console.log(theme)
  let className = 'point'

  className =
    position.clockwise % 2 === 0
      ? (className += ' even')
      : (className += ' odd')

  const getCheckerComponents = () => {
    const checkerComponents: ReactElement[] = []
    checkers.forEach((c) =>
      checkerComponents.push(
        <Checker
          checker={{ id: generateId(), color: c }}
          key={generateId()}
          color={c}
        />
      )
    )
    return checkerComponents
  }

  const getBackgroundColor = (position: number) => {
    return position % 2 === 0
      ? theme.palette.primary.main
      : theme.palette.primary.light
  }

  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className={`point-background ${latitude}`}
        viewBox="0 0 100 500"
      >
        <polygon
          points="0,0 50,500 100,0"
          fill={getBackgroundColor(position.clockwise)}
        ></polygon>
      </svg>
      <div className="checker-container">{getCheckerComponents()}</div>
    </div>
  )
}

export default Point
