import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'
import React from 'react'

interface Props {
  store: NodotsGameStore
}

function Cube({ store }: Props) {
  const { state } = store
  const { cube } = state.game
  const theme = useTheme()

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    store.double(state)
  }

  return (
    <Button
      className="cube"
      onClick={clickHandler}
      sx={{ color: theme.palette.info.main }}
    >
      {cube.value}
    </Button>
  )
}

export default observer(Cube)
