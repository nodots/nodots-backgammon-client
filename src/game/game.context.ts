import { createContext, useReducer } from 'react'
import { SetDiceValuesPayload } from '../components/die/state'
import { SetCubeValuePayload } from '../components/cube/state'
import { reducer, GAME_ACTION_TYPE } from './game.reducer'
import { Game } from './game'
import { initialGameState } from './game.state'
import { InitializeTurnAction } from '../components/player/state/types/player'
import { MoveActionPayload } from './move'

export const useGameContext = (initialState: Game) => {
  const [game, dispatch] = useReducer(reducer, initialGameState)

  const setDiceValues = (payload: SetDiceValuesPayload) => {
    dispatch({ type: GAME_ACTION_TYPE.SET_DICE_VALUES, payload })
  }
  const setCubeValue = (payload: SetCubeValuePayload) =>
    dispatch({ type: GAME_ACTION_TYPE.SET_CUBE_VALUE, payload })
  const initializeTurn = (payload: InitializeTurnAction) =>
    dispatch({ type: GAME_ACTION_TYPE.INITIALIZE_TURN, payload })
  const finalizeTurn = () =>
    dispatch({ type: GAME_ACTION_TYPE.FINALIZE_TURN, payload: {} })
  const getTurnAnalytics = () => {
    dispatch({ type: GAME_ACTION_TYPE.GET_TURN_ANALYTICS })
  }
  const move = (payload: MoveActionPayload) =>
    dispatch({ type: GAME_ACTION_TYPE.MOVE, payload })
  const revert = (payload: MoveActionPayload) => {
    dispatch({ type: GAME_ACTION_TYPE.REVERT_MOVE, payload })
  }

  return { game, setCubeValue, setDiceValues, move, revert, initializeTurn, finalizeTurn, getTurnAnalytics }
}

// Adding comment for commit
type UseGameContextType = ReturnType<typeof useGameContext>

const initGameContextState: UseGameContextType = {
  game: initialGameState,
  setCubeValue: () => { },
  setDiceValues: () => { },
  initializeTurn: () => { },
  finalizeTurn: () => { },
  getTurnAnalytics: () => { },
  move: () => { },
  revert: () => { }
}

export const GameContext = createContext<UseGameContextType>(initGameContextState)
