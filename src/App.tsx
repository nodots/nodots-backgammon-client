import { GameProvider } from './game/game.provider'
import reportWebVitals from './reportWebVitals'
import reportHandler from './reportHandler'
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

reportWebVitals(reportHandler)

export default App
