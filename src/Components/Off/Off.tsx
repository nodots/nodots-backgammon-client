// State
import { Off as OffModel } from '../../models'
import CheckerBox from '../CheckerBox/CheckerBox'

interface OffProps {
  off: OffModel
}

const Off = (props: OffProps) => {
  return <>
    <CheckerBox checkerBox={props.off} />
  </>
}

export default Off
