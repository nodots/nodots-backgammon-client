// Hooks
import { useGame } from '../../game/useGame'
// Types
import { Checker as CheckerType } from './state/types'
// UI
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'

import './checker.scss'

export interface CheckerProps {
  checker: CheckerType
  count: number | undefined
}

const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.checker.color}`

  return (
    <div className={classes} id={props.checker.id}>
      {props.count ? (
        <span className="checker-count">{props.count ? props.count : ''}</span>
      ) : (
        <RadioButtonCheckedTwoToneIcon
          className="checker-overlay"
          // FIXME: Hardcoded color
          sx={{ fill: 'rgba(69, 109, 157, .4)', width: '2vw', height: '2vw' }}
        />
      )}
    </div>
  )
}

export default Checker
