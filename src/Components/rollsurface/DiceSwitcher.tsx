import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import { Color } from '../../GameStore/types'

interface Props {
  store: NodotsGameStore
  color: Color
}

function DiceSwitcher({ store, color }: Props) {
  const theme = useTheme()

  const switchDiceHandler = () => {
    switch (store.state.kind) {
      case 'confirming':
      case 'confirmed':
      case 'initializing':
      case 'rolling':
      case 'moving':
        break
      case 'rolled':
        store.switchDice(store.state)
        break
      case 'rolling-for-start':
      default:
        alert(`Unexpected state ${store.state.kind}`)
        break
    }
  }
  console.log(store.state.kind)
  switch (store.state.kind) {
    case 'rolling-for-start':
    case 'rolling':
    case 'initializing':
      return <></>
    case 'rolled':
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
