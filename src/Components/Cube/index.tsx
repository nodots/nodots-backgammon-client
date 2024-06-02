import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import NodotsGameStore from '../../GameStore'
import { CubeEventHandler } from './Events/handlers'

interface Props {
  store: NodotsGameStore
}

function Cube({ store }: Props) {
  const { cube } = store.state
  const theme = useTheme()
  const eventHandler = React.useRef<CubeEventHandler>(
    new CubeEventHandler(cube, store)
  ).current

  return (
    <Button
      className="cube"
      onClick={eventHandler.click}
      onDoubleClick={eventHandler.doubleClick}
      sx={{ color: theme.palette.info.main }}
    >
      {cube.value}
    </Button>
  )
}

export default observer(Cube)
