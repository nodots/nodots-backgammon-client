import CheckerBox from '../CheckerBox'
import { Off as OffType } from './state/types'

interface OffProps {
  off: OffType
}

const Off = (props: OffProps) => {
  return <>
    <CheckerBox checkerBox={props.off} />
  </>
}

export default Off
