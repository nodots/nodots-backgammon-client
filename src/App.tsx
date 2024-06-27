import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import appTheme from './theme/theme'
import './App.scss'

import GamePage from './pages/game'
import { HomePage } from './pages/home'
import { SignIn } from './pages/registration/sign-in'
import { SignUp } from './pages/registration/sign-up'
import ProfilePage from './pages/profile'
import RootStore from './stores/RootStore'
import React from 'react'

const App = () => {
  console.log('[App] entry point')
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
