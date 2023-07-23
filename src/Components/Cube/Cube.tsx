import { useGame } from '../../State/Game.State'
import { Cube as CubeModel } from '../../Models'

interface CubeProps {
  cube: CubeModel
}

const Cube = (props: CubeProps) => {
  const { cube, double } = useGame()

  const clickHandler = (e: React.MouseEvent) => {
    return double()
  }

  return <div className='cube' onClick={clickHandler}>{cube.value}</div>
}

export default Cube