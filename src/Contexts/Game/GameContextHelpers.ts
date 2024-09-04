import { NodotsGame } from '../../../nodots_modules/backgammon-types'

export const getGameById = async (id: string): Promise<NodotsGame> => {
  const result = await fetch(`http://localhost:3000/game/${id}`)
  return result.json()
}
