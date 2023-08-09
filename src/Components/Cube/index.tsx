import { useGame } from '../../useGame'
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
    // TODO: Do nothing if cube is already maxxed out. Should this logic be elsewhere?
    if (cube.value === 64) {
      return
    }
    console.log('[Cube Component] game:', game)
    if (cube.value === undefined) {
      cube.value = 2
    }
    if (!isCubeValue(cube.value)) {
      throw new Error('Invalid cube value')
    }
    const newValue: CubeValue = double(cube.value)
    const payload: SetCubeValuePayload = {
      value: newValue
    }
    setCubeValue(payload)
  }

  return <div className='cube' onClick={clickHandler}>{cube.value ? cube.value : 2}</div>
}

export default Cube