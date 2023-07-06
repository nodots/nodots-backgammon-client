import { Rail as RailModel } from '../../Models'
import CheckerBox from '../CheckerBox/CheckerBox'

interface RailProps {
  rail: RailModel
}

const Rail = (props: RailProps) => {
  return <>
    <CheckerBox checkerBox={props.rail.checkerBoxs.black} />
    <CheckerBox checkerBox={props.rail.checkerBoxs.white} />
  </>
}

export default Rail
