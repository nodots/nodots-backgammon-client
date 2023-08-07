import { GameProvider } from './state/Game.provider'
import { CubeProvider } from './components/Cube/state/cube.provider'
import { Paper } from '@mui/material'
import Board from './components/Board'

import './App.scss'

const App = () => {
  return (
    <GameProvider>
      <div className="App">
        <Paper className='board-frame' elevation={8}>
          <CubeProvider>
            <Board />
          </CubeProvider>
        </Paper>
      </div>
    </GameProvider>

  )
}

export default App
