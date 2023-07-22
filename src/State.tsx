import { produce } from 'immer'
import { MoveType, Move } from './Models/Move'
import { ReactElement, createContext, useCallback, useContext, useReducer } from 'react'
import { Game, Board, Checker, Player, Die, Point, Rail, Off, Cube, CheckerBox, Color } from './Models'

type GameState = {
  name: string,
  board: Board,
  players: {
    white: Player,
    black: Player
  },
  dice: {
    white: [Die, Die],
    black: [Die, Die]
  },
  cube: Cube,
  activeMove: {
    color: Color | undefined
    checker1: {
      checker: 1,
      origin: CheckerBox | undefined,
      destination: CheckerBox | undefined
      completed: boolean | undefined

    },
    checker2: {
      checker: 2,
      origin: CheckerBox | undefined,
      destination: CheckerBox | undefined
      completed: boolean | undefined
    }
  },
  activeColor: Color,
  rename: (name: string) => any,
  roll: (color: Color) => any,
  move: (action: GameAction) => any,
  finalizeMove: (color: Color) => any,
  toggleActivePlayer: () => any,
  double: () => any,
  debug: boolean
}

const blackPlayer = new Player({ firstName: 'A', lastName: 'Robot', color: 'black' })
const whitePlayer = new Player({ firstName: 'Ken', lastName: 'Riley', color: 'white' })

const game = new Game({ whitePlayer: blackPlayer, blackPlayer: whitePlayer })
// FIXME: Overriding rollForStart for testing
//const winner = Game.rollForStart({ black: blackPlayer, white: whitePlayer })
const winner: Color = 'white'
let blackPlayerCopy = blackPlayer
let whitePlayerCopy = whitePlayer

// winner === 'black' ? blackPlayerCopy.active = true : whitePlayerCopy.active = true
whitePlayerCopy.active = true
const initPlayers = {
  white: whitePlayerCopy,
  black: blackPlayerCopy
}

const initGameState: GameState = {
  name: 'first name',
  board: game.board,
  players: initPlayers,
  cube: game.cube,
  dice: {
    white: [initPlayers.white.dice[0], initPlayers.white.dice[1]],
    black: [initPlayers.black.dice[0], initPlayers.black.dice[1]]
  },
  activeMove: {
    color: undefined,
    checker1: {
      checker: 1,
      origin: undefined,
      destination: undefined,
      completed: undefined,
    },
    checker2: {
      checker: 2,
      origin: undefined,
      destination: undefined,
      completed: undefined,
    }
  },
  activeColor: winner,
  rename: (name: string) => { },
  roll: (color: Color) => { },
  move: (action: GameAction) => { },
  finalizeMove: (color: Color) => { },
  double: () => { },
  toggleActivePlayer: () => { },
  debug: false
}

export const enum GAME_ACTION_TYPE {
  RENAME,
  MOVE,
  FINALIZE_MOVE,
  ROLL,
  ROLL_FOR_START,
  DOUBLE,
  RESIGN,
  TOGGLE
}

export type GameAction = {
  type: GAME_ACTION_TYPE,
  payload?: any
}

const reducer = (state: GameState, action: GameAction): GameState => {
  const { type, payload } = action
  let newState: GameState

  switch (type) {
    case GAME_ACTION_TYPE.RENAME:
      newState = produce(state, draft => {
        draft.name = payload
      })
      return newState
    case GAME_ACTION_TYPE.ROLL:
      console.log('[STATE] ROLL')
      if (!state.activeColor) {
        throw Error('No active color')
      }
      return state
    case GAME_ACTION_TYPE.TOGGLE:
      console.log(`[STATE] TOGGLE ${new Date().toTimeString()}:`)
      console.error('[STATE] TOGGLE not yet implemented')
      return state
    case GAME_ACTION_TYPE.MOVE:
      const activePlayer = state.players[state.activeColor]

      if (!activePlayer) {
        throw Error('No activePlayer')
      }

      if (!state.activeMove.checker1.origin) {
        console.log('Setting checker1 origin')

        newState = produce(state, draft => {
          draft.activeMove.color = state.activeColor
          draft.activeMove.checker1.origin = payload
          draft.activeMove.checker1.completed = false
        })
        return newState
      } else if (state.activeMove.checker1.origin &&
        !state.activeMove.checker1.destination
      ) {
        console.log('Setting checker1 destination')
        newState = produce(state, draft => {
          draft.activeMove.checker1.destination = payload
          const origin = state.activeMove.checker1.origin as CheckerBox
          const destination = payload
          let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
          try {
            moveResults = activePlayer.move({ origin, destination, roll: [1, 1] })
            console.log(`[STATE] moveResults:`, moveResults)

          } catch (e: any) {
            return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
          }
          if (!moveResults) {
            throw Error('No moveResults')
          }
          if (state.debug) {
            console.log(`[STATE] moveResults: `)
            console.log(moveResults)
          }

          const movePayload: MoveType = {
            board: state.board,
            origin: moveResults.origin,
            destination: moveResults.destination,
            checker: state.activeMove.checker1,
            completed: false
          }
          const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload)

          if (state.debug) {
            console.log(`originQuadrantIndex = ${originQuadrantIndex}`)
            console.log(`originPointIndex = ${originPointIndex}`)
            console.log(`destinationQuadrantIndex = ${destinationQuadrantIndex}`)
            console.log(`destinationPointIndex = ${destinationPointIndex}`)
          }

          draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
            = moveResults.origin
          draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
            = moveResults.destination
          draft.activeMove.checker1.completed = true

        })
        return newState
      } else if (!state.activeMove.checker2.origin) {
        console.log('Setting checker2 origin')
        newState = produce(state, draft => {
          draft.activeMove.color = state.activeColor
          draft.activeMove.checker2.origin = payload
          draft.activeMove.checker2.completed = false
        })
        return newState
      } else if (state.activeMove.checker2.origin && !state.activeMove.checker2.destination) {
        console.log('Setting checker2 destination')
        newState = produce(state, draft => {
          draft.activeMove.checker2.destination = payload
          const origin = state.activeMove.checker2.origin as CheckerBox
          const destination = payload
          let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
          try {
            moveResults = activePlayer.move({ origin, destination, roll: [1, 1] })
            console.log(`[STATE] moveResults:`, moveResults)

          } catch (e: any) {
            return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
          }
          if (!moveResults) {
            throw Error('No moveResults')
          }
          if (state.debug) {
            console.log(`[STATE] moveResults: `)
            console.log(moveResults)
          }

          const movePayload: MoveType = {
            board: state.board,
            origin: moveResults.origin,
            destination: moveResults.destination,
            checker: state.activeMove.checker1,
            completed: false
          }
          const { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex } = moveChecker(movePayload)

          if (state.debug) {
            console.log(`originQuadrantIndex = ${originQuadrantIndex}`)
            console.log(`originPointIndex = ${originPointIndex}`)
            console.log(`destinationQuadrantIndex = ${destinationQuadrantIndex}`)
            console.log(`destinationPointIndex = ${destinationPointIndex}`)
          }

          draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
            = moveResults.origin
          draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
            = moveResults.destination
          draft.activeMove.checker1.completed = true

        })
        return newState
      }
      return state
    case GAME_ACTION_TYPE.FINALIZE_MOVE:
      console.warn('[STATE] FINALIZE_MOVE: not implemented')

      return state
    case GAME_ACTION_TYPE.DOUBLE:
      newState = produce(state, draft => {
        draft.cube.value = draft.cube.double()
      })
      return newState
    default:
      throw Error(`Unkown action type ${type}`)
  }
}

const useGameContext = (initialState: GameState) => {
  const [state, dispatch] = useReducer(reducer, initGameState)

  const rename = useCallback((name: string) => dispatch({ type: GAME_ACTION_TYPE.RENAME, payload: name }), [])
  const roll = useCallback((color: Color) => dispatch({ type: GAME_ACTION_TYPE.ROLL, payload: color }), [])
  const move = useCallback((checkerBox: CheckerBox) => dispatch({ type: GAME_ACTION_TYPE.MOVE, payload: checkerBox }), [])
  const finalizeMove = useCallback((color: Color) => dispatch({ type: GAME_ACTION_TYPE.FINALIZE_MOVE, payload: color }), [])
  const toggleActivePlayer = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.TOGGLE }), [])
  const double = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.DOUBLE }), [])
  return { state, rename, roll, move, finalizeMove, double, toggleActivePlayer }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initContextState: UseGameContextType = {
  state: initGameState,
  rename () { },
  roll () { },
  move () { },
  finalizeMove () { },
  double () { },
  toggleActivePlayer () { },
}

export const GameContext = createContext<UseGameContextType>(initContextState)

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const GameProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GameContext.Provider value={useGameContext(initGameState)}>
      {children}
    </GameContext.Provider>
  )
}

type UseGameHookType = {
  name: string,
  board: Board,
  players: {
    white: Player,
    black: Player,
  },
  dice: {
    white: [Die, Die],
    black: [Die, Die]
  },
  cube: Cube,
  activeMove: {
    color: Color | undefined
    checker1: {
      origin: CheckerBox | undefined,
      destination: CheckerBox | undefined
      completed: boolean | undefined
    },
    checker2: {
      origin: CheckerBox | undefined,
      destination: CheckerBox | undefined
      completed: boolean | undefined
    }
  },
  activeColor: Color,
  rename: (name: string) => void
  roll: (color: Color) => void,
  move: (checkerBox: CheckerBox, container: Point | Rail | Off) => void
  finalizeMove: (color: Color) => void,
  double: () => void,
  toggleActivePlayer: () => void
  debug: boolean
}

export const useGame = (): UseGameHookType => {
  const { state: { name, board, players, cube, dice, activeMove, activeColor, debug }, rename, roll, move, finalizeMove, double, toggleActivePlayer } = useContext(GameContext)
  return { name, board, players, cube, dice, activeMove, activeColor, rename, roll, move, finalizeMove, toggleActivePlayer, double, debug }
}

const moveChecker = (move: MoveType) => {
  const originPoint = move.board.getCheckerBoxContainer(move.origin.id)
  if (!originPoint) {
    throw Error(`No origin point`)
  }
  const originQuadrant = move.board.getPointContainer(originPoint.id)
  if (!originQuadrant) {
    throw Error(`No origin quadrant`)
  }
  const destinationPoint = move.board.getCheckerBoxContainer(move.destination.id)
  if (!destinationPoint) {
    throw Error(`No destinationPoint`)
  }
  const destinationQuadrant = move.board.getPointContainer(destinationPoint.id)
  if (!destinationQuadrant) {
    throw Error(`No destination Quadrant`)
  }
  const originQuadrantIndex = move.board.quadrants.findIndex(q => q.id === originQuadrant.id)
  const originPointIndex = originQuadrant.points.findIndex(p => p.id === originPoint.id)

  const destinationQuadrantIndex = move.board.quadrants.findIndex(q => q.id === destinationQuadrant.id)
  const destinationPointIndex = destinationQuadrant.points.findIndex(p => p.id === destinationPoint.id)

  return { originQuadrantIndex, originPointIndex, destinationQuadrantIndex, destinationPointIndex }
}
// if (!state.activeMove.origin) {
//   newState = produce(state, draft => {
//     draft.activeMove.origin = payload
//   })
// } else {
//   newState = produce(state, draft => {
//     if (payload.id === state.activeMove.origin?.id) {
//       console.error(`Origin and destination are the same`)
//       return state
//     }
//     if (!state.activeMove) {
//       throw Error('There is no activeMove')
//     }
//     draft.activeMove.destination = payload
//     if (!draft.activeMove.destination || !draft.activeMove.origin) {
//       throw Error('Missing an origin or destination')
//     }
//     if (draft.activeMove.origin.type !== 'point' ||
//       draft.activeMove.destination.type !== 'point') {
//       throw Error(`Moves to/from Rail and Off not yet supported`)
//     }
//     let player: Player | undefined = undefined

//     if (!state.players.white.active && !state.players.black.active) {
//       throw Error(`No active players`)
//     }

//     player = state.players.white.active ? state.players.white : state.players.black
//     let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
//     try {
//       moveResults = player.move(draft.activeMove.origin, draft.activeMove.destination, [1, 1])
//     } catch (e: any) {
//       return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
//     }
//     if (!moveResults) {
//       throw Error('No moveResults')
//     }
//     if (state.debug) {
//       console.log(`[STATE] moveResults: `)
//       console.log(moveResults)
//     }

//     const originPoint = state.board.getCheckerBoxContainer(moveResults.origin.id)
//     if (!originPoint) {
//       throw Error(`No origin point`)
//     }
//     const originQuadrant = state.board.getPointContainer(originPoint.id)
//     if (!originQuadrant) {
//       throw Error(`No origin quadrant`)
//     }
//     const destinationPoint = state.board.getCheckerBoxContainer(moveResults.destination.id)
//     if (!destinationPoint) {
//       throw Error(`No destinationPoint`)
//     }
//     const destinationQuadrant = state.board.getPointContainer(destinationPoint.id)
//     if (!destinationQuadrant) {
//       throw Error(`No destination Quadrant`)
//     }
//     const originQuadrantIndex = state.board.quadrants.findIndex(q => q.id === originQuadrant.id)
//     const originPointIndex = originQuadrant.points.findIndex(p => p.id === originPoint.id)

//     const destinationQuadrantIndex = state.board.quadrants.findIndex(q => q.id === destinationQuadrant.id)
//     const destinationPointIndex = destinationQuadrant.points.findIndex(p => p.id === destinationPoint.id)

//     if (state.debug) {
//       console.log(`originQuadrantIndex = ${originQuadrantIndex}`)
//       console.log(`originPointIndex = ${originPointIndex}`)
//       console.log(`destinationQuadrantIndex = ${destinationQuadrantIndex}`)
//       console.log(`destinationPointIndex = ${destinationPointIndex}`)
//     }

//     draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
//       = moveResults.origin
//     draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
//       = moveResults.destination
//     draft.activeMove.origin = undefined
//     draft.activeMove.destination = undefined

//   })
// }



// Working move code
// if (!state.activeMove.origin) {
//   newState = produce(state, draft => {
//     draft.activeMove.origin = payload
//   })
// } else {
//   newState = produce(state, draft => {
//     if (payload.id === state.activeMove.origin?.id) {
//       console.error(`Origin and destination are the same`)
//       return state
//     }
//     if (!state.activeMove) {
//       throw Error('There is no activeMove')
//     }
//     draft.activeMove.destination = payload
//     if (!draft.activeMove.destination || !draft.activeMove.origin) {
//       throw Error('Missing an origin or destination')
//     }
//     if (draft.activeMove.origin.type !== 'point' ||
//       draft.activeMove.destination.type !== 'point') {
//       throw Error(`Moves to/from Rail and Off not yet supported`)
//     }
//     let player: Player | undefined = undefined

//     if (!state.players.white.active && !state.players.black.active) {
//       throw Error(`No active players`)
//     }

//     player = state.players.white.active ? state.players.white : state.players.black
//     let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
//     try {
//       moveResults = player.move(draft.activeMove.origin, draft.activeMove.destination, [1, 1])
//     } catch (e: any) {
//       return alert(`${e.message}: YOU WILL SEE THIS MESSAGE TWICE IN DEV MODE`)
//     }
//     if (!moveResults) {
//       throw Error('No moveResults')
//     }
//     if (state.debug) {
//       console.log(`[STATE] moveResults: `)
//       console.log(moveResults)
//     }

//     const originPoint = state.board.getCheckerBoxContainer(moveResults.origin.id)
//     if (!originPoint) {
//       throw Error(`No origin point`)
//     }
//     const originQuadrant = state.board.getPointContainer(originPoint.id)
//     if (!originQuadrant) {
//       throw Error(`No origin quadrant`)
//     }
//     const destinationPoint = state.board.getCheckerBoxContainer(moveResults.destination.id)
//     if (!destinationPoint) {
//       throw Error(`No destinationPoint`)
//     }
//     const destinationQuadrant = state.board.getPointContainer(destinationPoint.id)
//     if (!destinationQuadrant) {
//       throw Error(`No destination Quadrant`)
//     }
//     const originQuadrantIndex = state.board.quadrants.findIndex(q => q.id === originQuadrant.id)
//     const originPointIndex = originQuadrant.points.findIndex(p => p.id === originPoint.id)

//     const destinationQuadrantIndex = state.board.quadrants.findIndex(q => q.id === destinationQuadrant.id)
//     const destinationPointIndex = destinationQuadrant.points.findIndex(p => p.id === destinationPoint.id)

//     if (state.debug) {
//       console.log(`originQuadrantIndex = ${originQuadrantIndex}`)
//       console.log(`originPointIndex = ${originPointIndex}`)
//       console.log(`destinationQuadrantIndex = ${destinationQuadrantIndex}`)
//       console.log(`destinationPointIndex = ${destinationPointIndex}`)
//     }

//     draft.board.quadrants[originQuadrantIndex].points[originPointIndex].checkerBox
//       = moveResults.origin
//     draft.board.quadrants[destinationQuadrantIndex].points[destinationPointIndex].checkerBox
//       = moveResults.destination
//     draft.activeMove.origin = undefined
//     draft.activeMove.destination = undefined

//   })
// }
