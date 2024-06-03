import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import NodotsGameStore from '../../../GameStore'
import { Color } from '../../../GameStore/types'
import { DiceSwitcherEventHandler } from './Events/handlers'

interface Props {
  store: NodotsGameStore
  color: Color
}

function DiceSwitcher({ store, color }: Props) {
  const eventHandler = React.useRef<DiceSwitcherEventHandler>(
    new DiceSwitcherEventHandler(store)
  ).current
  const theme = useTheme()

  switch (store.state.kind) {
    case 'game-dice-switched':
    case 'game-rolled':
      return (
        store.state.activeColor === color && (
          <div
            className={`dice-switcher ${color}`}
            onClick={eventHandler.click}
          >
            <SyncAltIcon sx={{ fill: theme.palette.secondary.light }} />
          </div>
        )
      )
    case 'game-rolling-for-start':
    case 'game-rolling':
    case 'game-initializing':
    default:
      return <></>
  }
}

export default observer(DiceSwitcher)
