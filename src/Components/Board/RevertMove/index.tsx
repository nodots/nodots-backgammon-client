import { observer } from 'mobx-react'
import HistoryIcon from '@mui/icons-material/History'
import { useTheme } from '@mui/material'
import { NodotsGameStore } from '../../../stores/Game/Store'

interface Props {
  gameStore: NodotsGameStore
}

function RevertMove({ gameStore }: Props) {
  const theme = useTheme()

  const handleRevertMove = () => {}

  switch (gameStore.state.kind) {
    case 'game-playing-moving':
      return (
        <div onClick={handleRevertMove} id="RevertMoveButton">
          <HistoryIcon sx={{ fill: theme.palette.info.main }} />
        </div>
      )
    case 'game-initializing':
    case 'game-rolling-for-start':
    case 'game-ready':
    case 'game-playing-rolling':
    case 'game-completed':
      return <></>
  }
}

export default observer(RevertMove)
