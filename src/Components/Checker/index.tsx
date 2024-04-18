import {
  Color,
  moving,
  confirming,
  Rolling,
  Confirming,
  RollingForStart,
  Moving,
  Ready,
} from '../../GameStore/types'
import { Checker as CheckerType } from '../../GameStore/types/Checker'
import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'

export interface Props {
  store: NodotsGameStore
  checker: CheckerType
  state: RollingForStart | Rolling | Ready | Confirming | Moving
  count?: number
}

function Checker({ checker, state, store }: Props) {
  const theme = useTheme()

  const handleCheckerClick = (e: React.MouseEvent) => {
    switch (state.kind) {
      case 'rolling':
      case 'moving':
        store.moving(state, checker.id)
        break
      case 'confirming':
      case 'rolling-for-start':
        break
    }
  }

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
        backgroundColor: getBackgroundColor(checker.color),
        borderColor: theme.palette.background.default,
      }}
      onClick={handleCheckerClick}
    ></Button>
  )
}

export default observer(Checker)
