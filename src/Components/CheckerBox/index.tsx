// Hooks

// Models
import {
  GameError,
} from '../../models'

// Types
import { CheckerBox as CheckerBoxType } from './state/types'

// Components
import Checker from '../Checker'
import { Checker as CheckerType } from '../Checker/state/types'

interface CheckerBoxProps {
  checkerBox: CheckerBoxType
}

const CheckerBox = (props: CheckerBoxProps) => {
  const checkerBoxState = props.checkerBox

  if (!checkerBoxState) {
    throw new GameError({ model: 'CheckerBox', errorMessage: 'No checkerBoxState' })
  }
  const checkers: React.JSX.Element[] = []

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (e.type === 'click') {
      try {
        // FIXME: call move code
        // move(props.checkerBox)
      } catch (e) {
        console.error(e)
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