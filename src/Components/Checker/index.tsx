// Types
import { Color } from '../../game'
import { Checker as CheckerType } from './state/types'
// UI
import { Container, useTheme } from '@mui/material'
// import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'

export interface Props {
  checker: CheckerType
  color: Color
  count?: number
}

const Checker: React.FC<Props> = ({ checker, color, count }) => {
  const theme = useTheme()
  const getBackgroundColor = (color: Color) => {
    return color === 'white'
      ? theme.palette.secondary.light
      : theme.palette.secondary.dark
  }

  return (
    <div
      className="checker"
      id={checker.id}
      style={{
        backgroundColor: getBackgroundColor(color),
        borderColor: theme.palette.background.default,
      }}
    >
      {/* {props.count ? (
        <span className="checker-count">{props.count ? props.count : ''}</span>
      ) : (
        <RadioButtonCheckedTwoToneIcon
          className="checker-overlay"
          sx={{ fill: 'red' }}
        />
      )} */}
    </div>
  )
}

export default Checker
