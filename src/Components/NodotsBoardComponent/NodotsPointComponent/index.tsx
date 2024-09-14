import { useTheme } from '@mui/material'
import { ReactElement } from 'react'
import NodotsCheckerComponent from '../NodotsCheckerComponent'
import {
  NodotsGame,
  NodotsChecker,
  Latitude,
} from '../../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'

export const getCheckerComponents = (
  game: NodotsGame,
  checkers: NodotsChecker[],
  kind: 'point' | 'bar' | 'off'
) => {
  const checkerComponents: ReactElement[] = []
  checkers.forEach((c, i) => {
    if (kind === 'point') {
      if (i <= 4) {
        checkerComponents.push(
          <NodotsCheckerComponent key={c.id} checker={c} game={game} />
        )
      }
      if (i === 5) {
        checkerComponents.push(
          <NodotsCheckerComponent
            key={c.id}
            checker={c}
            game={game}
            count={checkers.length}
          />
        )
      }
    } else {
      checkerComponents.push(
        <NodotsCheckerComponent key={c.id} checker={c} game={game} />
      )
    }
  })
  return checkerComponents
}

export interface Props {
  id: string
  game: NodotsGame
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  checkers: NodotsChecker[]
}

function NodotsPointComponent({
  id,
  game,
  position,
  checkers,
  latitude,
}: Props) {
  const { gameDispatch } = useNodotsGame()
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
        {getCheckerComponents(game, checkers, 'point')}
      </div>
    </div>
  )
}

export default NodotsPointComponent
