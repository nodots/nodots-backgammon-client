import { observer } from 'mobx-react-lite'
import { Alert, AlertColor } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../Contexts/Game/GameContext'
import { Loading } from '../utils/Loading'

interface Props {
  severity?: AlertColor
}

const NodotsGameNotifications = () => {
  const { game } = useGameContext()
  const [notifications, setNotifications] = useState<string[]>([])
  return game && game.kind !== 'initializing' ? (
    <>
      <div>{game.id}</div>
    </>
  ) : (
    <Loading message="NodotsGameNotifications loading game" />
  )
}

export default observer(NodotsGameNotifications)
