import { Color } from '../../Models/Backgammon'
import './Cube.scss'

// at the start of the game
interface CubeProps {
  controllingColor: Color | undefined
  colorScheme?: string
}

const Cube = (props: CubeProps) => {
  const clickHandler = () => {
    if (props.controllingColor) {
      alert(`Double for ${props.controllingColor}`)
    } else {
      alert('initial Double for player that clicked')
    }
  }

  return <div className='cube' onClick={clickHandler}>2</div>
}

export default Cube