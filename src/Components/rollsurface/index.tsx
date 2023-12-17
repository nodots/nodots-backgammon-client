// Hooks
import { useGame } from '../../game/useGame'
import { useState, useEffect } from 'react'
// Types
import { roll, Roll, Die as DieType } from '../die/state/types'
import { Color, Game, isColor } from '../../game'
import { GameError } from '../../game'
import { Analytics } from '../../game/turn'
import { SetDiceValuesPayload } from '../die/state/dice.context'
import { DieValue } from '../die/state/types'
import { Turn, TurnStatus } from '../../game/turn'
import { TurnActionPayload } from '../../game/turn.reducer'
import { MoveStatus } from '../Checkerbox/state'
import { Player } from '../player/state'
import { isPlayer } from '../player/state'

// Components
import Die from '../Die'

// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'

import { BgWebApi_getTurnAnalytics } from '../../game/integrations/bgweb-api'

interface RollSurfaceProps {
  color: Color
}

const RollSurface = (props: RollSurfaceProps) => {
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

  useEffect(() => {
    let newRoll: Roll | undefined = undefined
    if (props.color === activePlayer?.color) {
      if (activePlayer.isRobot || activePlayer.isAutoRoll) {
        console.log('ROBOT activePlayer:', activePlayer)
        console.log('rollingDice')
        newRoll = rollDice()
      }
    }
  }, [activePlayer])

  async function buildTurnActionPayload(
    game: Game,
    newRoll: Roll
  ): Promise<TurnActionPayload> {
    console.log('[ROLL SURFACE] buildTurnActionPayload rollValues:', newRoll)
    const analytics: Analytics[] = await getAnalytics(game, newRoll)
    if (
      !isColor(game.activeColor) ||
      !isPlayer(game.players[game.activeColor])
    ) {
      throw new GameError({
        model: 'Turn',
        errorMessage: 'No active color or player',
      })
    }
    const activePlayer = game.players[game.activeColor]
    console.log(
      '[ROLL SURFACE] buildTurnActionPayload activePlayer:',
      activePlayer
    )
    const turn: TurnActionPayload = {
      board: game.board,
      player: game.players[game.activeColor],
      roll: [newRoll[0], newRoll[1]],
      status: TurnStatus.INITIALIZED,
      analytics,
      isAutomove: activePlayer.isRobot,
    }
    return turn
  }

  function rollDice(): Roll {
    const newRoll: Roll = [roll() as DieValue, roll() as DieValue]
    console.log('[ROLL SURFACE] buildTurnActionPayload rollDice:')

    // const newRoll = [6 as DieValue, 6 as DieValue] as Roll
    const setDiceValuesPayload: SetDiceValuesPayload = {
      color: props.color,
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
      color: props.color,
      values: {
        die1: die1Value,
        die2: die2Value,
      },
    }
    setDiceValues(setDiceValuesPayload)
  }

  async function getAnalytics(game: Game, rollValues: Roll) {
    console.log('[ROLL SURFACE] getAnalytics rollValues:', rollValues)
    const bgWebAnalytics = await BgWebApi_getTurnAnalytics(
      game.board,
      rollValues as Roll,
      game.players
    )
    const bgWebAnalyticsPayload = {
      api: 'bgwebapi',
      analysis: bgWebAnalytics,
    }
    const analytics: Analytics[] = [bgWebAnalyticsPayload]
    return analytics
  }

  // Event handlers
  const clickHandler = async (e: React.MouseEvent) => {
    console.log('clickHandler game:', game)
    console.log('clickHandler props.color:', props.color)
    e.preventDefault()

    if (game.activeColor !== props.color) {
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
      const bgWebAnalytics = await BgWebApi_getTurnAnalytics(
        game.board,
        rollValues as Roll,
        game.players
      )
      console.log('[ROLL SURFACE] bgWebAnalytics: ', bgWebAnalytics)
      const bgWebAnalyticsPayload = {
        api: 'bgwebapi',
        analysis: bgWebAnalytics,
      }
      const analytics: Analytics[] = [bgWebAnalyticsPayload]
      const bgwebapiAnalytics = analytics.find((a) => a.api === 'bgwebapi')

      let isAutomove = activePlayer.isRobot

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
      color: props.color,
      values: {
        die1: die2Value,
        die2: die1Value,
      },
    }
    setDiceValues(setDiceValuesPayload)
    e.stopPropagation()
  }

  return (
    <div className="roll-surface" onClick={clickHandler}>
      {game.activeColor && game.activeColor === props.color && (
        <>
          <Die order={0} value={die1Value} color={props.color} />
          {/* FIXME: hard-coded color */}
          <SyncAltIcon onClick={swapDiceHandler} sx={{ color: '#575f90' }} />
          <Die order={1} value={die2Value} color={props.color} />
        </>
      )}
    </div>
  )
}

export default RollSurface
