import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import appTheme from './theme/theme'
import GamePage from './Pages/GamePage'
import { FoodBank } from '@mui/icons-material'
const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<GamePage />} />
          </Routes>
          <footer>
            <div>
              Copyright &copy; {new Date().getFullYear()} Nodots Advisory Group,
              LLC. All Rights Reserved.
            </div>
            <div>
              <a href="mailto:backgammon@nodots.com">backgammon@nodots.com</a>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
