import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthComponent from './Auth/AuthComponent'
import GamePage from './Pages/Protected/GamePage'
import { LobbyPage } from './Pages/Protected/LobbyPage'
import PlayerPage from './Pages/Protected/PlayerPage'
import HomePage from './Pages/Public/HomePage'
import SignInPage from './Pages/SignInPage'
import appTheme from './theme/theme'
import { useTranslation, withTranslation } from 'react-i18next'
import { useNodotsPlayer } from './Contexts/Player/useNodotsPlayer'
import { ProtectedPages } from './Pages/Protected'
export const apiUrl = 'http://localhost:3000'

const App = () => {
  const { i18n } = useTranslation()
  const { state, dispatch } = useNodotsPlayer()
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
            <Route path="/protected" element={<ProtectedPages />}>
              <Route
                path="/protected/lobby"
                element={<LobbyPage player={state.player} />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default withTranslation()(App)
