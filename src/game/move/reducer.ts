import { produce } from 'immer'
import { Player, isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { isColor, CHECKERS_PER_PLAYER } from '../game'
import { GameError } from '../game'
import { Move } from '../move'
import { Rail, isRail } from '../../components/Rail/state/types'
import { Turn, isTurn } from '../turn'
import { Checker, isChecker } from '../../components/Checker/state'
import { MoveMode, POINT_COUNT } from '../../components/Board/state'
import { MoveStatus, isCheckerBox, CheckerBox } from '../../components/CheckerBox/state'
import { getBearOffQuadrantLocation } from '../../components/Player/state'
import { getCheckerBoxes } from '../../components/Board/state'
import { getHomeQuadrantLocation } from '../../components/Player/state/types/player'
import { isBoard } from '../../components/Board/state/types/board'
import { QuadrantLocation } from '../../components/Quadrant/state'

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
  let destination: CheckerBox | undefined = undefined
  let revertOrigin: CheckerBox | undefined = undefined
  let revertDestination: CheckerBox | undefined = undefined

  const moveMode = getMoveMode(state, activeMove.dieValue, origin)
  console.log('LINE 57 moveMode', MoveMode[moveMode])
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
      destination = state.board.off[activePlayer.color]
    } else if (typeof origin.position === 'number') {
      const destinationPosition =
        activePlayer.moveDirection === 'clockwise'
          ? origin.position + activeMove.dieValue
          : origin.position - activeMove.dieValue
      destination = getCheckerBoxes(state.board).find((cb: CheckerBox) => cb.position === destinationPosition)
      const homeQuadrantLocation = getHomeQuadrantLocation(activePlayer.moveDirection)
      const homeQuadrant = state.board.quadrants.find(q => q.location === homeQuadrantLocation)
      if (homeQuadrant === undefined) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No homeQuadrant'
        })
      }
      if (destination === undefined) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No destination'
        })
      }
    }

    return produce(activeMove, draft => {
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


function getMoveMode (turn: Turn, dieValue: DieValue, origin: CheckerBox): MoveMode {
  let moveMode: MoveMode | undefined = undefined
  if (dieValue === undefined) {
    console.error('You need to roll first')
  }
  console.log('getMoveMode turn', turn)
  console.log('getMoveMode dieValue', dieValue)
  console.log('getMoveMode origin', origin)

  if (!isTurn(turn)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid turn'
    })
  }

  if (!isBoard(turn.board)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid board'
    })
  }

  if (!isPlayer(turn.player)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid player'
    })
  }

  if (!isCheckerBox(origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid origin'
    })
  }

  let totalBearOffCheckers = turn.board.off[turn.player.color].checkers.length
  const bearOffQuadrantLocation = getBearOffQuadrantLocation(turn.player.moveDirection)
  const bearOffQuadrant = turn.board.quadrants.find(q => q.location === bearOffQuadrantLocation)
  if (bearOffQuadrant === undefined) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid bear-off quadrant'
    })
  }
  bearOffQuadrant.points.forEach(p => {
    if (p.checkers.length > 0 && p.checkers[0].color === turn.player?.color) {
      totalBearOffCheckers += p.checkers.length
    }
  })

  const homeQuadrantLocation = getHomeQuadrantLocation(turn.player.moveDirection)
  const homeQuadrant = turn.board.quadrants.find(q => q.location === homeQuadrantLocation)

  if (homeQuadrant === undefined) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid homeQuadrant'
    })
  }

  if (origin.position === 'rail') {
    homeQuadrant.points.forEach(p => {
      let reentryPosition = dieValue as number
      if (homeQuadrantLocation === QuadrantLocation.NE) {
        reentryPosition = POINT_COUNT - (dieValue as number) + 1 as number
      }

      if (
        // No checkers in target--reenter
        (p.position === reentryPosition && p.checkers.length === 0) ||
        // Only our checkers in target--reenter
        (p.position === reentryPosition && p.checkers.length > 0 && isPlayer(turn.player) && p.checkers[0].color === turn.player.color)
      ) {
        moveMode = MoveMode.REENTER
      } else if (p.position === reentryPosition && p.checkers.length === 1 && isPlayer(turn.player) && p.checkers[0].color === turn.player.color) {
        console.log('RETURNING REENTER_HIT')
        moveMode = MoveMode.REENTER_HIT
      } else {
        moveMode = MoveMode.NO_MOVE
      }
    })
  } else if (totalBearOffCheckers === CHECKERS_PER_PLAYER) {
    bearOffQuadrant.points.forEach(p => {
      let bearOffPosition = p.position
      if (bearOffQuadrantLocation === QuadrantLocation.NE) {
        bearOffPosition = POINT_COUNT - (dieValue as number) + 1 as number
      }
      const bearOffPoint = bearOffQuadrant.points.find(p => p.position === bearOffPosition)
      if (bearOffPoint === undefined) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Invalid bearOffPoint'
        })
      }
      if (bearOffPoint.checkers.length > 0) {
        moveMode = MoveMode.BEAR_OFF
      }
    })
  } else {
    const points = getCheckerBoxes(turn.board).filter(cb => typeof cb.position === 'number')

    let newPosition = origin.position as number + dieValue as number
    if (turn.player.moveDirection === 'counterclockwise') {
      newPosition = origin.position as number - dieValue as number
    }
    const possiblePoint = points.find(p => p.position === newPosition)

    if (!possiblePoint) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Invalid point'
      })
    }

    if (
      // No checkers, point to point
      (possiblePoint.checkers.length === 0) ||
      // Only player's checkers, point to point
      (
        possiblePoint.checkers.length > 0 &&
        possiblePoint.checkers[0].color === turn.player.color
      )
    ) {
      moveMode = MoveMode.POINT_TO_POINT
    } else if (
      // Single opponent's checker, hit it
      possiblePoint.checkers.length === 1 &&
      possiblePoint.checkers[0].color !== turn.player.color
    ) {
      moveMode = MoveMode.HIT
    } else if (
      possiblePoint.checkers.length > 1 &&
      possiblePoint.checkers[0].color !== turn.player.color
    ) {
      moveMode = MoveMode.NO_MOVE
    } else {
      moveMode = MoveMode.ERROR

    }

    return moveMode

  }
  return MoveMode.ERROR
}
