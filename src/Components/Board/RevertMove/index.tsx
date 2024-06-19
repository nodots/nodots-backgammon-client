import { observer } from 'mobx-react'
import HistoryIcon from '@mui/icons-material/History'
import { useTheme } from '@mui/material'
import { GamePlaying, NodotsGameState } from '../../../stores/Game/Types'
import { NodotsPlayState } from '../../../stores/Game/Stores/Play/Types'
import { NodotsGameStore } from '../../../stores/Game/Store'

interface Props {
  gameStore: NodotsGameStore
}

function RevertMove({ gameStore }: Props) {
  const theme = useTheme()

  const handleRevertMove = () => {}

  switch (gameStore.state.kind) {
    case 'game-playing':
      const gameState = gameStore.state as GamePlaying
      switch (gameState.playStore.state.kind) {
        case 'play-moving':
          return (
            <div onClick={handleRevertMove} id="RevertMoveButton">
              <HistoryIcon sx={{ fill: theme.palette.info.main }} />
            </div>
          )
        case 'play-dice-switched':
        case 'play-confirming':
        case 'play-initializing':
        case 'play-rolling':
          return <></>
      }
      break
    case 'game-completed':
    case 'game-initializing':
    case 'game-rolling-for-start':
    case 'game-ready':
      return <></>
  }
}

export default observer(RevertMove)
