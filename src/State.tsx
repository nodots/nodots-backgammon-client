import { ReactElement, createContext, useCallback, useContext, useReducer } from 'react'
import { Game, Board, Player, Cube } from './Models'

type GameState = {
  board: Board,
  players: {
    white: Player,
    black: Player
  },
  cube: Cube,
  move?: () => {}
}

const blackPlayer = new Player('A', 'Robot', 'black')
const whitePlayer = new Player('Ken', 'Riley', 'white')

const game = new Game(blackPlayer, whitePlayer)
const winner = Game.rollForStart(blackPlayer, blackPlayer)

const blackPlayerCopy = blackPlayer
const whitePlayerCopy = whitePlayer

winner === 'black' ? blackPlayerCopy.active = true : whitePlayerCopy.active = true

const initPlayers = {
  white: whitePlayerCopy,
  black: blackPlayerCopy
}

const initGameState: GameState = {
  board: game.board,
  players: initPlayers,
  cube: game.cube,
}

export const enum GAME_ACTION_TYPE {
  MOVE,
  ROLL,
  ROLL_FOR_START,
  DOUBLE,
  RESIGN
}

export type GameAction = {
  type: GAME_ACTION_TYPE,
  payload?: any
}

const reducer = (state: GameState, action: GameAction): GameState => {
  const { type, payload } = action

  switch (type) {
    case GAME_ACTION_TYPE.MOVE:
      console.log('MOVE')
      console.log(state)
      console.log(payload)
      return state
    default:
      throw Error(`Unkown action type ${type}`)
  }
}

const useGameContext = (initialState: GameState) => {
  const [state, dispatch] = useReducer(reducer, initGameState)

  const move = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.MOVE }), [])
  // const roll = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.ROLL }), [])
  return { state, move }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initContextState: UseGameContextType = {
  state: initGameState,
  move: () => { }
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
}

export const useGame = (): UseGameHookType => {
  const { state: { board, players, cube } } = useContext(GameContext)
  return { board, players, cube }
}