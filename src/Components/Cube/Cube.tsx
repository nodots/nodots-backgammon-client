
import { Cube as CubeModel, CubeValue } from '../../Models'

// at the start of the game
interface CubeProps {
  cube: CubeModel
}

const Cube = (props: CubeProps) => {
  if (props.cube.controllingColor) {
    console.log(`Double for ${props.cube.controllingColor}`)
  } else {
    console.log('initial Double for player that clicked')
  }
  return <div className='cube'>{props.cube.value.toString()}</div>

}


export default Cube