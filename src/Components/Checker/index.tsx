// Types
import { Checker as CheckerType } from './state/types'
// UI
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'


export interface CheckerProps {
  checker: CheckerType
}

const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.checker.color}`

  // N
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return <div className={classes} id={props.checker.id} onClick={handleClick}><RadioButtonCheckedTwoToneIcon sx={{ fill: 'rgba(69, 109, 157, .4)' }} /></div>
}

export default Checker