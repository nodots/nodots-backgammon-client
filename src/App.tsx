import { useAuth0 } from '@auth0/auth0-react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthGuard } from './Auth/AuthGuard'

import GamePage from './Pages/GamePage'
import HomePage from './Pages/HomePage'
import LobbyPage from './Pages/LobbyPage'
import PlayerPage from './Pages/PlayerPage'
import SignInPage from './Pages/SignInPage'
import appTheme from './theme/theme'
import AuthComponent from './Auth/AuthComponent'

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
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
            <Route path="/game" element={<AuthGuard component={GamePage} />} />
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

export default App
