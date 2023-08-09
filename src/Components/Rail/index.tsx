// Types
import { Rail as RailType } from './state/types'
// Components
import CheckerBox from '../CheckerBox'

interface RailProps {
  rail: RailType
}

const Rail = (props: RailProps) => {
  return <CheckerBox checkerBox={props.rail} />
}

export default Rail
