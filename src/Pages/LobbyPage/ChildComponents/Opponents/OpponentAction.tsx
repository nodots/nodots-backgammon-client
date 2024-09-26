import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  NodotsGameReady,
  NodotsPlayerReady,
  NodotsPlayersReady,
} from '../../../../../nodots_modules/backgammon-types'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'
import { useEffect, useState } from 'react'
import {
  getPlayingPlayerById,
  getReadyPlayerById,
} from '../../../../Contexts/Player/playerHelpers'
import { startGame } from '../../../../Contexts/Game/gameHelpers'
import { useGameContext } from '../../../../Contexts/Game/useGameContext'
interface Props {
  opponent: NodotsPlayerReady
}

export const OpponentAction = ({ opponent }: Props) => {
  const { t } = useTranslation()
  const { playerState, playerDispatch } = usePlayerContext()
  const { player } = playerState
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState
  const [currentOpponent, setCurrentOpponent] =
    useState<NodotsPlayerReady>(opponent)

  const startGameAction = async (): Promise<NodotsGameReady | void> => {
    switch (player.kind) {
      case 'initializing':
      case 'playing':
        break
      case 'ready':
        if (opponent.kind !== 'ready') {
          throw Error('Opponent is not ready')
        }
        const players: NodotsPlayersReady = {
          black: player,
          white: opponent,
        }
        console.log('[startGameAction] calling startGame players:', players)
        const game = await startGame(players, playerDispatch, gameDispatch)
        console.log('[startGameAction] startGame game:', game)
        return game
    }

    // console.log('[PlayerAction] startGame player:', player)
    // const updatedPlayer = await startGame([], dispatch)
    // console.log('[PlayerAction] startGame updatedPlayer:', updatedPlayer)
    // return updatedPlayer
  }

  const handleClick = async (e: React.MouseEvent) => {
    const game = await startGameAction()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getReadyPlayerById(opponent.id).then((player) => {
        player && setCurrentOpponent(player)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return currentOpponent.isLoggedIn && currentOpponent.isSeekingGame ? (
    <Button onClick={handleClick}>{t('NDBG_START_GAME')}</Button>
  ) : (
    <></>
  )
}
