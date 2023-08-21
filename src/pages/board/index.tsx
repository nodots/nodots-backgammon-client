import Board from '../../components/Board'
import { Paper } from '@mui/material'
import NavBar from '../../components/Core/NavBar'
export const BoardPage = () => {

  return <div className='Board'>
    <NavBar />
    <Paper className='board-frame' elevation={8}>
      <Board />
    </Paper>
  </div>

}

