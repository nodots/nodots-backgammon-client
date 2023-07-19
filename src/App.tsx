import { GameProvider } from './State'
import { Paper } from '@mui/material'
import Board from './Components/Board/Board'

import './App.scss'

// const LOCAL_STORAGE_KEY = 'nodots-backgammon-game'
// const Player1 = new Player('Ken', 'Riley', 'white')
// const Player2 = new Player('A', 'Robot', 'black', 'Robot')
// let CurrentGame: Game | undefined = undefined


const App = () => {
  return (
    <GameProvider>
      <div className="App">
        <Paper className='board-frame' elevation={8}>
          <Board />
        </Paper>
      </div>
    </GameProvider>

  )
}

export default App
