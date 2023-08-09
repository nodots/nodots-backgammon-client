import { createContext, useReducer } from 'react'

import { SetDiceValuesPayload } from './components/Die/state/'

import { SetCubeValuePayload } from './components/Cube/state/'

import { reducer } from './game.reducer'
import { Game } from './game'
import { initialGameState } from './game.state'

import { GAME_ACTION_TYPE } from './game.reducer'
import { InitializeTurnAction } from './components/Player/state/types/player'
import { MoveActionPayload } from './components/CheckerBox/state/types/move'

export const useGameContext = (initialState: Game) => {
  const [game, dispatch] = useReducer(reducer, initialGameState)

  const setDiceValues = (payload: SetDiceValuesPayload) =>
    dispatch({ type: GAME_ACTION_TYPE.SET_DICE_VALUES, payload })
  const setCubeValue = (payload: SetCubeValuePayload) =>
    dispatch({ type: GAME_ACTION_TYPE.SET_CUBE_VALUE, payload })
  const initializeTurn = (payload: InitializeTurnAction) =>
    dispatch({ type: GAME_ACTION_TYPE.INITIALIZE_TURN, payload })
  const move = (payload: MoveActionPayload) =>
    dispatch({ type: GAME_ACTION_TYPE.MOVE, payload })

  return { game, setCubeValue, setDiceValues, move, initializeTurn }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initGameContextState: UseGameContextType = {
  game: initialGameState,
  setCubeValue: () => { },
  setDiceValues: () => { },
  initializeTurn: () => { },
  move: () => { }
}

export const GameContext = createContext<UseGameContextType>(initGameContextState)

