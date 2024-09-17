import { Button, useTheme } from '@mui/material'
import React from 'react'
import {
  NodotsChecker,
  NodotsColor,
  NodotsGame,
} from '../../../../nodots_modules/backgammon-types'

export interface Props {
  game: NodotsGame
  checker: NodotsChecker
  count?: number
}

function NodotsCheckerComponent({ game, checker, count }: Props) {
  const theme = useTheme()

  const handleDebugClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const checker = e.currentTarget
    checker.className = 'debug-highlight'
  }

  const handleCheckerClick = (e: React.MouseEvent) => {
    const checker = e.currentTarget

    switch (game.kind) {
      case 'game-playing-moving':
        //game.move(checker.id)
        console.log('checkerClicked', checker.id)
        break
      case 'game-playing-rolling':
      case 'game-rolling-for-start':
        break
    }
  }

  const getBackgroundColor = (color: NodotsColor) => {
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

export default NodotsCheckerComponent
