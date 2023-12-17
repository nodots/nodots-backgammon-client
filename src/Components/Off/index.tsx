import { Paper } from '@mui/material'
import Checkerbox from '../Checkerbox'
import { Off as OffType } from './state/types'

interface OffProps {
  off: OffType
}

const Off = (props: OffProps) => {
  return (
    <Paper>
      <Checkerbox checkerBox={props.off} />
    </Paper>
  )
}

export default Off
