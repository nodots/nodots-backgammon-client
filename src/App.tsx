import { Game, Player as PlayerModel } from './Models'
import { Paper } from '@mui/material'
import Board from './Components/Board/Board'

import './App.scss'

const LOCAL_STORAGE_KEY = 'nodots-backgammon-game'
const Player1 = new PlayerModel('Ken', 'Riley', 'white')
const Player2 = new PlayerModel('A', 'Robot', 'black', 'Robot')
let CurrentGame: Game | undefined = undefined

const initGame = (): Game => {
  if (!CurrentGame) {
    const storedGameString = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (storedGameString) {
      const storedGameObj: Game = JSON.parse(storedGameString)
      CurrentGame = storedGameObj
    } else {
      CurrentGame = new Game(Player1, Player2)
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
      <Paper className='board-frame' elevation={8}>
        <Board game={CurrentGame} />
      </Paper>
    </div>
  )
}

export default App
