// State
import { OffState } from '../../State/types/off-state'
import { CubeState } from '../../State/types/cube-state.d'
// Components
import Cube from '../Cube/Cube'
import CheckerBox from '../CheckerBox/CheckerBox'

interface OffProps {
  off: OffState
  cube: CubeState
}

const Off = (props: OffProps) => {
  return <>
    <CheckerBox checkerBox={props.off.checkerBoxes.black} />
    <Cube cube={props.cube} />
    <CheckerBox checkerBox={props.off.checkerBoxes.white} />
  </>
}

export default Off
