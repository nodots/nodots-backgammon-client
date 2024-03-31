// Types
import { Color } from '../../game/Types'
import { Checker as CheckerType } from './state/types'
// UI
import { Button, Container, Paper, useTheme } from '@mui/material'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'

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
    <Button
      className="checker"
      id={checker.id}
      sx={{
        backgroundColor: getBackgroundColor(color),
        borderColor: theme.palette.background.default,
      }}
    >
      {/* <RadioButtonCheckedTwoToneIcon className="checker-overlay" /> */}
    </Button>
  )
}

export default Checker
