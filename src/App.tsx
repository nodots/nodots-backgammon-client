import { ThemeProvider, CssBaseline } from '@mui/material'
import { GameProvider } from './game/game.provider'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { appTheme } from './theme/theme'
import reportWebVitals from './reportWebVitals'
import reportHandler from './reportHandler'

import NavBar from './components/Core/NavBar'
// import { RegistrationPage } from './pages/registration'
import { BoardPage } from './pages/board'
// import { Debug } from './components/Debug'

import './App.scss'
import Board from './components/Board'
import { HomePage } from './pages/home'
import { RegistrationPage } from './pages/registration'

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <GameProvider>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/game' element={<BoardPage />} />
              <Route path='/sign-up' element={<RegistrationPage />} />
              <Route path='/sign-in' element={<RegistrationPage />} />
            </Routes>
          </GameProvider>
        </div>
      </Router>
    </ThemeProvider>
  )
}

reportWebVitals(reportHandler)

export default App
