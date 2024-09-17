import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthComponent from './Contexts/Auth/AuthComponent'
import GamePage from './Pages/Protected/GamePage'
import { LobbyPage } from './Pages/Protected/LobbyPage'
import HomePage from './Pages/Public/HomePage'
import SignInPage from './Pages/Public/SignInPage'
import appTheme from './theme/AppTheme'
import { useTranslation, withTranslation } from 'react-i18next'
import { ProtectedPages } from './Pages/Protected'
import PlayerProvider from './Contexts/Player/PlayerProvider'
export const apiUrl = 'http://localhost:3000'

const App = () => {
  const { i18n } = useTranslation()
  document.body.dir = i18n.dir()
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/authorize" element={<AuthComponent />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/bg" element={<ProtectedPages />} />
            <Route path="/bg/game/:gameId" element={<GamePage />} />
            <Route
              path="/bg/lobby"
              element={
                <PlayerProvider>
                  <LobbyPage />
                </PlayerProvider>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default withTranslation()(App)
