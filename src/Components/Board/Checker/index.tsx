import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import { CheckerEventHandler } from './Events/handlers'
import React from 'react'
import { NodotsColor } from '../../../stores/Game/Types'
import { NodotsChecker } from '../../../stores/Game/types/Checker'
import { NodotsGameStore } from '../../../stores/Game/Store'

export interface Props {
  gameStore: NodotsGameStore
  checker: NodotsChecker
  count?: number
}

function Checker({ checker, gameStore, count }: Props) {
  const eventHandler = React.useRef<CheckerEventHandler>(
    new CheckerEventHandler(checker, gameStore)
  ).current

  const theme = useTheme()

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
      onClick={eventHandler.click}
      onContextMenu={eventHandler.doubleClick}
    >
      <span className="count">{count ? count : ''}</span>
      <span className="hidden">{checker.id}</span>
    </Button>
  )
}

export default observer(Checker)
