import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthGuard } from './Auth/AuthGuard'
import AuthComponent from './Auth/AuthComponent'
import GamePage from './Pages/GamePage'
import HomePage from './Pages/HomePage'
import LobbyPage from './Pages/LobbyPage'
import PlayerPage from './Pages/PlayerPage'
import SignInPage from './Pages/SignInPage'
import appTheme from './theme/theme'
import { useTranslation, withTranslation } from 'react-i18next'
import useNodotsGame from './Contexts/Game/GameHook'

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
            <Route
              path="/lobby"
              element={<AuthGuard component={LobbyPage} />}
            />
            <Route
              path="/game/:uuid(\[a-fA-F0-9]{8}-\[a-fA-F0-9]{4}-\[a-fA-F0-9]{4}-\[a-fA-F0-9]{4}-\[a-fA-F0-9]{12})?"
              element={<AuthGuard component={GamePage} />}
            />
            <Route
              path="/player"
              element={<AuthGuard component={PlayerPage} />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default withTranslation()(App)
