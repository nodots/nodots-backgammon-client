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
import {
  Checker as CheckerType,
  getChecker,
} from '../../GameStore/types/Checker'
import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'
import { getCheckercontainerById } from '../../GameStore/types/Board'

export interface Props {
  store: NodotsGameStore
  checker: CheckerType
  count?: number
}

function Checker({ checker, store }: Props) {
  const theme = useTheme()

  const handleCheckerClick = (e: React.MouseEvent) => {
    const checker = e.currentTarget
    const color = checker.getAttribute('data-color')
    console.log(`${checker.id} ${color} parent positions:`)
    const container = checker.parentElement
    const clockwisePosition = container?.getAttribute('data-position-clockwise')
    const counterclockwisePosition = container?.getAttribute(
      'data-position-counterClockwise'
    )
    console.log(clockwisePosition, counterclockwisePosition)
    switch (store.state.kind) {
      case 'rolled':
      case 'moving':
        store.moving(store.state, checker.id)
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
      data-color={checker.color}
      onClick={handleCheckerClick}
    >
      <span className="hidden">{checker.id}</span>
    </Button>
  )
}

export default observer(Checker)
