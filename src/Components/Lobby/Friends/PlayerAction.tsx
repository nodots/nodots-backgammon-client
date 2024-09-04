import { Button } from '@mui/material'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import { useNodotsPlayer } from '../../../Contexts/Player/PlayerHook'
import useNodotsGame from '../../../Contexts/Game/GameHook'
import { useNavigate } from 'react-router-dom'

interface Props {
  opponent: NodotsPlayer
}

export const PlayerAction = ({ opponent }: Props) => {
  const { startGame, game } = useNodotsGame()
  const { player } = useNodotsPlayer()
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    console.log('[PlayerAction] handleClick player: ', player)
    console.log('[PlayerAction] handleClick opponent: ', opponent)
    if (!player || !opponent) return

    startGame(player.id, opponent.id).then((game) => {
      console.log('[PlayerAction] handleClick game:', game)
      navigate(`/game/`)
    })
  }
  switch (player?.kind) {
    case 'player-initialized':
    case 'player-playing':
      return <></>
    case 'player-seeking-game':
      return <Button onClick={handleClick}>Start Game</Button>
  }
}
