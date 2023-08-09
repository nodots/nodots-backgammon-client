import { useContext } from 'react'
import { GameContext } from './game.context'
import { Game } from './game'
import { CubeValue, SetCubeValuePayload, double } from './components/Cube/state'
import { SetDiceValuesPayload } from './components/Die/state'
import { TurnActionPayload } from './components/Player/state/reducers/turn'
import { MoveActionPayload } from './components/CheckerBox/state/types/move'

type UseGameHookType = {
  game: Game
  setDiceValues: (payload: SetDiceValuesPayload) => void
  setCubeValue: (payload: SetCubeValuePayload) => void
  initializeTurn: (payload: TurnActionPayload) => void
  double: (value: CubeValue) => CubeValue
  move: (payload: MoveActionPayload) => void
}

export const useGame = (): UseGameHookType => {
  const { game, initializeTurn, setDiceValues, setCubeValue, move } = useContext(GameContext)
  return { game, initializeTurn, setDiceValues, setCubeValue, move, double }
}
