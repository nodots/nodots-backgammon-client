import { Off as OffModel, Cube as CubeModel } from '../../Models/Backgammon'
import Cube from '../Cube/Cube'
import CheckerContainer from '../CheckerContainer/CheckerContainer'

interface OffProps {
  off: OffModel
  cube: CubeModel
}


const Off = (props: OffProps) => {
  return <>
    <CheckerContainer checkerContainer={props.off.checkerContainers.black} />
    <Cube cube={props.cube} />
    <CheckerContainer checkerContainer={props.off.checkerContainers.white} />
  </>
}

export default Off
