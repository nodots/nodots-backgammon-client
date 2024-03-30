import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import appTheme from './theme/theme'

import { GamePage } from './pages/game'
import { HomePage } from './pages/home'
import { SignIn } from './pages/registration/sign-in'
import { SignUp } from './pages/registration/sign-up'
import ProfilePage from './pages/profile'
const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

// reportWebVitals(reportHandler)

export default App
