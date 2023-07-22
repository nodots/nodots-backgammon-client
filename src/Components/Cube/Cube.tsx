import { useGame } from '../../State'
import { Cube as CubeModel, CubeValue } from '../../Models'
import { useState } from 'react'

// at the start of the game
interface CubeProps {
  cube: CubeModel
}

const Cube = (props: CubeProps) => {
  const { cube, double } = useGame()
  const [cubeValue, setCubeValue] = useState<CubeValue>(cube.value)
  const clickHandler = (e: React.MouseEvent) => {
    console.log('cube.clickHandler')
    console.log(cube)
    double()
  }


  return <div className='cube' onClick={clickHandler}>{cubeValue}</div>

}

export default Cube