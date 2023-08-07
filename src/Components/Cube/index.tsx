import { useCube } from './state/useCube'
import { SetCubeValuePayload } from './state/cube.context'
import { isCubeValue, double } from './state/types'

const Cube = () => {
  // const { activeColor } = useGame()
  const activeColor = 'white'
  const { cube, setCubeValue } = useCube()

  const clickHandler = (e: React.MouseEvent) => {
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