// Types
import { Bar as RailType } from './state/types'
// Components
import Checkerbox from '../Checkerbox'

interface RailProps {
  bar: RailType
}

const Rail = (props: RailProps) => {
  return <Checkerbox checkerBox={props.bar} />
}

export default Rail
