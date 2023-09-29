import { useContext } from 'react'
import { GameContext } from './game.context'
import { Game } from '.'
import { CubeValue, SetCubeValuePayload, double } from '../components/cube/state'
import { SetDiceValuesPayload } from '../components/die/state'
import { TurnActionPayload } from './turn.reducer'
import { MoveActionPayload } from './move'
import { BgWebApi_TurnAnalysis } from './integrations/bgweb-api'

type UseGameHookType = {
  game: Game
  setDiceValues: (payload: SetDiceValuesPayload) => void
  setCubeValue: (payload: SetCubeValuePayload) => void
  initializeTurn: (payload: TurnActionPayload) => void
  getTurnAnalytics: () => BgWebApi_TurnAnalysis[]
  finalizeTurn: () => void
  double: (value: CubeValue) => CubeValue
  move: (payload: MoveActionPayload) => void
  revert: (payload: MoveActionPayload) => void
}

export const useGame = (): UseGameHookType => {
  const { game, initializeTurn, finalizeTurn, getTurnAnalytics, setDiceValues, setCubeValue, move, revert } = useContext(GameContext)
  return { game, initializeTurn, finalizeTurn, getTurnAnalytics, setDiceValues, setCubeValue, move, revert, double }
}
