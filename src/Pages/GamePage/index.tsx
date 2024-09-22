import { Container, Paper } from '@mui/material'
import {
  NodotsGameMoving,
  NodotsGameReady,
  NodotsGameRollingForStart,
  NodotsGame,
  NodotsPlayerPlaying,
} from '../../../nodots_modules/backgammon-types'
import NodotsBoardComponent from '../../Components/NodotsBoardComponent'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameById } from '../../Contexts/Game/GameContextHelpers'
import { Loading } from '../../Components/utils/Loading'
import { getPlayerById } from '../../Contexts/Player/playerHelpers'
import NodotsGameNotifications from '../../Components/NodotsNotificationsComponent/GameNotifications'

const GamePage = () => {
  return <>GamePage Stub</>
}

export default GamePage
