import { Button, useTheme } from '@mui/material'
import { SetCubeValuePayload } from './state/types'
import { CubeValue, isCubeValue } from './state/types'
import { NodotsGameState } from '../../game/Types'
import { observer } from 'mobx-react'

interface Props {
  state: NodotsGameState
}

function Cube({ state }: Props) {
  // const activePlayer = game.getActivePlayer()
  const theme = useTheme()

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    // if (activePlayer.color !== ) {
    //   e.stopPropagation()
    //   return console.error('It is not your turn')
    // }
    // if (
    //   game.cube.owner !== undefined &&
    //   game.players[activeColor].color !== game.cube.owner
    // ) {
    //   e.stopPropagation()
    //   return console.error('You do not control the cube')
    // }

    // let value = cube.value

    // // TODO: Do nothing if cube is already maxxed out. Should this logic be elsewhere?
    // if (value === 64) {
    //   return
    // }

    // if (value === undefined) {
    //   value = 2
    // }
    // if (!isCubeValue(value)) {
    //   throw new Error('Invalid cube value')
    // }

    // need doubling logic
  }

  return (
    <Button
      className="cube"
      onClick={clickHandler}
      sx={{ color: theme.palette.info.main }}
    >
      {2}
    </Button>
  )
}

export default observer(Cube)
