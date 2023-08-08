import { useGame } from '../../useGame'
import { SetCubeValuePayload } from './state/cube.context'
import { isCubeValue, double } from './state/types'

const Cube = () => {
  const { game, setCubeValue } = useGame()
  const activeColor = game.activeColor
  if (!activeColor) {
    throw new Error('No active color')
  }
  const cube = game.cube

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('[Cube Component] game:', game)
    if (cube.value === undefined) {
      cube.value = 2
    }

    if (!isCubeValue(cube.value)) {
      throw new Error('Invalid cube value')
    }

    const newValue = double(cube.value)

    const setCubeValuePayload: SetCubeValuePayload = {
      color: activeColor,
      value: newValue
    }

    setCubeValue(setCubeValuePayload)
  }

  return <div className='cube' onClick={clickHandler}>{cube.value ? cube.value : 2}</div>
}

export default Cube