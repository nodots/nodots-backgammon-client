import { Game, Player } from './Models/Backgammon'
import Board from './Components/Board/Board'
import './App.scss'

const Player1 = new Player('Ken', 'Riley', 'white')
const Player2 = new Player('A', 'Robot', 'black')
let CurrentGame: Game | undefined = undefined

const initGame = (): void => {
  if (!CurrentGame) {
    CurrentGame = new Game(Player1, Player2)
  }
}

const App = () => {
  initGame()
  console.log(CurrentGame)
  return (
    <div className="App">
      <Board game={CurrentGame} />
    </div>
  )
}

export default App
