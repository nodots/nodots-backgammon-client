import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../../GameStore'
import { Color } from '../../../GameStore/types'

interface Props {
  store: NodotsGameStore
  color: Color
}

function DiceSwitcher({ store, color }: Props) {
  const theme = useTheme()

  const switchDiceHandler = () => {
    switch (store.state.kind) {
      case 'game-confirming':
      case 'game-confirmed':
      case 'game-initializing':
      case 'game-rolling':
      case 'game-moving':
        break
      case 'game-rolled':
        store.switchDice(store.state)
        break
      case 'game-rolling-for-start':
      default:
        alert(`Unexpected state ${store.state.kind}`)
        break
    }
  }

  switch (store.state.kind) {
    case 'game-rolling-for-start':
    case 'game-rolling':
    case 'game-initializing':
      return <></>
    case 'game-rolled':
      return (
        store.state.activeColor === color && (
          <div className={`dice-switcher ${color}`} onClick={switchDiceHandler}>
            <SyncAltIcon sx={{ fill: theme.palette.secondary.light }} />
          </div>
        )
      )
  }
}

export default observer(DiceSwitcher)
