import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { observer } from 'mobx-react'
import { useTheme } from '@mui/material'
import { Color, NodotsGameState, Rolled } from '../../GameStore/types'
import NodotsGameStore from '../../GameStore'

interface Props {
  color: Color
  store: NodotsGameStore
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function DiceSwitcher({ store, color }: Props) {
  const theme = useTheme()

  const switchDiceHandler = () => {
    console.log('switchDiceHandler', store.state.kind)
    switch (store.state.kind) {
      case 'rolled':
        store.switchDice(store.state)
        break
      case 'confirming':
      case 'initializing':
      case 'moving':
      case 'rolling':
      case 'rolling-for-start':
      default:
        break
    }
  }

  switch (store.state.kind) {
    case 'rolling-for-start':
    case 'initializing':
      return <></>
    case 'rolling':
    case 'rolled':
    case 'moving':
    case 'confirming':
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
