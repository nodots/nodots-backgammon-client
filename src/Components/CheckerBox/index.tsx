// Hooks
import { useGame } from '../../game/useGame'
// Types
import { GameError } from '../../game/game'
import { CheckerBox as CheckerBoxType } from './state/types'

// Components
import Checker from '../Checker'
import { Checker as CheckerType } from '../Checker/state/types'
import { MoveActionPayload } from '../../game/move'
import { TurnStatus } from '../Player/state/types'

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
    if (e.type === 'click') {
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

  checkerBoxState.checkers.forEach((c: CheckerType) => {
    checkers.push(<Checker checker={c} key={c.id} />)
  })

  return <div className='checker-box' onClick={handleClick} onContextMenu={handleClick}>
    {checkers}
  </ div>
}

export default CheckerBox