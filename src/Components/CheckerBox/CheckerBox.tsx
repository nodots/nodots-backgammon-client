import { useGame } from '../../State'
import {
  CheckerBox as CheckerBoxModel,
  Checker as CheckerModel,
  Point,
  Rail,
  Off
} from '../../Models'
import Checker from '../Checker/Checker'

interface CheckerBoxProps {
  checkerBox: CheckerBoxModel
}

const CheckerBox = (props: CheckerBoxProps) => {
  const { move, board } = useGame()
  const container = board.getCheckerBoxContainer(props.checkerBox.id)
  const checkers: React.JSX.Element[] = []

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!container) {
      throw Error('No container')
    }
    move(props.checkerBox, container)
  }

  props.checkerBox.checkers.forEach((c: CheckerModel) => {
    checkers.push(<Checker checker={c} key={c.id} />)
  })
  return <div className='checker-box' onClick={handleClick}>
    {checkers}
  </ div>
}

export default CheckerBox