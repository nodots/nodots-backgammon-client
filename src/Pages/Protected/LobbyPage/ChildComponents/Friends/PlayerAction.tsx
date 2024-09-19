import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNodotsPlayer } from '../../../../../Contexts/Player/useNodotsPlayer'
import {
  NodotsGameRollingForStart,
  NodotsPlayer,
} from '../../../../../../nodots_modules/backgammon-types'
// import { useNodotsGame } from '../../../../../Contexts/Game/useNodotsGame'
import { apiUrl } from '../../../../../App'
import { GameActionTypes } from '../../../../../Contexts/Game/GameContextActions'
import { useNodotsGame } from '../../../../../Contexts/Game/useNodotsGame'

interface Props {
  player: NodotsPlayer
  opponent: NodotsPlayer
  startGame: (playerId: string, opponentId: string) => void
}

export const PlayerAction = ({ player, opponent, startGame }: Props) => {
  const { t } = useTranslation()
  const { gameState, gameDispatch } = useNodotsGame()
  const { playerState, playerDispatch } = useNodotsPlayer()

  const handleClick = async (e: React.MouseEvent) => {
    startGame(player.id, opponent.id)
  }
  return <Button onClick={handleClick}>{t('NDBG_START_GAME')}</Button>
}
