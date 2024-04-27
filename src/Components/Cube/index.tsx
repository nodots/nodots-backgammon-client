import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'
import { NodotsGameState } from '../../GameStore/types'
import { CubeValue } from '../../GameStore/types/Cube'

interface Props {
  store: NodotsGameStore
}

export const double = (value: CubeValue) =>
  value !== 64 ? ((value * 2) as CubeValue) : value

function Cube({ store }: Props) {
  const { cube } = store.state
  const theme = useTheme()

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    double(cube.value)
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
