import { produce } from 'immer'
import { GameError, CheckerBox, MoveType, DieValue, isDieValue } from '../../models'
import { GameState } from '../types/game.state'
import { GameAction } from '../types/game.action'

export const reducer = (state: GameState, action: GameAction): GameState => {
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