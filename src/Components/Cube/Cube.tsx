import { Cube as CubeModel } from '../../Models/Backgammon'
import './Cube.scss'

// at the start of the game
interface CubeProps {
  cube: CubeModel
}

const Cube = (props: CubeProps) => {
  const clickHandler = () => {
    if (props.cube.controllingColor) {
      alert(`Double for ${props.cube.controllingColor}`)
    } else {
      alert('initial Double for player that clicked')
    }
  }

  return <div className='cube' onClick={clickHandler}>2</div>
}

export default Cube