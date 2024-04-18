// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import NodotsGameStore from '../../GameStore'
import {
  NodotsGameState,
  Color,
  Ready,
  Confirming,
  Moving,
  Rolling,
  RollingForStart,
  switchDice,
} from '../../GameStore/types'
import { Player } from '../../GameStore/types/Player'
import { observer } from 'mobx-react'
import { useTheme } from '@mui/material'
import React from 'react'

interface Props {
  state: Ready | Rolling | Moving | Confirming | RollingForStart
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function DiceSwitcher({ state, color }: Props) {
  const theme = useTheme()
  const { activeColor } = state

  const switchDiceHandler = () => {
    switch (state.kind) {
      case 'rolling':
        switchDice(state)
        break
      default:
        break
    }
  }

  return (
    activeColor &&
    isActive(activeColor, color) && (
      <div className={`dice-switcher ${color}`} onClick={switchDiceHandler}>
        <SyncAltIcon sx={{ fill: theme.palette.secondary.light }} />
      </div>
    )
  )
}

export default observer(DiceSwitcher)
