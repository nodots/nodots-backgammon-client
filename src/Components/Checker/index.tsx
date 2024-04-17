import {
  Color,
  Checker as CheckerType,
  moving,
  confirming,
} from '../../game/Types'
import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'
import React from 'react'

export interface Props {
  checker: CheckerType
  store: NodotsGameStore
  count?: number
}

function Checker({ checker, store }: Props) {
  const { state } = store
  const theme = useTheme()

  const handleCheckerClick = (e: React.MouseEvent) => {
    switch (state.kind) {
      case 'rolling':
      case 'moving':
        moving(state, checker.id)
        break
      case 'confirming':
      case 'initializing':
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
