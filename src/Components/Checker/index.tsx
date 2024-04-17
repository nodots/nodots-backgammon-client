import {
  Color,
  Checker as CheckerType,
  moving,
  confirming,
  Rolling,
  Confirming,
  RollingForStart,
  Moving,
  Ready,
} from '../../game/Types'
import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'
import React from 'react'

export interface Props {
  checker: CheckerType
  state: RollingForStart | Rolling | Ready | Confirming | Moving
  count?: number
}

function Checker({ checker, state }: Props) {
  const theme = useTheme()

  const handleCheckerClick = (e: React.MouseEvent) => {
    switch (state.kind) {
      case 'rolling':
      case 'moving':
        moving(state, checker.id)
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
