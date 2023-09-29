// Types
import { Bar as RailType } from './state/types'
// Components
import CheckerBox from '../checkerbox'

interface RailProps {
  rail: RailType
}

const Rail = (props: RailProps) => {
  return <CheckerBox checkerBox={props.rail} />
}

export default Rail
