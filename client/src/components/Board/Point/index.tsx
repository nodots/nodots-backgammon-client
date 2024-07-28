import { useTheme } from '@mui/material'
import { ReactElement } from 'react'
import Checker from '../Checker'
import { NodotsChecker } from '../../../stores/Game/types/Checker'
import { Latitude } from '../../../stores/Game/types/Board'
import { NodotsGameStore } from '../../../stores/Game/Store'

export const getCheckerComponents = (
  gameStore: NodotsGameStore,
  checkers: NodotsChecker[],
  kind: 'point' | 'bar' | 'off'
) => {
  const checkerComponents: ReactElement[] = []
  checkers.forEach((c, i) => {
    if (kind === 'point') {
      if (i <= 4) {
        checkerComponents.push(
          <Checker key={c.id} checker={c} gameStore={gameStore} />
        )
      }
      if (i === 5) {
        checkerComponents.push(
          <Checker
            key={c.id}
            checker={c}
            gameStore={gameStore}
            count={checkers.length}
          />
        )
      }
    } else {
      checkerComponents.push(
        <Checker key={c.id} checker={c} gameStore={gameStore} />
      )
    }
  })
  return checkerComponents
}

export interface Props {
  id: string
  gameStore: NodotsGameStore
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  checkers: NodotsChecker[]
}

function Point({ id, position, checkers, latitude, gameStore }: Props) {
  const theme = useTheme()
  let className = 'point'

  className =
    position.clockwise % 2 === 0
      ? (className += ' even')
      : (className += ' odd')

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
      <div
        className={`checker-container ${latitude}`}
        key={id}
        data-position-clockwise={position.clockwise}
        data-position-counterclockwise={position.counterclockwise}
      >
        <ul className="hidden debug-list">
          <li>{position.clockwise}</li>
          <li>{position.counterclockwise}</li>
        </ul>
        {getCheckerComponents(gameStore, checkers, 'point')}
      </div>
    </div>
  )
}

export default Point
