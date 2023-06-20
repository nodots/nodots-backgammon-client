import { Game, Player, Board as BoardModel } from './Models/Backgammon'
import Board from './Components/Board/Board'
import './App.scss'

const Player1 = new Player('Ken', 'Riley', 'white')
const Player2 = new Player('A', 'Robot', 'black')
let CurrentGame: Game | undefined = undefined
let CurrentBoard: BoardModel | undefined = undefined

const initGame = (): Game => {
  if (!CurrentBoard) {
    CurrentBoard = BoardModel.initialize()
  }
  if (!CurrentGame) {
    CurrentGame = new Game(Player1, Player2, CurrentBoard)
  }
  return CurrentGame
}

const App = () => {
  initGame()
  if (!CurrentGame) {
    throw Error('No point in this')
  }
  console.log(CurrentGame)
  return (
    <div className="App">
      <Board game={CurrentGame} />
    </div>
  )

}

export default App
