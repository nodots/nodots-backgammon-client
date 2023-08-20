// Hooks
import { useGame } from '../../game/useGame'
// Types
import { isColor } from '../../game/game'
import { GameError } from '../../game/game'
import { CheckerBox as CheckerBoxType, isCheckerBox } from './state/types'
import { getHomeQuadrantLocation } from '../Player/state/types/player'

// Components
import Checker from '../Checker'
import { Checker as CheckerType } from '../Checker/state/types'
import { MoveActionPayload, MoveMode, MoveStatus } from '../../game/move'
import { TurnStatus } from '../Player/state/types'
import { isPlayer } from '../Player/state/types/player'

interface CheckerBoxProps {
  checkerBox: CheckerBoxType
}

const CheckerBox = (props: CheckerBoxProps) => {
  const { game, move } = useGame()
  if (!game.activeColor) {
    throw new GameError({ model: 'Move', errorMessage: 'No activeColor' })
  }
  const activePlayer = game.players[game.activeColor]
  const checkerBoxState = props.checkerBox

  if (!checkerBoxState) {
    throw new GameError({ model: 'CheckerBox', errorMessage: 'No checkerBoxState' })
  }
  const checkers: React.JSX.Element[] = []

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!isColor(game.activeColor)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Invalid activeColor'
      })
    }

    const activePlayer = game.players[game.activeColor]
    if (!isPlayer(activePlayer)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Invalid activePlayer'
      })
    }

    const homeQuadrant = game.board.quadrants.find(q => q.location === getHomeQuadrantLocation(activePlayer.moveDirection))
    // FIXME: Proper typeguard
    if (!homeQuadrant) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No home quadrant'
      })
    }
    // const activeMove = game.activeTurn.moves.find(m => m.status !== MoveStatus.COMPLETED && m.status !== MoveStatus.NO_MOVE)

    if (e.type === 'click') {
      if (props.checkerBox.checkers.length === 0) {
        return console.error('No checker to move')
      }
      // if (!props.checkerBox.checkers) {
      //   return console.error('No checkers to move')
      // } else if (activeMove && !activeMove.origin && props.checkerBox.checkers[0].color !== game.activeColor) {
      //   return console.error('Not your checker to move')
      // } else if (isColor(game.activeColor) && game.board.rail[game.activeColor].checkers.length > 0 && !activeMove?.origin && props.checkerBox.position !== 'rail') {
      //   return console.error('You have checkers on the rail that must be moved first')
      // }
      try {
        const payload: MoveActionPayload = {
          player: activePlayer,
          checkerbox: props.checkerBox
        }
        if (game.activeTurn.status === TurnStatus.AWAITING_FINALIZATION) {
          alert('You need to finalize the turn by clicking on the dice again')
        }
        move(payload)
      } catch (e) {
        throw new GameError({ model: 'Move', errorMessage: 'Failed to update activeTurn' })
      }
    } else if (e.type === 'contextmenu') {
      console.warn('[CheckerBox Component] props.checkerBox', props.checkerBox)
    }
  }

  checkerBoxState.checkers.forEach((c: CheckerType, i) => {
    checkers.push(<Checker checker={c} key={c.id} />)
  })

  return <div className='checker-box' onClick={handleClick} onContextMenu={handleClick}>
    {checkers}
  </ div>
}

export default CheckerBox