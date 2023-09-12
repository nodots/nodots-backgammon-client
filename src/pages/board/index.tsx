import Board from '../../components/Board'
import { Container, Paper, Box } from '@mui/material'
import NavBar from '../../components/Core/NavBar'

export const BoardPage = () => {
  return <Box >
    <Container className='board-frame'>
      <Board />
    </Container>
  </Box>
}

