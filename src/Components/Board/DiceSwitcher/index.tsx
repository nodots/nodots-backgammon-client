import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'

import { DiceSwitcherEventHandler } from './Events/handlers'
import { GamePlaying_Rolling } from '../../../stores/Game/Types'
import { NodotsColor } from '../../../stores/Game/Types'
import { NodotsPlayState } from '../../../stores/Game/Stores/Play/Types'
import { NodotsGameStore } from '../../../stores/Game/Store'

interface Props {
  gameStore: NodotsGameStore
  color: NodotsColor
}

function DiceSwitcher({ gameStore, color }: Props) {
  const theme = useTheme()
  const eventHandler = React.useRef<DiceSwitcherEventHandler>(
    new DiceSwitcherEventHandler(gameStore.state)
  ).current
  const gameState = gameStore.state
  switch (gameState.kind) {
    case 'game-initializing':
    case 'game-completed':
    case 'game-playing-moving':
    case 'game-ready':
    case 'game-rolling-for-start':
      return <></>
    case 'game-playing-rolling':
      const state = gameStore.state as GamePlaying_Rolling
      const { activeColor } = state

      return (
        activeColor === color && (
          <SyncAltIcon
            className="dice-switcher"
            sx={{ fill: theme.palette.secondary.light }}
          />
        )
      )
  }

  // if (gameState.kind === 'game-playing-rolling') {
  //   return (
  //     gameState.activeColor === color && (
  //       <SyncAltIcon
  //         className="dice-switcher"
  //         sx={{ fill: theme.palette.secondary.light }}
  //       />
  //     )
  //   )
  // }
}

export default observer(DiceSwitcher)
