import { useAuth0 } from '@auth0/auth0-react'
import BoardComponent from '../../components/Board'
import NavBar from '../../components/core/core'
import { PlayerBoard, Board } from '../../game'
import { Player, generateDice } from '../../game/player'
import { Game, generateId } from '../../game/game'
import { GameState } from '../../game/game.state'
import { Die } from '../../components/Die/state/types/die'
import { Paper } from '@mui/material'
import GameNotifications from '../../components/GameNotifications'
const API_SERVER = 'http://127.0.0.1:3300'
const USER_END_POINT = `${API_SERVER}/user`

const showAds = false

export function GamePage() {
  const game = new GameState()
  game.rollForStart()

  return (
    <>
      <Paper id="GameContainer">
        <GameNotifications game={game} />
        <BoardComponent game={game} />
      </Paper>
    </>
  )
}
