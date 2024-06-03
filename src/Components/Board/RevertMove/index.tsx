import { observer } from 'mobx-react'
import HistoryIcon from '@mui/icons-material/History'
import NodotsGameStore from '../../GameStore'
import { useTheme } from '@mui/material'

interface Props {
  store: NodotsGameStore
}

function RevertMove({ store }: Props) {
  const theme = useTheme()

  const handleRevertMove = () => {
    switch (store.state.kind) {
      case 'game-moving':
      case 'game-confirming-play':
        store.reverting(store.state)
        break
      case 'game-initializing':
      default:
        break
    }
  }

  switch (store.state.kind) {
    case 'game-moving':
    case 'game-confirming-play':
      return (
        <div onClick={handleRevertMove} id="RevertMoveButton">
          <HistoryIcon sx={{ fill: theme.palette.info.main }} />
        </div>
      )
    default:
      return <></>
  }
}

export default observer(RevertMove)
