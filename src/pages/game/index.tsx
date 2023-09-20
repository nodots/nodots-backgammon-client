import Board from '../../components/Board'
import { Container, Paper, Box } from '@mui/material'
import NavBar from '../../components/Core/NavBar'
import { Link } from 'react-router-dom'

export const GamePage = () => {
  return (
    <>
      <Link to='/'>Sign Out</Link>
      <Board />
    </>
  )

}

