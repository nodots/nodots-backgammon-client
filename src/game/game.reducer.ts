import { produce } from 'immer'
import { Game, GameError, Color } from './game'
import { Board } from '../components/Board/state'
import { CheckerBox } from '../components/CheckerBox/state/types'
import { reducer as diceReducer } from '../components/Die/state/'
import { reducer as cubeReducer } from '../components/Cube/state/'
import { MoveStatus } from '../components/CheckerBox/state/'
import { Move } from '../components/CheckerBox/state/'
import { turnReducer } from '../components/Player/state/reducers'
import { Checker } from '../components/Checker/state'
import { TurnStatus } from '../components/Player/state/types'
import { QuadrantLocation } from '../components/Quadrant/state/types'

export enum GAME_ACTION_TYPE {
  SET_DICE_VALUES,
  SET_CUBE_VALUE,
  INITIALIZE_TURN,
  FINALIZE_TURN,
  MOVE
}

export const reducer = (state: Game, action: any): Game => {
  const { type, payload } = action
  if (!state.activeColor) {
    throw new GameError({ model: 'Move', errorMessage: 'No active color' })
  }
  console.log('[Game Context] reducer params state', state)
  console.log('[Game Context] reducer params action.type', type)
  console.log('[Game Context] reducer params action.payload', payload)
  switch (type) {
    case GAME_ACTION_TYPE.SET_CUBE_VALUE:
      const newCube = cubeReducer(state.cube, action)
      const newCubeState = produce(state, draft => {
        draft.cube = newCube
      })
      return newCubeState
    case GAME_ACTION_TYPE.SET_DICE_VALUES:
      const newDice = diceReducer(state.dice, action)
      return produce(state, draft => {
        draft.dice = newDice
      })
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      const newTurn = turnReducer(state.activeTurn, action)
      return produce(state, draft => {
        draft.activeTurn = newTurn
      })
    case GAME_ACTION_TYPE.FINALIZE_TURN:
      console.log('GAME_ACTION_TYPE.FINALIZE_TURN')
      return produce(state, draft => {
        console.log(state.activeColor)
        // FIXME: typeguard
        const activeColor = state.activeColor as Color
        const inActiveColor = activeColor === 'white' ? 'black' : 'white'
        console.log(inActiveColor)

        draft.players[activeColor].active = false
        draft.players[inActiveColor].active = true
        draft.activeColor = inActiveColor

        draft.activeTurn.status = undefined
        draft.activeTurn.id = undefined
        draft.activeTurn.roll = undefined
        draft.activeTurn.moves = []

        console.log(draft.activeColor)
        console.log(draft.players)
        console.log(draft.activeTurn)

      })
    case GAME_ACTION_TYPE.MOVE:
      // FIXME: Move all of this stuff to move reducer
      let activeMoveIndex = state.activeTurn.moves.findIndex(m => m.status !== MoveStatus.COMPLETED)
      let activeMove = state.activeTurn.moves[activeMoveIndex]
      console.log('[ActiveMove] activeMove:', activeMove)
      state.activeTurn.moves.forEach((m, i) => {
        console.log(`state.activeTurn.moves[${i}].status:`, MoveStatus[state.activeTurn.moves[i].status])
      })
      if (activeMoveIndex === -1) {
        console.error('No more moves')
      } else {
        // Always set the origin if it isn't set
        if (!activeMove.origin) {
          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex].origin = payload.checkerbox
            draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.ORIGIN_SET
            draft.activeTurn.status = TurnStatus.IN_PROGRESS
          })
        } else if (!activeMove.destination) {
          const newMove = produce(activeMove, draft => {
            draft.destination = payload.checkerbox
            draft.status = MoveStatus.DESTINATION_SET
          })
          const newBoard = updateBoard(state.board, newMove)
          console.log(newBoard)
          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex] = newMove
            draft.activeTurn.status = TurnStatus.IN_PROGRESS
            draft.board = newBoard
          })
        } else if (activeMove.destination && activeMove.status === MoveStatus.DESTINATION_SET) {
          // Mark current move active

          const priorMove = produce(activeMove, draft => {
            draft.status = MoveStatus.COMPLETED
          })
          // and move to the next
          activeMoveIndex++
          activeMove = state.activeTurn.moves[activeMoveIndex]

          const newMove = produce(activeMove, draft => {
            draft.origin = payload.checkerbox
            draft.status = MoveStatus.ORIGIN_SET
          })

          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex - 1] = priorMove
            draft.activeTurn.moves[activeMoveIndex] = newMove
          })
        } else if (!activeMove.destination && activeMove.status === MoveStatus.ORIGIN_SET) {
          const newMove = produce(activeMove, draft => {
            draft.destination = payload.checkerbox
            draft.status = MoveStatus.DESTINATION_SET
          })
          const newBoard = updateBoard(state.board, newMove)
          return produce(state, draft => {
            draft.activeTurn.moves[activeMoveIndex] = newMove
            draft.board = newBoard
          })
        }

        // if (!activeMove.origin) {
        //   console.log('[ActiveMove] Step 1: Set origin of first move')
        //   return produce(state, draft => {
        //     draft.activeTurn.moves[activeMoveIndex].origin = payload.checkerbox
        //     draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.ORIGIN_SET
        //     draft.activeTurn.status = TurnStatus.FIRST_CHECKER_ORIGIN_SET
        //   })
        // } else if (activeMove.origin && activeMove.status === MoveStatus.ORIGIN_SET) {
        //   console.log('[ActiveMove] Step 2: Set destination of first move and update board')
        //   const updatedMove = updateMove(activeMove, payload.checkerbox)
        //   const updatedBoard = updateBoard(state.board, updatedMove)
        //   return produce(state, draft => {
        //     draft.activeTurn.moves[activeMoveIndex].destination = updatedMove.destination
        //     draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.DESTINATION_SET
        //     draft.activeTurn.status = TurnStatus.FIRST_CHECKER_DESTINATION_SET
        //     draft.board = updatedBoard
        //   })
        // } else {
        //   console.log('[ActiveMove] activeMoveIndex', activeMoveIndex)
        //   console.log('[ActiveMove] activeMoveStatus', MoveStatus[activeMove.status])
        //   console.log('[ActiveMove] state.activeTurn', state.activeTurn)
        //   console.log('[ActiveMove] activeTurnStatus', state.activeTurn.status)
        //   if (state.activeTurn.moves[activeMoveIndex].status === MoveStatus.DESTINATION_SET) {
        //     const updatedMove = updateMove(activeMove, payload.checkerbox)
        //     const updatedBoard = updateBoard(state.board, updatedMove)
        //     return produce(state, draft => {
        //       draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.COMPLETED
        //       activeMoveIndex++
        //       draft.activeTurn.moves[activeMoveIndex].origin = updatedMove.origin
        //       draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.ORIGIN_SET
        //       draft.activeTurn.status =
        //         draft.board = updatedBoard
        //     })


        //   }


        // }
      }
      return state
    default:
      return state
  }

  // function updateMove (move: Move, checkerbox: CheckerBox): Move {
  //   // let originCheckers: Checker[] = []
  //   // let destinationCheckers = Checker[] = []
  //   if (move.status === MoveStatus.INITIALIZED) {
  //     console.warn('STEP 1: Set origin')
  //     return produce(move, draft => {
  //       draft.origin = checkerbox
  //     })
  //   }
  //   if (move.status === MoveStatus.ORIGIN_SET) {
  //     console.warn('STEP 1: Set destination')
  //     const originCheckers = move.origin?.checkers
  //     if (!originCheckers) {
  //       throw new GameError({
  //         model: 'Move',
  //         errorMessage: 'Missing origin checkers'
  //       })
  //     }
  //     const destinationCheckers = checkerbox.checkers
  //     const newOriginCheckers = produce(originCheckers, draft => {
  //       draft.splice(originCheckers.length - 1, 1)
  //     })
  //     const newDestinationCheckers = produce(destinationCheckers, draft => {
  //       const checkerToMove = originCheckers[originCheckers.length - 1]
  //       draft.push(checkerToMove)
  //     })
  //     const origin = produce(move.origin as CheckerBox, draft => {
  //       draft.checkers = newOriginCheckers
  //     })
  //     const destination = produce(checkerbox as CheckerBox, draft => {
  //       draft.checkers = newDestinationCheckers
  //     })
  //     return produce(move, draft => {
  //       draft.origin = origin
  //       draft.destination = destination
  //     })
  //   }
  //   return move
  // }

  function updateBoard (board: Board, move: Move): Board {
    console.log('[ActiveMove updateBoard] checkerboxes:', getCheckerBoxes(board))
    console.log('[ActiveMove updateBoard] move:', move)
    return produce(board, draft => {
      const checkerboxes = getCheckerBoxes(board)
      let checkerToMove: Checker | undefined = undefined
      // FIXME: typeguard
      const originInfo = getQuadrantAndPointIndexForCheckerbox(board, checkerboxes, move.origin?.id)
      const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, checkerboxes, move.destination?.id)
      console.log(originInfo)
      if (originInfo.quadrantIndex !== -1 && originInfo.pointIndex !== -1) {
        // FIXME: typeguard
        console.log(board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex].checkers)
        console.log(move.origin?.checkers)
        checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex].checkers[0]
        if (!checkerToMove) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No checker to move'
          })
        } else {
          // FIXME typeguard
          let ctm: Checker = checkerToMove as Checker
          const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
          const newOrigin = produce(oldOrigin, draft => {
            draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
          })
          const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
          const newDestination = produce(oldDestination, draft => {
            draft.checkers.push(ctm)
          })
          return produce(board, draft => {
            draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
            draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination
          })
        }
      } else {
        throw Error('No origin')
      }
    })
  }

  function getQuadrantAndPointIndexForCheckerbox (board: Board, checkerboxes: CheckerBox[], id: string | undefined) {
    console.log(board.quadrants)
    let quadrantIndex: number | undefined = undefined
    let pointIndex: number | undefined = undefined
    const checkerbox = checkerboxes.find(cb => cb.id === id)
    if (checkerbox) {
      if (typeof checkerbox.position === 'number') {
        console.log(checkerbox.position)
        const seIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.SE)
        console.log(seIndex)
        if (checkerbox.position >= 1 && checkerbox.position <= 6) {
          quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.SE)
        } else if (checkerbox.position >= 7 && checkerbox.position <= 12) {
          quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.SW)
        } else if (checkerbox.position >= 13 && checkerbox.position <= 18) {
          quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.NW)
        } else if (checkerbox.position >= 19 && checkerbox.position <= 24) {
          quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.NE)
        } else {
          console.log(checkerbox.position)
          throw new GameError({ model: 'Move', errorMessage: 'No quadrant' })
        }
      }
      if (!quadrantIndex) {
        throw Error('No quadrantIndex')
      }
      pointIndex = state.board.quadrants[quadrantIndex].points.findIndex(p => p.id === id)
    } else {
      throw Error('No origin checkerbox')
    }
    return { quadrantIndex, pointIndex }
  }

  function getCheckerBoxes (board: Board): CheckerBox[] {
    const checkerBoxes: CheckerBox[] = []
    board.quadrants.forEach(q => {
      checkerBoxes.push(...q.points)
    })
    checkerBoxes.push(board.off.white)
    checkerBoxes.push(board.off.black)
    checkerBoxes.push(board.rail.white)
    checkerBoxes.push(board.rail.black)
    return checkerBoxes
  }

  // function getMoveMode (origin: CheckerBox, destination: CheckerBox, activeColor: Color, dieValue: DieValue): MoveMode {
  //   if (origin.position === 'off') {
  //     throw new GameError({ model: 'Move', errorMessage: 'Cannot move from off' })
  //   }
  //   if (destination.position === 'rail') {
  //     throw new GameError({ model: 'Move', errorMessage: 'Cannot move to rail' })
  //   }
  //   if (typeof origin.position === 'number' && typeof destination.position === 'number') {
  //     const activePlayer = state.players[activeColor as Color]
  //     if (!activePlayer || !activePlayer.active) {
  //       throw new GameError({ model: 'Move', errorMessage: 'No active player' })
  //     }
  //     if (destination.checkers && destination.checkers.length > 1 && destination.checkers[0].color !== activeColor) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Destination is owned by opponent' })
  //     }
  //     if (destination.position === origin.position) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Origin and destination cannot be the same' })
  //     }
  //     if (activePlayer.moveDirection === 'clockwise' && destination.position < origin.position) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Player moves clockwise' })
  //     }
  //     if (activePlayer.moveDirection === 'counterclockwise' && destination.position > origin.position) {
  //       throw new GameError({ model: 'Move', errorMessage: 'Player moves counterclockwise' })
  //     }
  //     // if (Math.abs(origin.position - destination.position) !== dieValue) {
  //     //   throw new GameError({ model: 'Move', errorMessage: 'Move does not match die value' })
  //     // }
  //     if (destination.checkers && destination.checkers.length === 1 && destination.checkers[0].color !== activeColor) {
  //       return MoveMode.HIT
  //     } else {
  //       return MoveMode.POINT_TO_POINT
  //     }
  //   } else if (origin.position === 'rail' && typeof destination.position === 'number') {
  //     return MoveMode.REENTER
  //   } else if (destination.position === 'off') {
  //     return MoveMode.OFF
  //   } else {
  //     throw new GameError({ model: 'Move', errorMessage: 'Unknown MoveMode' })
  //   }
  // }
}


      //   } else if (state.activeTurn.moves[activeMoveIndex].status === MoveStatus.ORIGIN_SET
      //     && state.activeTurn.moves[activeMoveIndex].origin
      //   ) {
      //     console.warn(`STEP 2: SET MOVE DESTINATION AND MOVE CHECKER AND MOVE!`)
      //     if (state.activeTurn) {
      //       console.warn('TURN_STATUS: ', TurnStatus[state.activeTurn.status as TurnStatus])
      //     }
      //     const moveResults = updateMove(state.activeTurn.moves[activeMoveIndex], payload.checkerbox)
      //     const newMoveState = produce(state, draft => {
      //       draft.activeTurn.moves[activeMoveIndex].origin = moveResults.origin
      //       draft.activeTurn.moves[activeMoveIndex].destination = moveResults.destination
      //       draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.DESTINATION_SET
      //       draft.activeTurn.status = TurnStatus.IN_PROGRESS
      //     })

      //     const boardResults = updateBoard(state.board, newMoveState) {

      //     }

      //     const newBoardState = produce(newMoveState, draft => {
      //       const checkerboxes = getCheckerBoxes(draft.board)
      //       const originInfo = getQuadrantAndPointIndexForCheckerbox(state.board, checkerboxes, newMoveState.activeTurn.moves[activeMoveIndex].origin?.id)
      //       if (originInfo.quadrantIndex && originInfo.pointIndex) {
      //         draft.board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex].checkers = newOriginCheckers
      //       } else {
      //         throw Error('No origin')
      //       }
      //       const destinationInfo = getQuadrantAndPointIndexForCheckerbox(state.board, checkerboxes, newMoveState.activeTurn.moves[activeMoveIndex].destination?.id)
      //       if (destinationInfo.quadrantIndex && destinationInfo.pointIndex) {
      //         draft.board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex].checkers = newDestinationCheckers
      //       } else {
      //         throw Error('No destination')
      //       }
      //     })
      //     return newBoardState
      //   } else if (state.activeTurn.moves[activeMoveIndex].status === MoveStatus.DESTINATION_SET
      //     && state.activeTurn.moves[activeMoveIndex].destination) {
      //     console.warn('STEP 3: COMPLETE MOVE AND CHECK FOR NEXT MOVE')
      //     return produce(state, draft => {
      //       draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.COMPLETED
      //       activeMoveIndex++
      //       draft.activeTurn.moves[activeMoveIndex].origin = payload.checkerbox

      //       if (state.activeTurn.moves[activeMoveIndex]) {
      //         // draft.activeTurn.moves[activeMoveIndex].origin = payload
      //         if (state.activeTurn.moves[activeMoveIndex].status === MoveStatus.INITIALIZED) {
      //           console.warn('STEP 4: SET ORIGIN FOR SUBSEQUENT MOVE')
      //           draft.activeTurn.moves[activeMoveIndex].status = MoveStatus.ORIGIN_SET
      //         }
      //       } else {
      //         console.warn('STEP 5: SET TURN STATUS TO AWAITING_FINALIZATION')
      //         draft.activeTurn.status = TurnStatus.AWAITING_FINALIZATION
      //       }
      //     })
      //   } else {
      //     throw new GameError({ model: 'Move', errorMessage: 'No more moves left in turn' })
      //   }
      // }
