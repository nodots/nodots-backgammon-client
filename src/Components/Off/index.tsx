import { Paper } from '@mui/material'
import CheckerBox from '../CheckerBox'
import { Off as OffType } from './state/types'

interface OffProps {
  off: OffType
}

const Off = (props: OffProps) => {
  return <Paper>
    <CheckerBox checkerBox={props.off} />
  </Paper>
}

export default Off
