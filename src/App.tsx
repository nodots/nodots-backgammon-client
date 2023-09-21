import { ThemeProvider, CssBaseline } from '@mui/material'
import { GameProvider } from './game/game.provider'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { appTheme } from './theme/theme'
import reportWebVitals from './reportWebVitals'
import reportHandler from './reportHandler'


import './App.scss'
import { GamePage } from './pages/game'
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
              <Route path='/game' element={<GamePage />} />
              <Route path='/sign-up' element={<RegistrationPage />} />
            </Routes>
          </GameProvider>
        </div>
      </Router>
    </ThemeProvider>
  )
}

reportWebVitals(reportHandler)

export default App
