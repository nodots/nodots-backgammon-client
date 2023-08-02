import { produce } from 'immer'
import { GameError, CheckerBox, MoveType, DieValue } from '../../models'
import { GameState } from '../types/game.state'
import { GameAction } from '../types/game.action'
import { MOVE_STATUS } from '../game.state'

export const reducer = (state: GameState, action: GameAction): GameState => {
  const { payload } = action
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

  if (!state.activeTurn.moves[0].origin) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting checkers[0] origin')
    }

    const newState = produce(state, draft => {
      draft.activeTurn.color = state.activeColor
      draft.activeTurn.moves[0].origin = payload
      draft.activeTurn.moves[0].completed = false
    })
    return newState
  } else if (state.activeTurn.moves[0].origin &&
    !state.activeTurn.moves[0].destination
  ) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting checkers[0] destination')
    }
    const newState = produce(state, draft => {
      draft.activeTurn.moves[0].destination = payload
      const origin = state.activeTurn.moves[0].origin as CheckerBox
      const destination = payload
      let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
      try {
        console.log(`[Game Reducer] STATE state.dice[state.activeColor]: ${state.dice[state.activeColor]}`)
        moveResults = activePlayer.move({ origin, destination, roll: diceRoll })
        console.log(`[Game Reducer] moveResults:`, moveResults)

      } catch (e: any) {
        alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
        const newState = produce(state, draft => {
          draft.activeTurn.moves[0].origin = undefined
          draft.activeTurn.moves[0].destination = undefined
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
        checker: state.activeTurn.moves[0],
        completed: false
      }
      const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload, state.debug.isActive)

      draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
        = moveResults.origin
      draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
        = moveResults.destination
      draft.activeTurn.moves[0].completed = true

    })
    return newState
  } else if (!state.activeTurn.moves[1].origin) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting moves[1] origin')
    }
    const newState = produce(state, draft => {
      draft.activeTurn.color = state.activeColor
      draft.activeTurn.moves[1].origin = payload
      draft.activeTurn.moves[1].completed = false
    })
    return newState
  } else if (state.activeTurn.moves[1].origin && !state.activeTurn.moves[1].destination) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting moves[1] destination')
    }
    const newState = produce(state, draft => {
      draft.activeTurn.moves[1].destination = payload
      const origin = state.activeTurn.moves[1].origin as CheckerBox
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
        checker: state.activeTurn.moves[1],
        completed: false
      }
      const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload)

      draft.activeTurn.status = MOVE_STATUS.DESTINATION_SET
      draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
        = moveResults.origin
      draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
        = moveResults.destination
      draft.activeTurn.moves[1].completed = true

    })
    console.log(newState.activeTurn.status)
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
    console.log('[Move Reducer] MOVE RESULTS:')
    console.log(`[Move Reducer] originQuadrantIndex = ${originQuadrantIndex}`)
    console.log(`[Move Reducer] originPointIndex = ${originPointIndex}`)
    console.log(`[Move Reducer] destinationQuadrantIndex = ${destinationQuadrantIndex}`)
    console.log(`[Move Reducer] destinationPointIndex = ${destinationPointIndex}`)
  }
  return { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex }
}