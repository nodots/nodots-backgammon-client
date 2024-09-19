import { useTheme } from '@mui/material'
import {
  DieOrder,
  NodotsColor,
  NodotsGame,
  NodotsRoll,
} from '../../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'

const paths = [
  'M92.57,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.57A7.43,7.43,0,0,0,100,92.58V7.42A7.43,7.43,0,0,0,92.57,0ZM50,59.87A9.87,9.87,0,1,1,59.86,50,9.87,9.87,0,0,1,50,59.87Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.85,9.85,0,0,1,24.75,85.1Zm50.5-50.49a9.86,9.86,0,1,1,9.85-9.86A9.86,9.86,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.85,9.85,0,0,1,24.75,85.1ZM50,59.86A9.86,9.86,0,1,1,59.86,50,9.86,9.86,0,0,1,50,59.86ZM75.25,34.61a9.86,9.86,0,1,1,9.85-9.86A9.87,9.87,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.86,9.86,0,0,1,24.75,85.1Zm0-50.49a9.86,9.86,0,1,1,9.86-9.86A9.86,9.86,0,0,1,24.75,34.61ZM75.25,85.1a9.86,9.86,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.25,85.1Zm0-50.49a9.86,9.86,0,1,1,9.85-9.86A9.85,9.85,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.77,85.08a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,24.77,85.08Zm0-50.46a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,24.77,34.62ZM50,59.85A9.85,9.85,0,1,1,59.85,50,9.85,9.85,0,0,1,50,59.85ZM75.23,85.08a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.23,85.08Zm0-50.46a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.23,34.62Z',
  'M92.57,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.57A7.43,7.43,0,0,0,100,92.58V7.42A7.43,7.43,0,0,0,92.57,0ZM24.75,85.11a9.86,9.86,0,1,1,9.86-9.86A9.85,9.85,0,0,1,24.75,85.11Zm0-25.25A9.86,9.86,0,1,1,34.61,50,9.85,9.85,0,0,1,24.75,59.86Zm0-25.25a9.86,9.86,0,1,1,9.86-9.86A9.86,9.86,0,0,1,24.75,34.61Zm50.5,50.5a9.86,9.86,0,1,1,9.85-9.86A9.85,9.85,0,0,1,75.25,85.11Zm0-25.25A9.86,9.86,0,1,1,85.1,50,9.85,9.85,0,0,1,75.25,59.86Zm0-25.25a9.86,9.86,0,1,1,9.85-9.86A9.86,9.86,0,0,1,75.25,34.61Z',
]

interface Props {
  game: NodotsGame
  order: DieOrder
  color: NodotsColor
  rollHandler?: (e: React.MouseEvent) => void
}

const getPath = (order: DieOrder, roll: NodotsRoll | undefined) =>
  roll ? paths[roll[order] - 1] : paths[0]

function NodotsDieComponent({ game, order, color, rollHandler }: Props) {
  const { gameDispatch } = useNodotsGame()
  const theme = useTheme()
  const fill = (color: NodotsColor) => {
    return color === 'white'
      ? theme.palette.secondary.light
      : theme.palette.secondary.dark
  }
  // const path = game?.dice[color].kind === 'dice-rolled' ? paths[game.dice[color].value - 1] : paths[0]

  return (
    <div className="die" onClick={rollHandler}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              d={getPath(
                order,
                game.NodotsGameRollingForStart === 'moving'
                  ? game.activeRoll
                  : undefined
              )}
              fill={fill(color)}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default NodotsDieComponent
