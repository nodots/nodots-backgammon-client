import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../../GameStore'
import { Color } from '../../../GameStore/types'
import { Checker as CheckerType } from '../../../GameStore/types/Checker'
import { CheckerEventHandler } from './Events/handlers'
import React from 'react'

export interface Props {
  store: NodotsGameStore
  checker: CheckerType
  count?: number
}

function Checker({ checker, store, count }: Props) {
  const eventHandler = React.useRef<CheckerEventHandler>(
    new CheckerEventHandler(checker, store)
  ).current

  const theme = useTheme()

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
      onClick={eventHandler.click}
      onContextMenu={eventHandler.doubleClick}
    >
      <span className="count">{count ? count : ''}</span>
      <span className="hidden">{checker.id}</span>
    </Button>
  )
}

export default observer(Checker)
