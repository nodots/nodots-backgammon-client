import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import appTheme from './theme/theme'
import GamePage from './Pages/GamePage'
import SignInPage from './Pages/SignInPage'
import LobbyPage from './Pages/LobbyPage'
import HomePage from './Pages/HomePage'
import PlayerPage from './Pages/PlayerPage'
import { useAuth0 } from '@auth0/auth0-react'

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/lobby" element={<LobbyPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/player" element={<PlayerPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
