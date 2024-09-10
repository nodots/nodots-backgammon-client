import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  NodotsPlayer,
  PlayerReady,
} from '../../../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../../../Contexts/Game/GameHook'
import { useNodotsPlayer } from '../../../../../Contexts/Player/useNodotsPlayer'

interface Props {
  opponent: PlayerReady
}

export const PlayerAction = ({ opponent }: Props) => {
  const { t } = useTranslation()
  const { startGame, game, setGame } = useNodotsGame()
  const { state, dispatch } = useNodotsPlayer()
  const player = state.player
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    console.log('[PlayerAction] handleClick player: ', player)
    console.log('[PlayerAction] handleClick opponent: ', opponent)
    if (!player || !opponent) return
    startGame(player.id, opponent.id)?.then((game) => {
      console.log('[PlayerAction] handleClick game:', game)
      navigate(`/game/`)
    })
  }
  return opponent.isSeekingGame ? (
    <Button onClick={handleClick}>{t('NDBG_START_GAME')}</Button>
  ) : (
    <></>
  )
}
