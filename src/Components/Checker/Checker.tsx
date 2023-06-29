import { Checker as CheckerModel, generateId } from '../../Models/Backgammon'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'

export interface CheckerProps {
  checker: CheckerModel
}

const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.checker.color}`

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    alert(`move checker ${props.checker.id}`)
  }
  return <div className={classes} key={generateId()} onClick={clickHandler}><RadioButtonCheckedTwoToneIcon sx={{ fill: 'rgba(69, 109, 157, .4)' }} /></div>
}

export default Checker