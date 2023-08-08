import { useContext } from 'react'
import { Game, GameContext } from './game.context'
import { SetCubeValuePayload } from './components/Cube/state/cube.context'


type UseGameHookType = {
  game: Game
  setCubeValue: (value: SetCubeValuePayload) => void
}

export const useGame = (): UseGameHookType => {
  const { game, setCubeValue } = useContext(GameContext)
  return { game, setCubeValue }
}
