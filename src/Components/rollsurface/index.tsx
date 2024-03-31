// Components
import Die from '../Die'

// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'

import { Container, useTheme } from '@mui/material'
import { MoveDirection, NodotsGameState } from '../../game/Types'
import { Player } from '../../game/player'

interface Props {
  game: NodotsGameState
  direction: MoveDirection
}

const isActive = (direction: MoveDirection, activePlayer: Player) => {
  const active = direction === activePlayer.moveDirection
  return active
}

function RollSurface({ game, direction }: Props) {
  const { players, playerBoards: board, cube } = game.game
  // const activePlayer = game.activePlayer
  // const owner = game.getPlayerForMoveDirection(direction)
  // const color = owner.color
  // const theme = useTheme()

  // if (
  //   players &&
  //   activePlayer &&
  //   activePlayer.dice?.dice &&
  //   activePlayer.dice.dice[0] &&
  //   activePlayer.dice.dice[1] &&
  //   board &&
  //   cube
  // ) {
  //   const [die1Value, setDie1Value] = useState<DieValue>(1)
  //   const [die2Value, setDie2Value] = useState<DieValue>(1)

  // Event handlers
  const clickHandler = async (e: React.MouseEvent) => {
    console.log('clickHandler game:', game)
    console.log('clickHandler direction:', direction)
    e.preventDefault()
  }

  const swapDiceHandler = (e: React.MouseEvent) => {
    console.warn('swap dice handler not implemented')
  }

  return (
    <Container
      className={`rollsurface ${direction}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
      // className={`dice-container ${
      //   isActive(direction, activePlayer) ? 'active' : 'inactive'
      // }`}
      // onClick={clickHandler}
      >
        <Die order={0} color={'white'} value={1} />
        <Die order={1} color={'white'} value={1} />
      </div>
    </Container>
  )
}

export default RollSurface
