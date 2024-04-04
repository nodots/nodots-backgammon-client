// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import NodotsGameStore from '../../game'
import { NodotsGameState, Color } from '../../game/Types'
import { Player } from '../../game/player'
import { observer } from 'mobx-react'
import { useTheme } from '@mui/material'
import React from 'react'

interface Props {
  state: NodotsGameState
  store: NodotsGameStore
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function DiceSwitcher({ state, store, color }: Props) {
  const theme = useTheme()
  const { activeColor, players } = state
  const activePlayer = players[activeColor]
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
    isActive(activeColor, color) && (
      <div className={`dice-switcher ${color}`} onClick={switchDiceHandler}>
        <SyncAltIcon sx={{ fill: theme.palette.secondary.light }} />
      </div>
    )
  )
}

export default observer(DiceSwitcher)
