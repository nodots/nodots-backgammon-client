import { Game, Player } from './Models'
import { Paper } from '@mui/material'
import Board from './Components/Board/Board'

import './App.scss'
import GameContext, { GameContextProps } from './Contexts/game.context'

const LOCAL_STORAGE_KEY = 'nodots-backgammon-game'
const Player1 = new Player('Ken', 'Riley', 'white')
const Player2 = new Player('A', 'Robot', 'black', 'Robot')
let CurrentGame: Game | undefined = undefined

const initGame = (): GameContextProps => {
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
  return (
    <GameContext.Provider value={initGame()}>
      <div className="App">
        <Paper className='board-frame' elevation={8}>
          <Board />
        </Paper>
      </div>
    </GameContext.Provider>

  )
}

export default App
