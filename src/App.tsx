import { GameProvider } from './game/game.provider'
// import { RegistrationPage } from './pages/registration'
import { BoardPage } from './pages/board'
// import { Debug } from './components/Debug'

import './App.scss'

const App = () => {
  return (
    <div className="App">
      <GameProvider>
        <BoardPage />
      </GameProvider>
    </div>
  )
}

export default App
