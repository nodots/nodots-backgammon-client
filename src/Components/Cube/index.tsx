import { useGame } from '../../game/useGame'
import { SetCubeValuePayload } from './state'
import { CubeValue, isCubeValue } from './state/types'

const Cube = () => {
  const { game, double, setCubeValue } = useGame()
  const activeColor = game.activeColor
  if (!activeColor) {
    throw new Error('No active color')
  }
  const cube = game.cube

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!game.players[activeColor].active) {
      throw new Error('It is not your turn')
    }
    if (game.cube.owner !== undefined && game.players[activeColor].color !== game.cube.owner) {
      throw new Error('You do not control the cube')
    }

    let value = cube.value

    // TODO: Do nothing if cube is already maxxed out. Should this logic be elsewhere?
    if (value === 64) {
      return
    }
    console.log('[Cube Component] game:', game)

    if (value === undefined) {
      value = 2
    }
    if (!isCubeValue(value)) {
      throw new Error('Invalid cube value')
    }
    const newValue: CubeValue = double(value)
    const payload: SetCubeValuePayload = {
      value: newValue
    }
    setCubeValue(payload)
  }

  return <div className='cube' onClick={clickHandler}>{cube.value ? cube.value : 2}</div>
}

export default Cube