// Hooks
import { useGame } from '../../game/useGame'
import { useState, useEffect } from 'react'
// Types
import { roll, Roll, Die as DieType } from '../Die/state/types'
import { CheckerBoxPosition, Color, isColor } from '../../game'
import { GameError } from '../../game'
import { Analytics } from '../../game/turn'
import { SetDiceValuesPayload } from '../Die/state/dice.context'
import { DieValue } from '../Die/state/types'
import { Turn, TurnStatus } from '../../game/turn'
import { TurnActionPayload } from '../../game/turn.reducer'
import { MoveStatus } from '../CheckerBox/state'
import { Player } from '../Player/state'
import { CheckerBox } from '../CheckerBox/state'
import { MoveActionPayload } from '../../game/move'

// Components
import Die from '../Die'

// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { BgWebApi_getTurnAnalytics } from '../../game/integrations/bgweb-api'
import { getCheckerBoxes } from '../Board/state'

interface RollSurfaceProps {
  color: Color
}


const RollSurface = (props: RollSurfaceProps) => {
  const { game, move, initializeTurn, finalizeTurn, getTurnAnalytics, setDiceValues } = useGame()
  const activeTurn = game.activeTurn

  let die1: DieType | undefined = undefined
  let die2: DieType | undefined = undefined

  let activePlayer: Player | undefined = undefined

  if (game.activeColor) {
    die1 = game.dice[game.activeColor].dice[0]
    die2 = game.dice[game.activeColor].dice[1]
    activePlayer = game.players.black.active ? game.players.black : game.players.white

  }

  const [die1Value, setDie1Value] = useState<DieValue>(die1?.value ? die1.value : 1)
  const [die2Value, setDie2Value] = useState<DieValue>(die2?.value ? die2.value : 1)

  useEffect(() => {
    const setTurn = async (roll: Roll, activeColor: Color) => {
      console.log('in setTurn [roll, activeColor]', [roll, activeColor])
      const bgWebAnalytics = await BgWebApi_getTurnAnalytics(game.board, roll, game.players)
      const bgWebAnalyticsPayload = {
        api: 'bgwebapi',
        analysis: bgWebAnalytics
      }
      const analytics: Analytics[] = [bgWebAnalyticsPayload]
      console.log(analytics)

      const activePlayer = game.players[activeColor]
      console.log(activePlayer)

      const turn: TurnActionPayload = {
        board: game.board,
        player: activePlayer,
        roll: [roll[0], roll[1]],
        status: TurnStatus.INITIALIZED,
        analytics

      }
      initializeTurn(turn)

      const play = analytics[0].analysis[0].play
      console.log(play)

      play.forEach(p => {
        console.log(p)
        let originPoint: CheckerBox | undefined = undefined
        const checkerboxes = getCheckerBoxes(game.board)
        console.log(activePlayer.moveDirection)

        let relativePosition: number | undefined = undefined
        originPoint = checkerboxes.find(cb => {
          if (activePlayer.moveDirection === 'counterclockwise') {
            if (typeof cb.position === 'number') {
              relativePosition = cb.positionCounterClockwise as number
            }
          } else {
            if (typeof cb.position === 'number') {

              relativePosition = cb.position as number
            }
          }
          return cb.position == relativePosition
        })

        if (originPoint) {
          const payload: MoveActionPayload = {
            player: activePlayer,
            checkerbox: originPoint
          }
          console.log(payload)
          try {
            move(payload)
          } catch (e) {
            console.error(e)
          }
        } else {
          console.log(relativePosition)
          console.error('No origin point')
        }

      })

    }

    if (activePlayer?.color === props.color) {
      if (activePlayer.isRobot) {
        const roll = rollDice() as Roll
        if (game.activeColor) {
          setTurn(roll, game.activeColor)
          // setDie1Value(1)
          // setDie2Value(1)
          const setDiceValuesPayload: SetDiceValuesPayload = {
            color: props.color,
            values: {
              die1: 1,
              die2: 1
            }
          }
          setDiceValues(setDiceValuesPayload)

          // finalizeTurn()
        }
      }
    }


  }, [activePlayer])

  function rollDice () {
    const newRoll = [roll() as DieValue, roll() as DieValue]
    const setDiceValuesPayload: SetDiceValuesPayload = {
      color: props.color,
      values: {
        die1: newRoll[0],
        die2: newRoll[1]
      }
    }
    setDie1Value(newRoll[0])
    setDie2Value(newRoll[1])
    setDiceValues(setDiceValuesPayload)
    return newRoll
  }



  const swapDiceHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isColor(game.activeColor)) {
      if (game.dice[game.activeColor].dice[0].value === undefined ||
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
        die2: die1Value
      }
    }
    setDiceValues(setDiceValuesPayload)
    e.stopPropagation()
  }

  const clickHandler = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (game.activeColor !== props.color) {
      console.error('Not your turn')
    }
    if (game.activeTurn) {
      const activeTurn: Turn = game.activeTurn
      let isTurnComplete = false

      const lastMove = activeTurn.moves[activeTurn.moves.length - 1]

      if ((lastMove && lastMove.origin && lastMove.destination) || (lastMove && lastMove.status === MoveStatus.NO_MOVE)) {
        isTurnComplete = true
      }

      let isTurnInProgress = false
      if (activeTurn.moves.length > 0) {
        isTurnInProgress = true
      }

      /* TODO: Think about whether we want this logic here.
        PROS:
          - Easy check that prevents waiting for response
          from reducer. Probably not that big a deal.
        CONS:
          - Logic in two places. It has to be in the reducer, it's
          a nice-to-have (maybe) here.
      */
      if (isTurnComplete) {
        setDie1Value(1)
        setDie2Value(1)
        const setDiceValuesPayload: SetDiceValuesPayload = {
          color: props.color,
          values: {
            die1: die1Value,
            die2: die2Value
          }
        }
        setDiceValues(setDiceValuesPayload)
        finalizeTurn()
      } else if (isTurnInProgress) {
        console.error('Turn in progress')
      }
    } else {
      const newRollValues = rollDice()
      if (!isColor(game.activeColor)) {
        throw new GameError({
          model: 'Game',
          errorMessage: `Invalid activeColor ${game.activeColor}`
        })
      }

      const bgWebAnalytics = await BgWebApi_getTurnAnalytics(game.board, newRollValues as Roll, game.players)
      const bgWebAnalyticsPayload = {
        api: 'bgwebapi',
        analysis: bgWebAnalytics
      }
      const analytics: Analytics[] = [bgWebAnalyticsPayload]

      const turn: TurnActionPayload = {
        board: game.board,
        player: game.players[game.activeColor],
        roll: [newRollValues[0], newRollValues[1]],
        status: TurnStatus.INITIALIZED,
        analytics

      }


      initializeTurn(turn)


    }
  }




  return (
    <div className='roll-surface' onClick={clickHandler}>
      {game.activeColor && game.activeColor === props.color && <>
        <Die order={0} value={die1Value} color={props.color} />
        <SyncAltIcon onClick={swapDiceHandler} sx={{ color: '#006b5f' }} />
        <Die order={1} value={die2Value} color={props.color} />
      </>}
    </div>
  )
}

export default RollSurface