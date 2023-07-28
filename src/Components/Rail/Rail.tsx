// Models
import { Rail as RailModel } from '../../models'
// Components
import CheckerBox from '../CheckerBox/CheckerBox'

interface RailProps {
  rail: RailModel
}

const Rail = (props: RailProps) => {
  return <>
    <CheckerBox checkerBox={props.rail.checkerBoxes.black} />
    <CheckerBox checkerBox={props.rail.checkerBoxes.white} />
  </>
}

export default Rail
