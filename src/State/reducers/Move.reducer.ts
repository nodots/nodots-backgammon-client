import { produce } from 'immer'
import { GameError, CheckerBox, MoveType, DieValue, isDieValue } from '../../models'
import { GameState } from '../types/game.state'
import { GameAction } from '../types/game.action'
import { Roll } from '../../models/Turn'

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

  let diceRoll: Roll
  // FIXME: Why is compiler not picking up upn type guard?
  if (isDieValue(state.dice[state.activeColor][0].value) ||
    isDieValue(state.dice[state.activeColor][1].value)
  ) {
    diceRoll = [state.dice[state.activeColor][0].value as DieValue, state.dice[state.activeColor][1].value as DieValue]
  }
  else {
    throw new GameError({ model: 'Move', errorMessage: 'Invalid die values' })
  }


  if (!state.activeTurn.moves[0].origin) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting checkers[0] origin')
    }

    const newState = produce(state, draft => {
      draft.activeTurn.roll = diceRoll
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

      // const origin = state.activeTurn.moves[0].origin as CheckerBox
      // const destination = payload
      let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
      try {
        console.log(`[Game Reducer] STATE state.dice[state.activeColor]: ${state.dice[state.activeColor]}`)
        // moveResults = activePlayer.move({ origin, destination, roll: diceRoll })
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

      // const movePayload: MoveType = {
      //   board: state.board,
      //   origin: moveResults.origin,
      //   destination: moveResults.destination,
      //   checker: state.activeTurn.moves[0],
      //   completed: false
      // }
      // const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload, state.debug.isActive)

      // draft.board.quadrants[originQuadrantIndex].points[originPointIndex]
      //   = moveResults.origin
      // draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
      //   = moveResults.destination
      // draft.activeTurn.moves[0].completed = true

    })
    return newState
  } else if (!state.activeTurn.moves[1].origin) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting moves[1] origin')
    }
    const newState = produce(state, draft => {
      draft.activeTurn.moves[1].origin = payload
      draft.activeTurn.moves[1].completed = false
    })
    return newState
  } else if (state.activeTurn.moves[1].origin && !state.activeTurn.moves[1].destination) {
    if (state.debug.isActive) {
      console.log('[Game Reducer] Setting moves[1] destination')
    }
    // const newState = produce(state, draft => {
    //   draft.activeTurn.moves[1].destination = payload
    //   const origin = state.activeTurn.moves[1].origin as CheckerBox
    //   const destination = payload
    //   let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
    //   try {
    //     moveResults = activePlayer.move({ origin, destination, roll: diceRoll })
    //     if (state.debug.isActive) {
    //       console.log(`[Game Reducer] moveResults:`, moveResults)
    //     }
    //   } catch (e: any) {
    //     return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
    //   }
    //   if (!moveResults) {
    //     throw new GameError({ model: 'Move', errorMessage: 'No moveResults' })
    //   }
    //   if (state.debug.isActive) {
    //     console.log('[Game Reducer] moveResults:', moveResults)
    //   }

    //   const movePayload: MoveType = {
    //     board: state.board,
    //     origin: moveResults.origin,
    //     destination: moveResults.destination,
    //     checker: state.activeTurn.moves[1],
    //     completed: false
    //   }
    //   const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload)

    //   // draft.activeTurn.status = TurnStatus.DESTINATION_SET


    //   // draft.board.quadrants[originQuadrantIndex].points[originPointIndex]
    //   //   = moveResults.origin
    //   // draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex]
    //   //   = moveResults.destination
    //   // draft.activeTurn.moves[1].completed = true

    // })
    return state

  }
  return state
}

const moveChecker = (move: MoveType, debug?: boolean) => {
  const originQuadrant = move.board.getPointContainer(move.origin.id)
  if (!originQuadrant) {
    throw new GameError({ model: 'Move', errorMessage: 'No origin quadrant' })
  }
  const destinationQuadrant = move.board.getPointContainer(move.destination.id)
  if (!destinationQuadrant) {
    throw new GameError({ model: 'Move', errorMessage: `No destination Quadrant` })
  }
  const originQuadrantIndex = move.board.quadrants.findIndex(q => q.id === originQuadrant.id)
  const originPointIndex = move.board.points.findIndex(p => p.id === move.origin.id)

  const destinationQuadrantIndex = move.board.quadrants.findIndex(q => q.id === destinationQuadrant.id)
  const destinationPointIndex = move.board.points.findIndex(p => p.id === move.destination.id)

  if (debug) {
    console.log('[Move Reducer] MOVE RESULTS:')
    console.log(`[Move Reducer] originQuadrantIndex = ${originQuadrantIndex}`)
    console.log(`[Move Reducer] originPointIndex = ${originPointIndex}`)
    console.log(`[Move Reducer] destinationQuadrantIndex = ${destinationQuadrantIndex}`)
    console.log(`[Move Reducer] destinationPointIndex = ${destinationPointIndex}`)
  }
  return { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex }
}