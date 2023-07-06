import { Off as OffModel, Cube as CubeModel } from '../../Models'
import Cube from '../Cube/Cube'
import CheckerBox from '../CheckerBox/CheckerBox'

interface OffProps {
  off: OffModel
  cube: CubeModel
}


const Off = (props: OffProps) => {
  return <>
    <CheckerBox checkerBox={props.off.checkerBoxs.black} />
    <Cube cube={props.cube} />
    <CheckerBox checkerBox={props.off.checkerBoxs.white} />
  </>
}

export default Off
