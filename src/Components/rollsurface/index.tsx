// Hooks
import { useGame } from '../../game/useGame'
import { useState, useEffect } from 'react'
// Types
import { Die as DieType } from '../Die/state/types/die'
import { roll, Roll, DieValue } from '../Die/state'
import { Color, Game, isColor } from '../../game'
import { GameError } from '../../game'
import { Analytics } from '../../game/turn'
import { SetDiceValuesPayload } from '../Die/state/dice.context'
import { Turn, TurnStatus } from '../../game/turn'
import { TurnActionPayload } from '../../game/turn.reducer'
import { Player, isPlayer } from '../../game/player'
import { MoveStatus } from '../../game/move'

// Components
import Die from '../Die'

// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'

import { BgWebApi_getTurnAnalytics } from '../../game/integrations/bgweb-api'
import { Container, useTheme } from '@mui/material'

interface Props {
  color: Color
}

const RollSurface: React.FC<Props> = ({ color }) => {
  const theme = useTheme()
  const { game, initializeTurn, finalizeTurn, setDiceValues } = useGame()
  const activeTurn = game.activeTurn

  let die1: DieType | undefined = undefined
  let die2: DieType | undefined = undefined

  let activePlayer: Player | undefined = undefined

  if (game.activeColor) {
    die1 = game.dice[game.activeColor].dice[0]
    die2 = game.dice[game.activeColor].dice[1]
    activePlayer = game.players.black.active
      ? game.players.black
      : game.players.white
  }

  const [die1Value, setDie1Value] = useState<DieValue>(
    die1?.value ? die1.value : 1
  )
  const [die2Value, setDie2Value] = useState<DieValue>(
    die2?.value ? die2.value : 1
  )

  // useEffect(() => {
  //   let newRoll: Roll | undefined = undefined
  //   if (props.color === activePlayer?.color) {
  //     if (activePlayer.isAutoRoll) {
  //       console.log('ROBOT activePlayer:', activePlayer)
  //       console.log('rollingDice')
  //       newRoll = rollDice()
  //     }
  //   }
  // }, [activePlayer])

  function rollDice(): Roll {
    const newRoll: Roll = [roll() as DieValue, roll() as DieValue]

    // const newRoll = [6 as DieValue, 6 as DieValue] as Roll
    const setDiceValuesPayload: SetDiceValuesPayload = {
      color,
      values: {
        die1: newRoll[0],
        die2: newRoll[1],
      },
    }
    setDie1Value(newRoll[0])
    setDie2Value(newRoll[1])
    setDiceValues(setDiceValuesPayload)

    return newRoll
  }

  function cleanUpTurn(): void {
    setDie1Value(1)
    setDie2Value(1)
    const setDiceValuesPayload: SetDiceValuesPayload = {
      color: color,
      values: {
        die1: die1Value,
        die2: die2Value,
      },
    }
    setDiceValues(setDiceValuesPayload)
  }

  // Event handlers
  const clickHandler = async (e: React.MouseEvent) => {
    console.log('clickHandler game:', game)
    console.log('clickHandler props.color:', color)
    e.preventDefault()

    if (game.activeColor !== color) {
      console.error('Not your turn')
    }
    if (game.activeTurn) {
      const activeTurn: Turn = game.activeTurn
      let isTurnComplete = false

      const lastMove = activeTurn.moves[activeTurn.moves.length - 1]

      if (
        (lastMove && lastMove.origin && lastMove.destination) ||
        (lastMove && lastMove.status === MoveStatus.NO_MOVE)
      ) {
        isTurnComplete = true
      }

      let isTurnInProgress = false
      if (activeTurn.moves.length > 0) {
        isTurnInProgress = true
      }

      if (isTurnComplete) {
        cleanUpTurn()
        finalizeTurn()
      } else if (isTurnInProgress) {
        console.error('Turn in progress')
      }
    } else {
      if (!isColor(game.activeColor)) {
        throw new GameError({
          model: 'Game',
          errorMessage: `Invalid activeColor ${game.activeColor}`,
        })
      }

      const rollValues = rollDice()
      console.log('[ROLL SURFACE] rollValues:', rollValues)

      const activePlayer = game.players[game.activeColor]
      console.log('[ROLL SURFACE] activePlayer:', activePlayer)
      console.log('[ROLL SURFACE] game:', game)
      console.log('[ROLL SURFACE]: calling BgWebApi_getTurnAnalytics')
      const analysis = await BgWebApi_getTurnAnalytics(
        game.board,
        rollValues as Roll,
        game.players
      )
      const bgWebAnalyticsPayload = {
        api: 'bgwebapi',
        analysis,
      }

      console.log('[AUTO MOVE]: analysis', analysis)

      const analytics: Analytics[] = [bgWebAnalyticsPayload]

      let isAutomove = activePlayer.isAutoMove

      const turn: TurnActionPayload = {
        board: game.board,
        player: activePlayer,
        roll: rollValues,
        status: TurnStatus.INITIALIZED,
        analytics,
        isAutomove,
      }
      initializeTurn(turn)
    }
  }

  const swapDiceHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isColor(game.activeColor)) {
      if (
        game.dice[game.activeColor].dice[0].value === undefined ||
        game.dice[game.activeColor].dice[1].value === undefined
      ) {
        // e.stopPropagation()
        return console.error('Dice are not set yet')
      }
    }

    setDie1Value(die2Value)
    setDie2Value(die1Value)

    const setDiceValuesPayload: SetDiceValuesPayload = {
      color: color,
      values: {
        die1: die2Value,
        die2: die1Value,
      },
    }
    setDiceValues(setDiceValuesPayload)
    e.stopPropagation()
  }

  return (
    <Container
      className="rollsurface clockwise"
      sx={{
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Die order={0} color={color} value={1} />
      <Die order={1} color={color} value={1} />
    </Container>
  )
}

export default RollSurface
