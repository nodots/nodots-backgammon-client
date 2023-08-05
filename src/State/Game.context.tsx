import { reducer } from './reducers/game.reducer'
import { createContext, useCallback, useReducer } from 'react'
import { CheckerBox, Color, Player, DieValue } from '../models'
import { DieRollActionPayload } from './types/game.action'
import { GameState } from './types/game.state'
import { initGameState, GAME_ACTION_TYPE } from './game.state'
import { Roll } from '../models/Turn'

export interface InitializeTurnActionPayload {
  player: Player,
}

export const useGameContext = (initialState: GameState) => {
  const [state, dispatch] = useReducer(reducer, initGameState)

  const roll = useCallback((dieRollAction: DieRollActionPayload) => dispatch({ type: GAME_ACTION_TYPE.ROLL, payload: dieRollAction }), [])
  const move = useCallback((checkerBox: CheckerBox) => dispatch({ type: GAME_ACTION_TYPE.MOVE, payload: checkerBox }), [])
  const initializeTurn = useCallback((action: InitializeTurnActionPayload) => dispatch({ type: GAME_ACTION_TYPE.INITIALIZE_TURN, payload: action }), [])
  const finalizeTurn = useCallback((color: Color) => dispatch({ type: GAME_ACTION_TYPE.FINALIZE_TURN, payload: color }), [])
  const double = useCallback(() => dispatch({ type: GAME_ACTION_TYPE.DOUBLE, payload: {} }), [])
  return { state, roll, move, initializeTurn, finalizeTurn, double }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initContextState: UseGameContextType = {
  state: initGameState,
  roll () { },
  move () { },
  initializeTurn () { },
  finalizeTurn () { },
  double () { },
}

export const GameContext = createContext<UseGameContextType>(initContextState)
