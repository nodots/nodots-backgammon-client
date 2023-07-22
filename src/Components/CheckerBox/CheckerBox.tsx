import { GameError } from '../../Models'
import { useGame } from '../../State/Game.State'
import {
  CheckerBox as CheckerBoxModel,
  Checker as CheckerModel,
} from '../../Models'
import Checker from '../Checker/Checker'

interface CheckerBoxProps {
  checkerBox: CheckerBoxModel
}

const CheckerBox = (props: CheckerBoxProps) => {
  const { board, players, debug, move } = useGame()
  const checkerBoxState = board.getCheckerBoxes().find(cb => cb.id === props.checkerBox.id)
  if (debug) {
    console.log(`[CHECKERBOX COMPONENT] checkerBoxState:`)
    console.log(checkerBoxState)
    console.log(`[CHECKERBOX COMPONENT] players:`)
    console.log(`white active?: ${players.white.active.toString()}`)
    console.log(`black active?: ${players.black.active.toString()}`)
  }
  if (!checkerBoxState) {
    throw new GameError({ model: 'CheckerBox', errorMessage: 'No checkerBoxState' })
  }
  const container = board.getCheckerBoxContainer(props.checkerBox.id)
  const checkers: React.JSX.Element[] = []

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!container) {
      throw new GameError({ model: 'CheckerBox', errorMessage: 'No container' })
    }
    try {
      move(props.checkerBox, container)
    } catch (e) {
      console.error(e)
    }
  }

  checkerBoxState.checkers.forEach((c: CheckerModel) => {
    checkers.push(<Checker checker={c} key={c.id} />)
  })

  return <div className='checker-box' onClick={handleClick}>
    {checkers}
  </ div>
}

export default CheckerBox