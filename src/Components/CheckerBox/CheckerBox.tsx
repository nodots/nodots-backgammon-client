// Hooks
import { useGame } from '../../hooks/useGame'

// Models
import {
  GameError,
  CheckerBox as CheckerBoxModel,
  Checker as CheckerModel,
} from '../../Models'

// Components
import Checker from '../Checker/Checker'

interface CheckerBoxProps {
  checkerBox: CheckerBoxModel
}

const CheckerBox = (props: CheckerBoxProps) => {
  const { board, debug, move } = useGame()
  const checkerBoxState = board.getCheckerBoxes().find(cb => cb.id === props.checkerBox.id)
  if (debug.isActive) {
    console.log(`[CheckerBox Component] checkerBoxState:`, checkerBoxState)
  }
  if (!checkerBoxState) {
    throw new GameError({ model: 'CheckerBox', errorMessage: 'No checkerBoxState' })
  }
  const checkers: React.JSX.Element[] = []

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (e.type === 'click') {
      if (!props.checkerBox.parent) {
        throw new GameError({ model: 'CheckerBox', errorMessage: 'No container' })
      }
      try {
        move(props.checkerBox, props.checkerBox.parent)
      } catch (e) {
        console.error(e)
      }
    } else if (e.type === 'contextmenu') {
      console.warn('[CheckerBox Component] props.checkerBox.checkers', props.checkerBox.checkers)
    }
  }

  checkerBoxState.checkers.forEach((c: CheckerModel) => {
    checkers.push(<Checker checker={c} key={c.id} />)
  })

  return <div className='checker-box' onClick={handleClick} onContextMenu={handleClick}>
    {checkers}
  </ div>
}

export default CheckerBox