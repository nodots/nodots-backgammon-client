// Hooks
import { useState, useEffect } from 'react'
// Types
import { roll, Roll, DieValue } from '../Die/state'
import { Color, Cube, isColor } from '../../game/game'
import { GameError } from '../../game'
import { Analytics } from '../../game/turn'
import { SetDiceValuesPayload } from '../Die/state/dice.context'
import { Turn, TurnStatus } from '../../game/turn'
import { TurnActionPayload } from '../../game/turn.reducer'
import { MoveStatus } from '../../game/move'

// Components
import Die from '../Die'

// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'

import { BgWebApi_getTurnAnalytics } from '../../game/integrations/bgweb-api'
import { Container, useTheme } from '@mui/material'
import { GameState } from '../../game/game.state'

interface Props {
  game: GameState
  color: Color
}

function RollSurface({ game, color }: Props) {
  const { players, board, cube } = game
  const activePlayer = game.getActivePlayer()
  const theme = useTheme()

  console.log('activePlayer:', activePlayer)

  if (
    players &&
    activePlayer &&
    activePlayer.dice?.dice &&
    activePlayer.dice.dice[0] &&
    activePlayer.dice.dice[1] &&
    board &&
    cube
  ) {
    const [die1Value, setDie1Value] = useState<DieValue>(1)
    const [die2Value, setDie2Value] = useState<DieValue>(1)

    // Event handlers
    const clickHandler = async (e: React.MouseEvent) => {
      console.log('clickHandler game:', game)
      console.log('clickHandler props.color:', color)
      e.preventDefault()
    }

    const swapDiceHandler = (e: React.MouseEvent) => {
      console.warn('swap dice handler not implemented')
    }

    return (
      <Container
        className="rollsurface clockwise"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className={`dice-container ${
            game.activePlayer?.color === color ? 'active' : 'inactive'
          }`}
        >
          <Die order={0} color={color} value={1} />
          <Die order={1} color={color} value={1} />
        </div>
      </Container>
    )
  }
}

export default RollSurface
