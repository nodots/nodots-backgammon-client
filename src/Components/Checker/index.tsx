import {
  Color,
  moving,
  confirming,
  Rolling,
  Confirming,
  RollingForStart,
  Moving,
  Rolled,
} from '../../GameStore/types'
import { Checker as CheckerType } from '../../GameStore/types/Checker'
import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'

export interface Props {
  store: NodotsGameStore
  checker: CheckerType
  state: RollingForStart | Rolling | Rolled | Confirming | Moving
  count?: number
}

function Checker({ checker, state, store }: Props) {
  const theme = useTheme()

  const handleCheckerClick = (e: React.MouseEvent) => {
    switch (state.kind) {
      case 'rolled':
      case 'moving':
        store.moving(state, checker.id)
        break
      case 'rolling':
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
      className={`checker ${checker.highlight ? ' highlight' : ''}`}
      id={checker.id}
      sx={{
        backgroundColor: getBackgroundColor(checker.color),
        borderColor: theme.palette.background.default,
      }}
      onClick={handleCheckerClick}
    >
      <span className="debug">{checker.id.substring(0, 8)}</span>
    </Button>
  )
}

export default observer(Checker)
