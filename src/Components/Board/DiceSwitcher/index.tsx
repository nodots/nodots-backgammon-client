import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'

import { DiceSwitcherEventHandler } from './Events/handlers'
import { NodotsGame } from '../../../stores/Game'
import { Color } from '../../../stores/Types'

interface Props {
  store: NodotsGame
  color: Color
}

function DiceSwitcher({ store, color }: Props) {
  const eventHandler = React.useRef<DiceSwitcherEventHandler>(
    new DiceSwitcherEventHandler(store)
  ).current
  const theme = useTheme()

  return <SyncAltIcon sx={{ fill: theme.palette.secondary.light }} />
}

export default observer(DiceSwitcher)
