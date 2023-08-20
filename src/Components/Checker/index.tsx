// Types
import { Checker as CheckerType } from './state/types'
// UI
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'

export interface CheckerProps {
  checker: CheckerType
  count: number | undefined
}

const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.checker.color}`

  return <div className={classes} id={props.checker.id}>
    {
      props.count
        ? <span className='checker-count'>{props.count ? props.count : ''}</span>
        : <RadioButtonCheckedTwoToneIcon className='checker-overlay' sx={{ fill: 'rgba(69, 109, 157, .4)' }} />

    }


  </div>
}

export default Checker