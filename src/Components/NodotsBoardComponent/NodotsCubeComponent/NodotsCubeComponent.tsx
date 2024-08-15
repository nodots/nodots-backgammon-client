import { Button, useTheme } from '@mui/material'
import useNodotsGame from '../../../Hooks/GameHook'
import { NodotsGameStateReady } from '../../../../nodots_modules/backgammon-types'

interface Props {
  clickHandler: (e: React.MouseEvent) => void
}

function NodotsCubeComponent({ clickHandler }: Props) {
  const { game } = useNodotsGame()
  const theme = useTheme()
  const _game = game as NodotsGameStateReady
  return (
    <Button
      className="cube"
      onClick={clickHandler}
      sx={{ color: theme.palette.info.main }}
    >
      {_game.cube.value}
    </Button>
  )
}

export default NodotsCubeComponent
