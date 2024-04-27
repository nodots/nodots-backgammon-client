import { useTheme } from '@mui/material'
import Checker from '../Checker'
import {
  Confirming,
  Moving,
  Rolled,
  Rolling,
  RollingForStart,
} from '../../GameStore/types'
import { Checker as CheckerType } from '../../GameStore/types/Checker'
import { ReactElement } from 'react'
import NodotsGameStore from '../../GameStore'
import { Latitude, Longitude } from '../../GameStore/types/Board'

export interface Props {
  id: string
  store: NodotsGameStore
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  checkers: CheckerType[]
}

function Point({ id, position, checkers, latitude, store }: Props) {
  const theme = useTheme()
  let className = 'point'

  className =
    position.clockwise % 2 === 0
      ? (className += ' even')
      : (className += ' odd')

  const getCheckerComponents = (
    store: NodotsGameStore,
    checkers: CheckerType[]
  ) => {
    const checkerComponents: ReactElement[] = []
    checkers.forEach((c) =>
      checkerComponents.push(<Checker key={c.id} checker={c} store={store} />)
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
      <div
        className="checker-container"
        key={id}
        data-position-clockwise={position.clockwise}
        data-position-counterclockwise={position.counterclockwise}
      >
        <ul className="hidden debug-list">
          <li>{position.clockwise}</li>
          <li>{position.counterclockwise}</li>
        </ul>
        {getCheckerComponents(store, checkers)}
      </div>
    </div>
  )
}

export default Point
