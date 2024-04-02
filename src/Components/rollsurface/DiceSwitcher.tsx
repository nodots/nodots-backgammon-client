// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import NodotsGameStore from '../../game'
import { NodotsGameState, Color } from '../../game/Types'
import { Player } from '../../game/player'
import { observer } from 'mobx-react'
import { useTheme } from '@mui/material'

interface Props {
  state: NodotsGameState
  store: NodotsGameStore
  color: Color
}

const isActive = (activePlayer: Player, color: Color) =>
  activePlayer.color === color

function DiceSwitcher({ state, store, color }: Props) {
  const theme = useTheme()
  const { activePlayer } = state
  const switchDiceHandler = () => {
    console.log('switchDiceHandler')
    switch (state.kind) {
      case 'rolling':
        store.switchDice(state)
        break
      default:
        break
    }
  }

  return (
    isActive(activePlayer, color) && (
      <div className={`dice-switcher ${color}`} onClick={switchDiceHandler}>
        <SyncAltIcon sx={{ fill: theme.palette.secondary.light }} />
      </div>
    )
  )
}

export default observer(DiceSwitcher)
