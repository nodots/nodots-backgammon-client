import { Game, Player as PlayerModel, Board as BoardModel } from './Models/Backgammon'
import Player from './Components/Player/Player'
import { Grid, Paper } from '@mui/material'
import Board from './Components/Board/Board'

import './App.scss'

const LOCAL_STORAGE_KEY = 'nodots-backgammon-game'
const Player1 = new PlayerModel('Ken', 'Riley', 'white')
const Player2 = new PlayerModel('A', 'Robot', 'black', 'Robot')
let CurrentGame: Game | undefined = undefined
let CurrentBoard: BoardModel | undefined = undefined

const initGame = (): Game => {
  if (!CurrentBoard) {
    CurrentBoard = BoardModel.initialize()
  }
  if (!CurrentGame) {
    const storedGameString = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (storedGameString) {
      const storedGameObj: Game = JSON.parse(storedGameString)
      CurrentGame = storedGameObj
    } else {
      CurrentGame = new Game(Player1, Player2, CurrentBoard)
      // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(CurrentGame))

    }
  }
  return CurrentGame
}

const App = () => {
  initGame()
  if (!CurrentGame) {
    throw Error('No CurrentGame')
  }
  console.log(CurrentGame)
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} md={9}>
          <Paper className='board-frame'>
            <Board game={CurrentGame} />
            <span className='game-id'>Game: {CurrentGame.id}</span>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className="player-info-container">
            <h2>Players</h2>
            <Player player={CurrentGame.players.black} />
            <Player player={CurrentGame.players.white} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
