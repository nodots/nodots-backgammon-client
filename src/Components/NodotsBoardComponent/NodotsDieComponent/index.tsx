import React from 'react'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import {
  DieOrder,
  NodotsColor,
  NodotsGame,
} from '../../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'

interface Props {
  game: NodotsGame
  order: DieOrder
  color: NodotsColor
}

// TODO: Show move state with dice
function NodotsDieComponent({ game, order, color }: Props) {
  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()

    switch (game.kind) {
      case 'game-ready':
      case 'game-rolling-for-start':
      case 'game-playing-moving':
        break
      case 'game-playing-rolling':
        alert('roll dice')
        break
    }
  }

  return <NodotsDieComponent game={game} order={order} color={color} />
}

export default NodotsDieComponent
