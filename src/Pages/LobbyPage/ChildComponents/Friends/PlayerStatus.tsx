import { useTranslation } from 'react-i18next'
import {
  NodotsPlayer,
  NodotsPlayerActive,
} from '../../../../../nodots_modules/backgammon-types'
import { useState, useEffect } from 'react'
import { getActivePlayerById } from '../../../../Contexts/Player/playerHelpers'

interface Props {
  opponent: NodotsPlayerActive
}
const PlayerStatus = ({ opponent }: Props) => {
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

  return currentOpponent.isLoggedIn ? t('NDBG_ONLINE') : t('NDBG_OFFLINE')
}

export default PlayerStatus
