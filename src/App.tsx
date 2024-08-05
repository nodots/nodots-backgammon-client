import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import appTheme from './theme/theme'

import GamePage from './Pages/game'
import { HomePage } from './Pages/home'
import { SignIn } from './Pages/registration/sign-in'
import { SignUp } from './Pages/registration/sign-up'
import ProfilePage from './Pages/profile'
const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<GamePage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

// reportWebVitals(reportHandler)

export default App
