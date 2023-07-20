import { Checker as CheckerModel } from '../../Models'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'

export interface CheckerProps {
  checker: CheckerModel
}

const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.checker.color}`

  return <div className={classes} id={props.checker.id} ><RadioButtonCheckedTwoToneIcon sx={{ fill: 'rgba(69, 109, 157, .4)' }} /></div>
}

export default Checker