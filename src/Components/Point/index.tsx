import { useTheme } from '@mui/material'
import Checker from '../Checker'
import { Color, generateId } from '../../game/Types'
import { ReactElement } from 'react'
import { Latitude, Longitude } from '../Board/state/types'
import NodotsGameStore from '../../game'
import React from 'react'

export interface Props {
  store: NodotsGameStore
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  longitude: Longitude
  checkers: Color[]
}

function Point({ position, checkers, latitude, store }: Props) {
  const theme = useTheme()
  let className = 'point'

  className =
    position.clockwise % 2 === 0
      ? (className += ' even')
      : (className += ' odd')

  const getCheckerComponents = (store: NodotsGameStore) => {
    const checkerComponents: ReactElement[] = []
    checkers.forEach((c) =>
      checkerComponents.push(
        <Checker
          checker={{ id: generateId(), color: c }}
          key={generateId()}
          color={c}
          store={store}
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
      <div className="checker-container">{getCheckerComponents(store)}</div>
    </div>
  )
}

export default Point
