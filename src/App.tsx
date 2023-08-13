import { GameProvider } from './game/game.provider'
import { Paper } from '@mui/material'
import Board from './components/Board'
import { Info } from './components/Info/Info'

import './App.scss'

const App = () => {
  return (
    <div className="App">
      <GameProvider>
        <Paper className='board-frame' elevation={8}>
          <Board />
        </Paper>
        <Info elevation={8} />
      </GameProvider>
    </div>
  )
}

export default App
