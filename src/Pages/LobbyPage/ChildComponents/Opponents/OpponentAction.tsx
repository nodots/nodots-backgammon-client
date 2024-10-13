import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  NodotsGameReady,
  NodotsGameRollingForStart,
  NodotsPlayerReady,
  NodotsPlayersReady,
} from '../../../../../nodots_modules/backgammon-types'
import { useEffect, useState } from 'react'
import { startGame } from '../../../../Contexts/Game/gameHelpers'
import { useGameContext } from '../../../../Contexts/Game/useGameContext'
import { getReadyPlayerById } from '../../../../Contexts/Game/playerHelpers'
import { observer } from 'mobx-react-lite'
interface Props {
  opponent: NodotsPlayerReady
}

const OpponentAction = ({ opponent }: Props) => {
  const { t } = useTranslation()
  const { setGame, player } = useGameContext()

  const startGameAction =
    async (): Promise<NodotsGameRollingForStart | void> => {
      switch (player?.kind) {
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
          const game = await startGame(players)

          console.log('[startGameAction] startGame game:', game)
          setGame(game)
          return game
      }
    }

  const handleClick = async (e: React.MouseEvent) => {
    const game = await startGameAction()
  }

  return opponent.isLoggedIn && opponent.isSeekingGame ? (
    <Button onClick={handleClick}>{t('NDBG_START_GAME')}</Button>
  ) : (
    <></>
  )
}

export default observer(OpponentAction)
