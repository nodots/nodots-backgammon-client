import { Chip, SxProps, useTheme } from '@mui/material'
import useNodotsGame from '../../../Hooks/GameHook'
import { NodotsColor } from '../../../../nodots_modules/backgammon-types'

function NodotsPipCountComponent() {
  const { game } = useNodotsGame()

  const theme = useTheme()
  const getBackgroundColor = (color: NodotsColor): SxProps =>
    color === 'black'
      ? { backgroundColor: theme.palette.secondary.dark }
      : { backgroundColor: theme.palette.secondary.light }

  return <Chip className={`pip-count`} label={167} />
}

export default NodotsPipCountComponent
