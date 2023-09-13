import { v4 as generateId } from 'uuid'
import { Paper } from '@mui/material'
// Hooks
import { useGame } from '../../game/useGame'
// Types
import { isColor } from '../../game/game'
import { GameError } from '../../game/game'
import { CheckerBox as CheckerBoxType } from './state/types'
import { getHomeQuadrantLocation } from '../Player/state/types/player'
import { MoveActionPayload, } from '../../game/move'
import Checker from '../Checker'
import { Checker as CheckerType } from '../Checker/state/types'
import { isPlayer } from '../Player/state/types/player'
import { isQuadrant } from '../Quadrant/state'

interface CheckerBoxProps {
  checkerBox: CheckerBoxType
}

const CheckerBox = (props: CheckerBoxProps) => {
  const { game, move, revert } = useGame()
  if (!game.activeColor) {
    throw new GameError({ model: 'Move', errorMessage: 'No activeColor' })
  }
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
    if (!isQuadrant(homeQuadrant)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No home quadrant'
      })
    }

    if (e.type === 'click') {
      console.warn('[TRACEMOVE] CheckerBox component clickHandler (single click)')
      if (props.checkerBox.checkers.length === 0) {
        return console.warn('[TRACEMOVE] No checker to move')
      } else {
        if (props.checkerBox.checkers[0].color !== game.activeColor) {
          return alert('Not your checker')
        }
      }
      const payload: MoveActionPayload = {
        player: activePlayer,
        checkerbox: props.checkerBox
      }
      console.warn('[TRACE] game.activeTurn:', game.activeTurn)
      if (game.activeTurn.roll === undefined) {
        return alert('Roll the dice first')
      }

      try {
        console.warn('[TRACEMOVE] calling move method with payload:', payload)
        const result = move(payload)
        console.warn('[TRACEMOVE] result:', result)
      } catch (e) {
        console.error(e)
      }
    } else if (e.type === 'contextmenu') {
      // Revert move
      // console.warn('[CheckerBox Component] props.checkerBox', props.checkerBox)

      const checkers = props.checkerBox.checkers
      if (checkers.length === 0) {
        return console.error('No move to revert')
      }
      const checkerToRevert = checkers[checkers.length - 1] || undefined
      console.log('[Revert]: double-click on checkerbox')
      console.log('[Revert] checkerToRevert:', checkerToRevert)
      console.log('[Revert] activeTurn.moves', game.activeTurn.moves)
      const moveToRevert = game.activeTurn.moves.find(m => m.checker?.id === checkerToRevert.id)
      console.log('[Revert] moveToRevert', moveToRevert)
      const payload: MoveActionPayload = {
        player: activePlayer,
        checkerbox: props.checkerBox
      }
      try {
        revert(payload)
      } catch (e) {
        console.error(e)
      }
    }
  }

  // all of the "count" code is used to display the number of checkers when > 6 checkers on point
  const checkerCount = checkerBoxState.checkers.length
  let countDisplay: number | undefined = undefined
  checkerBoxState.checkers.forEach((c: CheckerType, i) => {
    if (i === 6 && props.checkerBox.position !== 'off' && props.checkerBox.position !== 'rail') {
      countDisplay = checkerCount
    }
    if (((typeof props.checkerBox.position === 'number' || props.checkerBox.position === 'rail') && i < 6) || props.checkerBox.position === 'off') {
      // FIXME: losing checker id in some revert situations
      checkers.push(<Checker checker={c} key={c.id ? c.id : generateId()} count={countDisplay} />)
    }
  })


  return <div onClick={handleClick} onContextMenu={handleClick}>
    {checkers}
  </div>
}

export default CheckerBox