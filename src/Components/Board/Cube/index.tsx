import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import { CubeEventHandler } from './Events/handlers'
import { GamePlaying, NodotsGameState } from '../../../stores/Game/Types'
import { NodotsGameStore } from '../../../stores/Game/Store'

interface Props {
  gameStore: NodotsGameStore
}

function Cube({ gameStore }: Props) {
  const theme = useTheme()
  console.log('[Component Cube] gameStore.state.kind:', gameStore.state.kind)
  switch (gameStore.state.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
      return <></>
    case 'game-playing':
    case 'game-ready':
    case 'game-completed':
      const gameState = gameStore.state as GamePlaying // FIXME
      const { cube } = gameState
      return (
        <Button className="cube" sx={{ color: theme.palette.info.main }}>
          {cube.value}
        </Button>
      )
  }
}

export default observer(Cube)
