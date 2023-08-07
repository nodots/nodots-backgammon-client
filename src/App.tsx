import { CubeProvider } from './components/Cube/state/cube.provider'
import { BoardProvider } from './components/Board/state/board.provider'
import { Paper } from '@mui/material'
import Board from './components/Board'

import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Paper className='board-frame' elevation={8}>
        <BoardProvider>
          <CubeProvider>
            <Board />
          </CubeProvider>
        </BoardProvider>
      </Paper>
    </div>

  )
}

export default App
