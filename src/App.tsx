import { Game, Player, Board as BoardModel } from './Models/Backgammon'
import { Card, Paper } from '@mui/material'
import Board from './Components/Board/Board'
import './App.scss'

const LOCAL_STORAGE_KEY = 'nodots-backgammon-game'
const Player1 = new Player('Ken', 'Riley', 'white')
const Player2 = new Player('A', 'Robot', 'black', 'Robot')
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(CurrentGame))

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
      <Paper className="player-info-container">
        <h2>Players</h2>
        <Card className="player-info-card">
          Player 1: {CurrentGame.players.black.nickName} (167 pips)
        </Card>
        <Card className="player-info-card active">
          Player 2: {CurrentGame.players.white.nickName} (167 pips)
        </Card>
      </Paper>
      <Paper className='board-frame'>
        <Board game={CurrentGame} />
        <span>Game: {CurrentGame.id}</span>
      </Paper>
    </div>
  )
}

export default App
