import { useContext } from 'react'
import { GameContext } from './game.context'
import { Game } from '.'
import {
  CubeValue,
  SetCubeValuePayload,
  double,
} from '../components/Cube/state/types'
import { SetDiceValuesPayload } from '../components/Die/state'
import { TurnActionPayload } from './turn.reducer'
import { MoveActionPayload } from './move'
import { BgWebApi_TurnAnalysis } from './integrations/bgweb-api'

type UseGameHookType = {
  game: Game
  setDiceValues: (payload: SetDiceValuesPayload) => void
  setCubeValue: (payload: SetCubeValuePayload) => void
  initializeTurn: (payload: TurnActionPayload) => void
  getTurnAnalytics: () => void
  finalizeTurn: () => void
  double: (value: CubeValue) => CubeValue
  move: (payload: MoveActionPayload) => void
  revert: (payload: MoveActionPayload) => void
}

export const useGame = (): UseGameHookType => {
  const {
    game,
    initializeTurn,
    finalizeTurn,
    getTurnAnalytics,
    setDiceValues,
    setCubeValue,
    move,
    revert,
  } = useContext(GameContext)
  return {
    game,
    initializeTurn,
    finalizeTurn,
    getTurnAnalytics,
    setDiceValues,
    setCubeValue,
    move,
    revert,
    double,
  }
}
