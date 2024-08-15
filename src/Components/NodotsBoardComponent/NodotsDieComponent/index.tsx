import React from 'react'
import useNodotsGame from '../../../Hooks/GameHook'
import {
  DieOrder,
  NodotsColor,
} from '../../../../nodots_modules/backgammon-types'

interface Props {
  order: DieOrder
  color: NodotsColor
}

// TODO: Show move state with dice
function NodotsDieComponent({ order, color }: Props) {
  const { game } = useNodotsGame()

  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()

    switch (game?.kind) {
      case 'game-initializing':
      case 'game-initialized':
      case 'game-rolling-for-start':
      case 'game-playing-moving':
        break
      case 'game-playing-rolling':
        alert('roll dice')
        break
    }
  }

  switch (game?.kind) {
    case 'game-initializing':
    case 'game-initialized':
    case 'game-rolling-for-start':
    case 'game-playing-moving':
      return <></>
    case 'game-playing-rolling':
      return <NodotsDieComponent order={order} color={color} />
  }
}

export default NodotsDieComponent
