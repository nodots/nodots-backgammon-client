import { produce } from 'immer'
import { ReactElement, createContext, useCallback, useContext, useReducer } from 'react'
import { Game, Board, Player, Point, Rail, Off, Cube, CheckerBox } from './Models'

type GameState = {
  board: Board,
  players: {
    white: Player,
    black: Player
  },
  cube: Cube,
  activeMove: {
    origin: CheckerBox | undefined,
    destination: CheckerBox | undefined
  }
  move: (action: GameAction) => any,
  toggleActivePlayer: () => any,
  debug: boolean
}

const blackPlayer = new Player('A', 'Robot', 'black')
const whitePlayer = new Player('Ken', 'Riley', 'white')

const game = new Game(blackPlayer, whitePlayer)
const winner = Game.rollForStart(blackPlayer, blackPlayer)

let blackPlayerCopy = blackPlayer
let whitePlayerCopy = whitePlayer

winner === 'black' ? blackPlayerCopy.active = true : whitePlayerCopy.active = true

const initPlayers = {
  white: whitePlayerCopy,
  black: blackPlayerCopy
}

const initGameState: GameState = {
  board: game.board,
  players: initPlayers,
  cube: game.cube,
  activeMove: {
    origin: undefined,
    destination: undefined
  },
  move: (action: GameAction) => { },
  toggleActivePlayer: () => { },
  debug: false
}

export const enum GAME_ACTION_TYPE {
  MOVE,
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
    case GAME_ACTION_TYPE.TOGGLE:
      console.log(`[STATE] TOGGLE ${new Date().toTimeString()}:`)
      throw Error('TOGGLE is FUBAR')
    // if (!state.players.white.active && !state.players.black.active) {
    //   throw Error(`No active players`)
    // }

    // console.log(`[STATE] TOGGLE: white active = ${state.players.white.active.toString()}`)
    // console.log(`[STATE] TOGGLE: black active = ${state.players.black.active.toString()}`)
    // newState = produce(state, draft => {
    //   draft.players.white.active = true
    //   draft.players.black.active = false
    // })
    // console.log('[STATE] newState:', newState)
    // return newState
    case GAME_ACTION_TYPE.MOVE:
      if (!state.activeMove.origin) {
        newState = produce(state, draft => {
          draft.activeMove.origin = payload
        })
      } else {
        newState = produce(state, draft => {
          if (payload.id === state.activeMove.origin?.id) {
            console.error(`Origin and destination are the same`)
            return state
          }
          if (!state.activeMove) {
            throw Error('There is no activeMove')
          }
          draft.activeMove.destination = payload
          if (!draft.activeMove.destination || !draft.activeMove.origin) {
            throw Error('Missing an origin or destination')
          }
          if (draft.activeMove.origin.type !== 'point' ||
            draft.activeMove.destination.type !== 'point') {
            throw Error(`Moves to/from Rail and Off not yet supported`)
          }
          let player: Player | undefined = undefined

          if (!state.players.white.active && !state.players.black.active) {
            throw Error(`No active players`)
          }

          player = state.players.white.active ? state.players.white : state.players.black
          let moveResults: { origin: CheckerBox, destination: CheckerBox } | undefined = undefined
          try {
            moveResults = player.move(draft.activeMove.origin, draft.activeMove.destination, [1, 1])
          } catch (e: any) {
            return alert(e.message)
          }
          if (!moveResults) {
            throw Error('No moveResults')
          }
          if (state.debug) {
            console.log(`[STATE] moveResults: `)
            console.log(moveResults)
          }

          const originPoint = state.board.getCheckerBoxContainer(moveResults.origin.id)
          if (!originPoint) {
            throw Error(`No origin point`)
          }
          const originQuadrant = state.board.getPointContainer(originPoint.id)
          if (!originQuadrant) {
            throw Error(`No origin quadrant`)
          }
          const destinationPoint = state.board.getCheckerBoxContainer(moveResults.destination.id)
          if (!destinationPoint) {
            throw Error(`No destinationPoint`)
          }
          const destinationQuadrant = state.board.getPointContainer(destinationPoint.id)
          if (!destinationQuadrant) {
            throw Error(`No destination Quadrant`)
          }
          const originQuadrantIndex = state.board.quadrants.findIndex(q => q.id === originQuadrant.id)
          const originPointIndex = originQuadrant.points.findIndex(p => p.id === originPoint.id)

          const destinationQuadrantIndex = state.board.quadrants.findIndex(q => q.id === destinationQuadrant.id)
          const destinationPointIndex = destinationQuadrant.points.findIndex(p => p.id === destinationPoint.id)

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
          draft.activeMove.origin = undefined
          draft.activeMove.destination = undefined

        })
      }
      return newState
    default:
      throw Error(`Unkown action type ${type}`)
  }
}

const useGameContext = (initialState: GameState) => {
  const [state, dispatch] = useReducer(reducer, initGameState)

  const move = useCallback((checkerBox: CheckerBox) => dispatch({ type: GAME_ACTION_TYPE.MOVE, payload: checkerBox }), [])
  const toggleActivePlayer = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.TOGGLE }), [])
  // const roll = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.ROLL }), [])
  return { state, move, toggleActivePlayer }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initContextState: UseGameContextType = {
  state: initGameState,
  toggleActivePlayer () { },
  move () { }
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
  board: Board,
  players: {
    white: Player,
    black: Player,
  }
  cube: Cube,
  activeMove: {
    origin: CheckerBox | undefined,
    destination: CheckerBox | undefined
  }
  move: (checkerBox: CheckerBox, container: Point | Rail | Off) => void
  toggleActivePlayer: () => void
  debug: boolean
}

export const useGame = (): UseGameHookType => {
  const { state: { board, players, cube, activeMove, debug }, move, toggleActivePlayer } = useContext(GameContext)
  return { board, players, cube, activeMove, move, toggleActivePlayer, debug }
}