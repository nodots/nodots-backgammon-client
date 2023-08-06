import { GameProvider } from './state/Game.provider'
import { Paper } from '@mui/material'
import Board from './components/Board/Board'

import './App.scss'

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
