import { CssBaseline, ThemeProvider } from '@mui/material'
import { useTranslation, withTranslation } from 'react-i18next'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthComponent from './Contexts/Auth/AuthContext'
import GamePage from './Pages/GamePage'
import HomePage from './Pages/HomePage'
import LobbyPage from './Pages/LobbyPage'
import SignInPage from './Pages/SignInPage'
import appTheme from './theme/AppTheme'
import { ProtectedRoutes } from './Components/utils/ProtectedRoutes'
import PlayerPage from './Pages/PlayerPage'

// FIXME: This should be an environment variable
export const apiUrl = 'http://localhost:3000'
export const baseUrl = 'https://bgc.localhost'
export const playerHome = `/lobby`
export const signInPage = `${baseUrl}/sign-in`

const App = () => {
  const { i18n } = useTranslation()
  document.body.dir = i18n.dir() // Set the direction of the body based on the language

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            {/* Auth0 API endpoint */}
            <Route path="/authorize" element={<AuthComponent />} />
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/game" element={<GamePage />} />
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/player" element={<PlayerPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default withTranslation()(App)
