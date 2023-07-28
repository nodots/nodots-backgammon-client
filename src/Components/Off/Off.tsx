// State
import { OffState } from '../../state/types/off-state'
import { CubeState } from '../../state/types/cube-state'
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
