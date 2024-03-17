import { useTheme } from '@mui/material'
import { useGame } from '../../game/useGame'
import { SetCubeValuePayload } from './state/types'
import { CubeValue, isCubeValue } from './state/types'

const Cube: React.FC = () => {
  const { game, double, setCubeValue } = useGame()
  const activeColor = game.activeColor
  const theme = useTheme()

  if (!activeColor) {
    throw new Error('No active color')
  }
  const cube = game.cube

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!game.players[activeColor].active) {
      e.stopPropagation()
      return console.error('It is not your turn')
    }
    if (
      game.cube.owner !== undefined &&
      game.players[activeColor].color !== game.cube.owner
    ) {
      e.stopPropagation()
      return console.error('You do not control the cube')
    }

    let value = cube.value

    // TODO: Do nothing if cube is already maxxed out. Should this logic be elsewhere?
    if (value === 64) {
      return
    }

    if (value === undefined) {
      value = 2
    }
    if (!isCubeValue(value)) {
      throw new Error('Invalid cube value')
    }
    const newValue: CubeValue = double(value)
    const payload: SetCubeValuePayload = {
      value: newValue,
    }
    setCubeValue(payload)
  }

  return (
    <div
      className="cube"
      onClick={clickHandler}
      style={{
        color: theme.palette.info.main,
        borderColor: theme.palette.secondary.light,
      }}
    >
      {cube.value ? cube.value : 2}
    </div>
  )
}

export default Cube
