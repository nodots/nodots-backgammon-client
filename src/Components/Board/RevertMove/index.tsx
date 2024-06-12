import { observer } from 'mobx-react'
import HistoryIcon from '@mui/icons-material/History'
import { useTheme } from '@mui/material'
import { NodotsGame } from '../../../stores/Game'

interface Props {
  store: NodotsGame
}

function RevertMove({ store }: Props) {
  const theme = useTheme()

  const handleRevertMove = () => {}

  return (
    <div onClick={handleRevertMove} id="RevertMoveButton">
      <HistoryIcon sx={{ fill: theme.palette.info.main }} />
    </div>
  )
}

export default observer(RevertMove)
