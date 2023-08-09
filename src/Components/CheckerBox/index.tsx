// Hooks
import { useGame } from '../../useGame'
// Models
import {
  GameError,
} from '../../models'

// Types
import { CheckerBox as CheckerBoxType } from './state/types'

// Components
import Checker from '../Checker'
import { Checker as CheckerType } from '../Checker/state/types'
import { MoveActionPayload } from './state/types/move'

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
    game.activeTurn.moves.forEach(m => {
      console.log(m)
    })
    if (e.type === 'click') {
      try {
        // FIXME: call move code
        const payload: MoveActionPayload = {
          player: activePlayer,
          checkerbox: props.checkerBox
        }
        move(payload)
      } catch (e) {
        throw new GameError({ model: 'Move', errorMessage: 'Failed to update activeTurn' })
      }
    } else if (e.type === 'contextmenu') {
      console.warn('[CheckerBox Component] props.checkerBox.checkers', props.checkerBox.checkers)
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