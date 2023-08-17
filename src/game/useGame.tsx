import { useContext } from 'react'
import { GameContext } from './game.context'
import { Game } from '.'
import { CubeValue, SetCubeValuePayload, double } from '../components/Cube/state'
import { SetDiceValuesPayload } from '../components/Die/state'
import { TurnActionPayload } from './turn.reducer'
import { MoveActionPayload } from './move'

type UseGameHookType = {
  game: Game
  setDiceValues: (payload: SetDiceValuesPayload) => void
  setCubeValue: (payload: SetCubeValuePayload) => void
  initializeTurn: (payload: TurnActionPayload) => void
  finalizeTurn: () => void
  double: (value: CubeValue) => CubeValue
  move: (payload: MoveActionPayload) => void
}

export const useGame = (): UseGameHookType => {
  const { game, initializeTurn, finalizeTurn, setDiceValues, setCubeValue, move } = useContext(GameContext)
  return { game, initializeTurn, finalizeTurn, setDiceValues, setCubeValue, move, double }
}
