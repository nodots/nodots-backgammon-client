import { Alert, AlertColor } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types'

const getOpponent = (game: NodotsGame, player: NodotsPlayer): NodotsPlayer => {
  if (game && game.players) {
    return game.players.black.id === player.id
      ? game.players.white
      : game.players.black
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
