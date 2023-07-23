import { produce } from 'immer'
import { CheckerBox, Cube, Die, CubeValue, GameError, MAX_CUBE_VALUE, MoveType, Color } from '../Models'
import { GameState, GameAction, GAME_ACTION_TYPE } from './Game.State'
export const reducer = (state: GameState, action: GameAction): GameState => {
  const { type, payload } = action
  let newState: GameState | undefined

  switch (type) {
    case GAME_ACTION_TYPE.ROLL:
      newState = undefined
      if (state.debug) {
        console.log('[Game Reducer] ROLL')
      }
      if (!state.activeColor) {
        throw new GameError({ model: 'Game', errorMessage: 'fooobar' })
      }
      newState = produce(state, draft => {
        const payloadColor = payload.color as Color
        console.log(`[Game Reducer] ROLL state.dice[${payloadColor}, ${payload.order}]:`, state.dice[payloadColor][payload.order])
        draft.dice[payloadColor][payload.order].value = Die.roll()
      })
      console.log('[Game Reducer] newState dice', newState.dice)
      return newState
    case GAME_ACTION_TYPE.TOGGLE:
      newState = undefined
      console.log(`[Game Reducer] TOGGLE ${new Date().toTimeString()}:`)
      console.error('[Game Reducer] TOGGLE not yet implemented')
      return state
    // MOVE needs to be refactored, likely to it's own state/reducer
    case GAME_ACTION_TYPE.MOVE:
      newState = undefined
      const activePlayer = state.players[state.activeColor]

      if (!activePlayer) {
        throw new GameError({ model: 'Game', errorMessage: 'No activePlayer' })
      }

      if (!state.activeMove.checkers[0].origin) {
        if (state.debug) {
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
        if (state.debug) {
          console.log('[Game Reducer] Setting checkers[0] destination')
        }
        newState = produce(state, draft => {
          draft.activeMove.checkers[0].destination = payload
          const origin = state.activeMove.checkers[0].origin as CheckerBox
          const destination = payload
          let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
          try {
            moveResults = activePlayer.move({ origin, destination, roll: [1, 1] })
            console.log(`[Game Reducer] moveResults:`, moveResults)

          } catch (e: any) {
            return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
          }
          if (!moveResults) {
            throw new GameError({ model: 'Move', errorMessage: 'No moveResults' })
          }
          if (state.debug) {
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
          const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload, state.debug)

          draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
            = moveResults.origin
          draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
            = moveResults.destination
          draft.activeMove.checkers[0].completed = true

        })
        return newState
      } else if (!state.activeMove.checkers[1].origin) {
        if (state.debug) {
          console.log('[Game Reducer] Setting checkers[1] origin')
        }
        newState = produce(state, draft => {
          draft.activeMove.color = state.activeColor
          draft.activeMove.checkers[1].origin = payload
          draft.activeMove.checkers[1].completed = false
        })
        return newState
      } else if (state.activeMove.checkers[1].origin && !state.activeMove.checkers[1].destination) {
        if (state.debug) {
          console.log('[Game Reducer] Setting checkers[1] destination')
        }
        newState = produce(state, draft => {
          draft.activeMove.checkers[1].destination = payload
          const origin = state.activeMove.checkers[1].origin as CheckerBox
          const destination = payload
          let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
          try {
            moveResults = activePlayer.move({ origin, destination, roll: [1, 1] })
            if (state.debug) {
              console.log(`[Game Reducer] moveResults:`, moveResults)
            }
          } catch (e: any) {
            return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
          }
          if (!moveResults) {
            throw new GameError({ model: 'Move', errorMessage: 'No moveResults' })
          }
          if (state.debug) {
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
    case GAME_ACTION_TYPE.FINALIZE_MOVE:
      if (state.debug) {
        console.log('[Game Reducer] FINALIZE_MOVE')
      }
      newState = produce(state, draft => {
        if (state.activeColor === 'black') {
          draft.activeColor = 'white'
          draft.players.white.active = true
        } else if (state.activeColor === 'white') {
          draft.activeColor = 'black'
          draft.players.black.active = true
        } else {
          throw new GameError({ model: 'Player', errorMessage: 'There is no active player' })
        }
        draft.activeMove.checkers[0].origin = undefined
        draft.activeMove.checkers[0].destination = undefined
        draft.activeMove.checkers[1].origin = undefined
        draft.activeMove.checkers[1].destination = undefined

      })
      if (state.debug) {
        console.log('[Game Reducer] FINALIZE_MOVE newState:', newState)
      }

      return newState
    case GAME_ACTION_TYPE.DOUBLE:
      newState = undefined
      newState = produce(state, draft => {
        console.log(`[Game Reducer] DOUBLE state:`, state.cube)
        console.log(`[Game Reducer] DOUBLE draft:`, draft.cube)
        draft.cube.value = Cube.double(state.cube.value)
      })
      return newState
    default:
      throw new GameError({ model: 'Game', errorMessage: `Unkown action type ${type}` })
  }
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