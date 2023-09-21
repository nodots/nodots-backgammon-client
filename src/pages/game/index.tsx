import Board from '../../components/Board'
import NavBar from '../../components/Core/NavBar'
import { Link } from 'react-router-dom'

export const GamePage = () => {
  return (
    <>
      <NavBar />
      <Link to='/'>Sign Out</Link>
      <Board />
    </>
  )

}

