import { useTheme } from '@mui/material'
import Checker from '../Checker'
import {
  Confirming,
  Moving,
  Ready,
  Rolling,
  RollingForStart,
} from '../../GameStore/types'
import { Checker as CheckerType } from '../../GameStore/types/Checker'
import { ReactElement } from 'react'
import { Latitude, Longitude } from '../Board/state/types'
import NodotsGameStore from '../../GameStore'

export interface Props {
  id: string
  store: NodotsGameStore
  state: Ready | Confirming | Rolling | RollingForStart | Moving
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  longitude: Longitude
  checkers: CheckerType[]
}

function Point({ position, checkers, latitude, state, store }: Props) {
  const theme = useTheme()
  let className = 'point'

  className =
    position.clockwise % 2 === 0
      ? (className += ' even')
      : (className += ' odd')

  const getCheckerComponents = (
    store: NodotsGameStore,
    checkers: CheckerType[],
    state: Rolling | RollingForStart | Confirming | Ready | Moving
  ) => {
    const checkerComponents: ReactElement[] = []
    checkers.forEach((c) =>
      checkerComponents.push(
        <Checker key={c.id} checker={c} state={state} store={store} />
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
      <div className="checker-container">
        {getCheckerComponents(store, checkers, state)}
      </div>
    </div>
  )
}

export default Point
