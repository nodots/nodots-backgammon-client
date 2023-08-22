import { produce } from 'immer'
import { isPlayer } from '../../components/Player/state/types/player'
import { isColor, CHECKERS_PER_PLAYER } from '../game'
import { GameError } from '../game'
import { Move, isCheckerInTurn } from '../move'
import { Turn } from '../turn'
import { Checker } from '../../components/Checker/state'
import { MoveMode, POINT_COUNT } from '../../components/Board/state'
import { MoveStatus, isCheckerBox, CheckerBox } from '../../components/CheckerBox/state'
import { getBearOffQuadrantLocation } from '../../components/Player/state'
import { getCheckerBoxes } from '../../components/Board/state'
import { getHomeQuadrantLocation } from '../../components/Player/state/types/player'
import { isBoard } from '../../components/Board/state/types/board'

export const reducer = (state: Turn, origin: CheckerBox): Move => {
  // FIXME
  console.log('[Move Reducer] state.moves', state.moves)
  let activeMove = state.moves.find((m: Move) => (m.status === MoveStatus.INITIALIZED)) as Move
  if (!isBoard(state.board)) {
    console.log(state.board)
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid board'
    })
  }
  if (!isPlayer(state.player)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid player'
    })
  }
  const activePlayer = state.player
  if (!isColor(activePlayer.color)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid color'
    })
  }

  const bearOffQuadrantLocation = getBearOffQuadrantLocation(activePlayer.moveDirection)
  const bearOffQuadrant = state.board?.quadrants.find(q => q.location === bearOffQuadrantLocation)
  if (bearOffQuadrant === undefined) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid color'
    })
  }
  let checkerToMove: Checker | undefined = undefined
  let moveMode: MoveMode | undefined = undefined
  let destination: CheckerBox | undefined = undefined
  let revertOrigin: CheckerBox | undefined = undefined
  let revertDestination: CheckerBox | undefined = undefined

  if (!activeMove) {
    console.error('No more moves')
  } else {
    if (!isCheckerBox(origin)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No origin checkerbox'
      })
    }
    checkerToMove = origin.checkers[origin.checkers.length - 1]
    let totalHomeboardCheckers = state.board?.off[activePlayer.color].checkers.length || 0
    bearOffQuadrant.points.forEach(p => {
      if (p.checkers.length > 0 && p.checkers[0].color === activePlayer.color) {
        totalHomeboardCheckers += p.checkers.length
      }
    })

    if (origin.checkers.length > 0 && origin.checkers[0].color !== activePlayer.color) {
      // noop
      console.error('Not your checker')
    } else if (totalHomeboardCheckers === CHECKERS_PER_PLAYER) {
      moveMode = MoveMode.BEAR_OFF
      destination = state.board.off[activePlayer.color]
    } else if (typeof origin.position === 'number') {
      const destinationPosition =
        activePlayer.moveDirection === 'clockwise'
          ? origin.position + activeMove.dieValue
          : origin.position - activeMove.dieValue
      destination = getCheckerBoxes(state.board).find((cb: CheckerBox) => cb.position === destinationPosition)
      if (!isCheckerBox(destination)) {
        throw new GameError({
          model: 'Move',
          errorMessage: `No destination position from ${origin.position} with ${activeMove.dieValue}`
        })
      }
      if (
        destination.checkers.length === 0 ||
        (
          destination.checkers.length >= 1 &&
          destination.checkers[0].color === activePlayer.color
        )
      ) {
        moveMode = MoveMode.POINT_TO_POINT
      } else if (
        destination.checkers.length === 1 &&
        destination.checkers[0].color !== activePlayer.color
      ) {
        moveMode = MoveMode.HIT
      } else {
        console.log(origin)
        console.log(destination)
        console.log(activeMove)
        console.log(activePlayer)
      }
      if (moveMode === undefined) {
        moveMode = MoveMode.NO_MOVE
      }
    } else {
      if (origin.position === 'rail') {
        if (activeMove === undefined) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No activeMove'
          })
        }
        const homeQuadrantLocation = getHomeQuadrantLocation(activePlayer.moveDirection)
        const homeQuadrant = state.board.quadrants.find(q => q.location === homeQuadrantLocation)
        if (homeQuadrant === undefined) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No homeQuadrant'
          })
        }
        // FIXME
        const am = activeMove as Move
        if (activePlayer.moveDirection === 'counterclockwise') {
          destination = homeQuadrant.points.find(p => p.position === POINT_COUNT - am.dieValue + 1)
        } else {
          destination = homeQuadrant.points.find(p => p.position === am.dieValue)
        }
        if (destination === undefined) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No destination'
          })
        }
        moveMode = MoveMode.REENTER
      } else {
        moveMode = MoveMode.ERROR
      }
    }

    return produce(activeMove, draft => {
      if (moveMode === undefined) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No moveMode'
        })
      }
      console.log('[Game Reducer] moveMode:', MoveMode[moveMode])
      let moveStatus = MoveStatus.COMPLETED
      if (moveMode === MoveMode.REVERT) {
        moveStatus = MoveStatus.REVERTED
        if (!revertOrigin) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No revertOrigin'
          })
        }
        if (!revertDestination) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No revertDestination'
          })
        }
        origin = revertOrigin
        destination = revertDestination
      }

      draft.origin = origin
      draft.destination = destination
      draft.mode = moveMode
      draft.checker = checkerToMove
      draft.status = moveStatus
    })


  }
  return activeMove
}