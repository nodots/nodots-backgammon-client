import { reducer } from './reducers/game.reducer'
import { createContext, useCallback, useReducer } from 'react'
import { CheckerBox, Color } from '../Models'
import { GameAction } from './types/game-action'
import { GameState } from './types/game-state'
import { initGameState, GAME_ACTION_TYPE } from './Game.state'

export const useGameContext = (initialState: GameState) => {
  const [state, dispatch] = useReducer(reducer, initGameState)

  const roll = useCallback((actions: GameAction) => dispatch({ type: GAME_ACTION_TYPE.ROLL, payload: actions }), [])
  const move = useCallback((checkerBox: CheckerBox) => dispatch({ type: GAME_ACTION_TYPE.MOVE, payload: checkerBox }), [])
  const finalizeMove = useCallback((color: Color) => dispatch({ type: GAME_ACTION_TYPE.FINALIZE_MOVE, payload: color }), [])
  const double = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.DOUBLE }), [])
  return { state, roll, move, finalizeMove, double }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initContextState: UseGameContextType = {
  state: initGameState,
  roll () { },
  move () { },
  finalizeMove () { },
  double () { },
}

export const GameContext = createContext<UseGameContextType>(initContextState)
