import { GameProvider } from './game/game.provider'
import { Paper } from '@mui/material'
import Board from './components/Board'
import { Debug } from './components/Debug'

import './App.scss'

const App = () => {
  return (
    <div className="App">
      <GameProvider>
        <Paper className='board-frame' elevation={8}>
          <Board />
        </Paper>
      </GameProvider>
    </div>
  )
}

export default App
