import { v4 as generateId } from 'uuid'
// Hooks
import { useGame } from '../../game/useGame'
// Types
import { isColor } from '../../game/Types'
import { GameError } from '../../game/Types'
import { Checkerbox as CheckerboxType } from './state/types'
import { getHomeQuadrantLocation, isPlayer } from '../../game/player'
import { Move, MoveActionPayload } from '../../game/move'
import Checker from '../Checker'
import { Checker as CheckerType } from '../Checker/state/types'
import { isQuadrant } from '../Quadrant/state/types'

interface CheckerboxProps {
  checkerBox: CheckerboxType
}

const Checkerbox = (props: CheckerboxProps) => {
  const { game, move, revert } = useGame()
  if (!game.activeColor) {
    throw new GameError({ model: 'Move', errorMessage: 'No activeColor' })
  }
  const checkerBoxState = props.checkerBox

  if (!checkerBoxState) {
    throw new GameError({
      model: 'Checkerbox',
      errorMessage: 'No checkerBoxState',
    })
  }
  const checkers: React.JSX.Element[] = []

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!isColor(game.activeColor)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Invalid activeColor',
      })
    }

    const activePlayer = game.players[game.activeColor]
    if (!isPlayer(activePlayer)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Invalid activePlayer',
      })
    }

    const homeQuadrant = game.board.quadrants.find(
      (q) => q.location === getHomeQuadrantLocation(activePlayer.moveDirection)
    )
    if (!isQuadrant(homeQuadrant)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No home quadrant',
      })
    }

    if (e.type === 'click') {
      if (props.checkerBox.checkers.length === 0) {
        return console.warn('[TRACEMOVE] No checker to move')
      } else {
        if (props.checkerBox.checkers[0].color !== game.activeColor) {
          return alert('Not your checker')
        }
      }
      const payload: MoveActionPayload = {
        player: activePlayer,
        origin: props.checkerBox,
      }
      if (game.activeTurn?.roll === undefined) {
        return alert('Roll the dice first')
      }

      try {
        move(payload)
      } catch (e) {
        console.error(e)
      }
    } else if (e.type === 'contextmenu') {
      // Revert move
      // console.warn('[Checkerbox Component] props.checkerBox', props.checkerBox)

      const checkers = props.checkerBox.checkers
      if (checkers.length === 0) {
        return console.error('No move to revert')
      }
      const checkerToRevert = checkers[checkers.length - 1] || undefined
      if (game.activeTurn?.moves) {
        const moveToRevert = game.activeTurn.moves.find(
          (m: Move) => m.checker?.id === checkerToRevert.id
        )
        const payload: MoveActionPayload = {
          player: activePlayer,
          origin: props.checkerBox,
        }
        try {
          revert(payload)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  // all of the "count" code is used to display the number of checkers when > 6 checkers on point
  const checkerCount = checkerBoxState.checkers.length
  let countDisplay: number | undefined = undefined
  checkerBoxState.checkers.forEach((c: CheckerType, i) => {
    if (
      i === 6 &&
      props.checkerBox.position !== 'off' &&
      props.checkerBox.position !== 'bar'
    ) {
      countDisplay = checkerCount
    }
    if (
      ((typeof props.checkerBox.position === 'number' ||
        props.checkerBox.position === 'bar') &&
        i < 6) ||
      props.checkerBox.position === 'off'
    ) {
      checkers.push(
        <Checker
          checker={c}
          key={c.id ? c.id : generateId()}
          count={countDisplay}
        />
      )
    }
  })
  return (
    <div
      data-counter-clockwise={props.checkerBox.positionCounterClockwise}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {checkers}
    </div>
  )
}

export default Checkerbox
