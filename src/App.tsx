import { GameProvider } from './game/game.provider'
import { Paper } from '@mui/material'
import Board from './components/Board'

import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Paper className='board-frame' elevation={8}>
        <GameProvider>
          <Board />
        </GameProvider>
      </Paper>
    </div>
  )
}

export default App
