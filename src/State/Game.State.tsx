import { reducer } from './Game.reducer'
import { ReactElement, createContext, useCallback, useContext, useReducer } from 'react'
import { Game, Board, Player, Die, Point, Rail, Off, Cube, CheckerBox, Color } from '../Models'

export type GameState = {
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
    checkers: [
      {
        origin: CheckerBox | undefined,
        destination: CheckerBox | undefined
        completed: boolean | undefined
      },
      {
        origin: CheckerBox | undefined,
        destination: CheckerBox | undefined
        completed: boolean | undefined
      }
    ]
  },
  activeColor: Color,
  rename: (name: string) => any,
  roll: (color: Color) => any,
  move: (action: GameAction) => any,
  finalizeMove: (color: Color) => any,
  resetMove: (color: Color) => any,
  toggleActivePlayer: () => any,
  double: () => any,
  debug: boolean
}

const blackPlayer = new Player({ firstName: 'A', lastName: 'Robot', color: 'black' })
const whitePlayer = new Player({ firstName: 'Ken', lastName: 'Riley', color: 'white' })

const game = new Game({ whitePlayer: blackPlayer, blackPlayer: whitePlayer })
const winner = Game.rollForStart({ black: blackPlayer, white: whitePlayer })

let blackPlayerCopy = blackPlayer
let whitePlayerCopy = whitePlayer

winner === 'black' ? blackPlayerCopy.active = true : whitePlayerCopy.active = true
whitePlayerCopy.active = true
const initPlayers = {
  white: whitePlayerCopy,
  black: blackPlayerCopy
}

const initGameState: GameState = {
  board: game.board,
  players: initPlayers,
  cube: game.cube,
  dice: {
    white: [initPlayers.white.dice[0], initPlayers.white.dice[1]],
    black: [initPlayers.black.dice[0], initPlayers.black.dice[1]]
  },
  activeMove: {
    color: undefined,
    checkers: [
      {
        origin: undefined,
        destination: undefined,
        completed: undefined,
      },
      {
        origin: undefined,
        destination: undefined,
        completed: undefined,
      }
    ],
  },
  activeColor: winner,
  rename: (name: string) => { },
  roll: (color: Color) => { },
  move: (action: GameAction) => { },
  finalizeMove: (color: Color) => { },
  resetMove: (color: Color) => { },
  double: () => { },
  toggleActivePlayer: () => { },
  debug: true
}

export const enum GAME_ACTION_TYPE {
  RENAME,
  MOVE,
  FINALIZE_MOVE,
  RESET_MOVE,
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

const useGameContext = (initialState: GameState) => {
  const [state, dispatch] = useReducer(reducer, initGameState)

  const roll = useCallback((color: Color) => dispatch({ type: GAME_ACTION_TYPE.ROLL, payload: color }), [])
  const move = useCallback((checkerBox: CheckerBox) => dispatch({ type: GAME_ACTION_TYPE.MOVE, payload: checkerBox }), [])
  const finalizeMove = useCallback((color: Color) => dispatch({ type: GAME_ACTION_TYPE.FINALIZE_MOVE, payload: color }), [])
  const toggleActivePlayer = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.TOGGLE }), [])
  const double = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.DOUBLE }), [])
  return { state, roll, move, finalizeMove, double, toggleActivePlayer }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initContextState: UseGameContextType = {
  state: initGameState,
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
    checkers: [
      {
        origin: CheckerBox | undefined,
        destination: CheckerBox | undefined
        completed: boolean | undefined
      },
      {
        origin: CheckerBox | undefined,
        destination: CheckerBox | undefined
        completed: boolean | undefined
      }
    ]
  },
  activeColor: Color,
  roll: (color: Color) => void,
  move: (checkerBox: CheckerBox, container: Point | Rail | Off) => void
  finalizeMove: (color: Color) => void,
  double: () => void,
  toggleActivePlayer: () => void
  debug: boolean
}

export const useGame = (): UseGameHookType => {
  const { state: { board, players, cube, dice, activeMove, activeColor, debug }, roll, move, finalizeMove, double, toggleActivePlayer } = useContext(GameContext)
  return { board, players, cube, dice, activeMove, activeColor, roll, move, finalizeMove, toggleActivePlayer, double, debug }
}

