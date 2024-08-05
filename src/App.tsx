import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import appTheme from './theme/theme'
import GamePage from './Pages/game'

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
