import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NodotsPlayerActive } from '../../../../../nodots_modules/backgammon-types'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'
import { useEffect, useState } from 'react'
import {
  getActivePlayerById,
  getPlayerById,
} from '../../../../Contexts/Player/playerHelpers'
interface Props {
  opponent: NodotsPlayerActive
}

export const PlayerAction = ({ opponent }: Props) => {
  const { t } = useTranslation()
  const [currentOpponent, setCurrentOpponent] =
    useState<NodotsPlayerActive>(opponent)
  const handleClick = async (e: React.MouseEvent) => {
    console.log('START GAME')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getActivePlayerById(opponent.id).then((player) => {
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
