// Models
import { Rail as RailModel } from '../../models'
// Components
import CheckerBox from '../CheckerBox'

interface RailProps {
  rail: RailModel
}

const Rail = (props: RailProps) => {
  return <>
    <CheckerBox checkerBox={props.rail} />
  </>
}

export default Rail
