import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import { NodotsChecker } from '../../../../nodots_modules/backgammon-types'
import NodotsGameStore from '../../../GameStore'

export interface Props {
  store: NodotsGameStore
  checker: NodotsChecker
  count?: number
}

function NodotsCheckerComponent({ checker, store, count }: Props) {
  const theme = useTheme()

  const handleDebugClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const checker = e.currentTarget
    checker.className = 'debug-highlight'
  }

  const handleCheckerClick = (e: React.MouseEvent) => {
    const checker = e.currentTarget

    switch (store.state.kind) {
      case 'game-rolled':
      case 'game-moving':
        store.moving(store.state, checker.id)
        break
      case 'game-rolling':
      case 'game-confirming':
      case 'game-rolling-for-start':
      default:
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
      variant="outlined"
      data-color={checker.color}
      onClick={handleCheckerClick}
      onContextMenu={handleDebugClick}
    >
      <span className="count">{count ? count : ''}</span>
    </Button>
  )
}

export default observer(NodotsCheckerComponent)
