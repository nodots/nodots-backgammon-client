import { useGame } from '../../hooks/useGame'
import { useCube } from './state/useCube'
import { SetCubeValuePayload } from './state/cube.context'
import { useState } from 'react'
import { CubeValue, isCubeValue, double } from './state/types'

const Cube = () => {
  const { activeColor } = useGame()
  const { cube, setCubeValue } = useCube()

  const clickHandler = (e: React.MouseEvent) => {
    console.log('click!')

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

    console.log(setCubeValuePayload)

    setCubeValue(setCubeValuePayload)

  }

  return <div className='cube' onClick={clickHandler}>{cube.value ? cube.value : 2}</div>
}

export default Cube