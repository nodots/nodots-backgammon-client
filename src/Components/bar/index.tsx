// Types
import { Bar as RailType } from './state/types'
// Components
import CheckerBox from '../checkerbox'

interface RailProps {
  bar: RailType
}

const Rail = (props: RailProps) => {
  return <CheckerBox checkerBox={props.bar} />
}

export default Rail
