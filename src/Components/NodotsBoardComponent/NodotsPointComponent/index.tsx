import { useTheme } from '@mui/material'
import { ReactElement } from 'react'
import NodotsGameStore from '../../../GameStore'
import { Latitude } from '../../../GameStore/types/Board'
import NodotsCheckerComponent from '../NodotsCheckerComponent'
import { Checker as CheckerType } from '../../../GameStore/types/Checker'
import { ReactComponent as PointBackground } from './aztec-point.svg'

export const getCheckerComponents = (
  store: NodotsGameStore,
  checkers: CheckerType[],
  kind: 'point' | 'bar' | 'off'
) => {
  const checkerComponents: ReactElement[] = []
  checkers.forEach((c, i) => {
    if (kind === 'point') {
      if (i <= 4) {
        checkerComponents.push(
          <NodotsCheckerComponent key={c.id} checker={c} store={store} />
        )
      }
      if (i === 5) {
        checkerComponents.push(
          <NodotsCheckerComponent
            key={c.id}
            checker={c}
            store={store}
            count={checkers.length}
          />
        )
      }
    } else {
      checkerComponents.push(
        <NodotsCheckerComponent key={c.id} checker={c} store={store} />
      )
    }
  })
  return checkerComponents
}

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

function NodotsPointComponent({
  id,
  position,
  checkers,
  latitude,
  store,
}: Props) {
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
      <PointBackground />
      <div
        className={`checker-container ${latitude}`}
        key={id}
        data-position-clockwise={position.clockwise}
        data-position-counterclockwise={position.counterclockwise}
      >
        {getCheckerComponents(store, checkers, 'point')}
      </div>
    </div>
  )
}

export default NodotsPointComponent
