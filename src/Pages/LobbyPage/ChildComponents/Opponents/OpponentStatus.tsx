import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import {
  getPlayingPlayerById,
  getReadyPlayerById,
} from '../../../../Contexts/Player/playerHelpers'
import { NodotsPlayerReady } from '../../../../../nodots_modules/backgammon-types'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'

interface Props {
  opponent: NodotsPlayerReady
}
const OpponentStatus = ({ opponent }: Props) => {
  const { t } = useTranslation()
  const { playerState, playerDispatch } = usePlayerContext()
  const { player } = playerState
  const [currentOpponent, setCurrentOpponent] =
    useState<NodotsPlayerReady>(opponent)
  const handleClick = async (e: React.MouseEvent) => {
    console.log('START GAME')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('[PlayerStatus] polling for Opponent Updates')
      getReadyPlayerById(opponent.id).then((p) => {
        p && p.id !== player.id && setCurrentOpponent(p)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return currentOpponent.isLoggedIn ? t('NDBG_ONLINE') : t('NDBG_OFFLINE')
}

export default OpponentStatus
