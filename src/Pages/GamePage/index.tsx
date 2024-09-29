import { useEffect, useState } from 'react'
import { NodotsBoardComponent } from '../../Components/NodotsBoardComponent/NodotsBoardComponent'
import { Loading } from '../../Components/utils/Loading'
import { useGameContext } from '../../Contexts/Game/useGameContext'
import { isValidUuid } from '../../App'
import { clear } from 'console'
import { getGameById, setGame } from '../../Contexts/Game/gameHelpers'
import { GameActionTypes } from '../../Contexts/Game/gameActions'
import {
  NodotsGame,
  NodotsGameInitializing,
} from '../../../nodots_modules/backgammon-types'

export const uuidFromUrl = (url: string): string => {
  const urlPieces = url.split('/')
  return urlPieces[urlPieces.length - 1]
}

const GamePage = () => {
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState

  switch (game.kind) {
    case 'initializing':
      return <Loading message={`GamePage game.kind: ${game.kind}`} />
    default:
      return <NodotsBoardComponent />
  }
}

export default GamePage
