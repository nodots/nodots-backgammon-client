import { Rail as RailModel } from '../../Models/Backgammon'
import CheckerContainer from '../CheckerContainer/CheckerContainer'

interface RailProps {
  rail: RailModel
}

const Rail = (props: RailProps) => {
  return <>
    <CheckerContainer checkerContainer={props.rail.checkerContainers.black} />
    <CheckerContainer checkerContainer={props.rail.checkerContainers.white} />
  </>
}

export default Rail
