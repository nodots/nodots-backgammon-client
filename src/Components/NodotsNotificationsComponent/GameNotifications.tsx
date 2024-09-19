import { Alert, AlertColor } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types'

const getOpponent = (game: NodotsGame, player: NodotsPlayer): NodotsPlayer => {
  if (game && game.NodotsGameInitializing) {
    return game.NodotsGameInitializing.black.id === player.id
      ? game.NodotsGameInitializing.white
      : game.NodotsGameInitializing.black
  }
  throw Error('No opponent found')
}

interface Props {
  severity?: AlertColor
}

function NodotsGameNotifications() {
  return <>NodotsGameNotificationsStub</>
}

export default NodotsGameNotifications
