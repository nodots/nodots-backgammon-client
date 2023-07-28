import { useGame } from '../../hooks/useGame'
import { CubeState } from '../../State/types/cube-state.d'

interface CubeProps {
  cube: CubeState
}

const Cube = (props: CubeProps) => {
  const { cube, double, debug } = useGame()

  const clickHandler = (e: React.MouseEvent) => {
    if (debug.isActive) {
      console.log(`[Cube Component] calling double. ${cube.value}`)
    }
    double()
    if (debug.isActive) {
      console.log(`[Cube Component] back from double. ${cube.value}`)
    }
  }

  return <div className='cube' onClick={clickHandler}>{cube.value}</div>
}

export default Cube