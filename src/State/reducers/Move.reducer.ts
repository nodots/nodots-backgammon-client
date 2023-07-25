import { produce } from 'immer'
import { GameError, CheckerBox, MoveType, DieValue } from '../../Models'
import { GameState } from '../types/GameState'
import { GameAction } from '../types/GameAction'

export const reducer = (state: GameState, action: GameAction): GameState => {
  const { payload } = action
  let newState: GameState = state
  const activePlayer = state.players[state.activeColor]

  if (!activePlayer) {
    throw new GameError({ model: 'Game', errorMessage: 'No activePlayer' })
  }
  if (!state.dice[state.activeColor][0].value || !state.dice[state.activeColor][1].value) {
    // throw new GameError({ model: 'Move', errorMessage: 'NO_DICE' })
    alert('Need to roll your dice: YOU WILL SEE THIS MESSAGE TWICE IN DEV')
    return state
  }

  const diceRoll: DieValue[] = [
    state.dice[state.activeColor][0].value as DieValue,
    state.dice[state.activeColor][1].value as DieValue
  ]

  if (!state.activeMove.checkers[0].origin) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting checkers[0] origin')
    }

    newState = produce(state, draft => {
      draft.activeMove.color = state.activeColor
      draft.activeMove.checkers[0].origin = payload
      draft.activeMove.checkers[0].completed = false
    })
    return newState
  } else if (state.activeMove.checkers[0].origin &&
    !state.activeMove.checkers[0].destination
  ) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting checkers[0] destination')
    }
    newState = produce(state, draft => {
      draft.activeMove.checkers[0].destination = payload
      const origin = state.activeMove.checkers[0].origin as CheckerBox
      const destination = payload
      let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
      try {
        console.log(`[Game Reducer] STATE state.dice[state.activeColor]: ${state.dice[state.activeColor]}`)
        moveResults = activePlayer.move({ origin, destination, roll: diceRoll })
        console.log(`[Game Reducer] moveResults:`, moveResults)

      } catch (e: any) {
        alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
        newState = produce(state, draft => {
          draft.activeMove.checkers[0].origin = undefined
          draft.activeMove.checkers[0].destination = undefined
        })
        return newState
      }
      if (!moveResults) {
        throw new GameError({ model: 'Move', errorMessage: 'No moveResults' })
      }
      if (state.debug.isActive) {
        console.log(`[Game Reducer] moveResults: `)
        console.log(moveResults)
      }

      const movePayload: MoveType = {
        board: state.board,
        origin: moveResults.origin,
        destination: moveResults.destination,
        checker: state.activeMove.checkers[0],
        completed: false
      }
      const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload, state.debug.isActive)

      draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
        = moveResults.origin
      draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
        = moveResults.destination
      draft.activeMove.checkers[0].completed = true

    })
    return newState
  } else if (!state.activeMove.checkers[1].origin) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting checkers[1] origin')
    }
    newState = produce(state, draft => {
      draft.activeMove.color = state.activeColor
      draft.activeMove.checkers[1].origin = payload
      draft.activeMove.checkers[1].completed = false
    })
    return newState
  } else if (state.activeMove.checkers[1].origin && !state.activeMove.checkers[1].destination) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting checkers[1] destination')
    }
    newState = produce(state, draft => {
      draft.activeMove.checkers[1].destination = payload
      const origin = state.activeMove.checkers[1].origin as CheckerBox
      const destination = payload
      let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
      try {
        moveResults = activePlayer.move({ origin, destination, roll: diceRoll })
        if (state.debug.isActive) {
          console.log(`[Game Reducer] moveResults:`, moveResults)
        }
      } catch (e: any) {
        return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
      }
      if (!moveResults) {
        throw new GameError({ model: 'Move', errorMessage: 'No moveResults' })
      }
      if (state.debug.isActive) {
        console.log('[Game Reducer] moveResults:', moveResults)
      }

      const movePayload: MoveType = {
        board: state.board,
        origin: moveResults.origin,
        destination: moveResults.destination,
        checker: state.activeMove.checkers[1],
        completed: false
      }
      const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload)

      draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
        = moveResults.origin
      draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
        = moveResults.destination
      draft.activeMove.checkers[1].completed = true

    })
    return newState

  }
  return state
}

const moveChecker = (move: MoveType, debug?: boolean) => {
  const originPoint = move.board.getCheckerBoxContainer(move.origin.id)
  if (!originPoint) {
    throw new GameError({ model: 'Move', errorMessage: `No origin point` })
  }
  const originQuadrant = move.board.getPointContainer(originPoint.id)
  if (!originQuadrant) {
    throw new GameError({ model: 'Move', errorMessage: 'No origin quadrant' })
  }
  const destinationPoint = move.board.getCheckerBoxContainer(move.destination.id)
  if (!destinationPoint) {
    throw new GameError({ model: 'Move', errorMessage: `No destinationPoint` })
  }
  const destinationQuadrant = move.board.getPointContainer(destinationPoint.id)
  if (!destinationQuadrant) {
    throw new GameError({ model: 'Move', errorMessage: `No destination Quadrant` })
  }
  const originQuadrantIndex = move.board.quadrants.findIndex(q => q.id === originQuadrant.id)
  const originPointIndex = originQuadrant.points.findIndex(p => p.id === originPoint.id)

  const destinationQuadrantIndex = move.board.quadrants.findIndex(q => q.id === destinationQuadrant.id)
  const destinationPointIndex = destinationQuadrant.points.findIndex(p => p.id === destinationPoint.id)

  if (debug) {
    console.log('[Game Reducer] MOVE RESULTS:')
    console.log(`[Game Reducer] originQuadrantIndex = ${originQuadrantIndex}`)
    console.log(`[Game Reducer] originPointIndex = ${originPointIndex}`)
    console.log(`[Game Reducer] destinationQuadrantIndex = ${destinationQuadrantIndex}`)
    console.log(`[Game Reducer] destinationPointIndex = ${destinationPointIndex}`)
  }
  return { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex }
}