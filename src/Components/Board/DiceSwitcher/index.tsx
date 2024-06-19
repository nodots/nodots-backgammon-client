import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'

import { DiceSwitcherEventHandler } from './Events/handlers'
import { GamePlaying } from '../../../stores/Game/Types'
import { NodotsColor } from '../../../stores/Game/Types'
import { NodotsPlayState } from '../../../stores/Game/Stores/Play/Types'
import { NodotsGameStore } from '../../../stores/Game/Store'

interface Props {
  gameStore: NodotsGameStore
  color: NodotsColor
}

function DiceSwitcher({ gameStore, color }: Props) {
  const eventHandler = React.useRef<DiceSwitcherEventHandler>(
    new DiceSwitcherEventHandler(gameStore.state)
  ).current
  const theme = useTheme()
  // console.log(
  //   '[Component: DiceSwitcher] gameStore.state.kind:',
  //   gameStore.state.kind
  // )
  switch (gameStore.state.kind) {
    case 'game-initializing':
    case 'game-ready':
    case 'game-rolling-for-start':
    case 'game-completed':
      return <></>
    case 'game-playing':
      const gameState = gameStore.state as GamePlaying // FIXME
      const { playStore } = gameState
      // console.log(
      //   '[Component: DiceSwitcher] playStore.state.kind:',
      //   playStore.state.kind
      // )
      switch (playStore.state.kind) {
        case 'play-rolling':
          return (
            gameState.activeColor === color && (
              <SyncAltIcon
                className="dice-switcher"
                sx={{ fill: theme.palette.secondary.light }}
              />
            )
          )
        case 'play-dice-switched':
        case 'play-confirming':
        case 'play-initializing':
        case 'play-moving':
          return <></>
      }
  }
}

export default observer(DiceSwitcher)
