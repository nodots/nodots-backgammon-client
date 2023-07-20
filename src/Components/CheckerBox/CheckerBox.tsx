import { useGame } from '../../State'
import {
  CheckerBox as CheckerBoxModel,
  Checker as CheckerModel,
} from '../../Models'
import Checker from '../Checker/Checker'

interface CheckerBoxProps {
  checkerBox: CheckerBoxModel
}

const CheckerBox = (props: CheckerBoxProps) => {
  const { move, board, debug } = useGame()
  const checkerBoxState = board.getCheckerBoxes().find(cb => cb.id === props.checkerBox.id)
  if (debug) {
    console.log(`[CHECKER COMPONENT] checkerBoxState:`)
    console.log(checkerBoxState)
  }
  if (!checkerBoxState) {
    throw Error('No checkerBoxState')
  }
  const container = board.getCheckerBoxContainer(props.checkerBox.id)
  const checkers: React.JSX.Element[] = []

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!container) {
      throw Error('No container')
    }
    move(props.checkerBox, container)
  }

  checkerBoxState.checkers.forEach((c: CheckerModel) => {
    checkers.push(<Checker checker={c} key={c.id} />)
  })
  return <div className='checker-box' onClick={handleClick}>
    {checkers}
  </ div>
}

export default CheckerBox