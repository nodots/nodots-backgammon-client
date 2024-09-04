import { NodotsPlayerInitialized } from '../../../../nodots-backgammon-api/nodots_modules/@nodots/backgammon-types'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'

export const getPlayerById = async (id: string): Promise<NodotsPlayer> => {
  const result = await fetch(`http://localhost:3000/player/${id}`)
  return result.json()
}

export const getPlayerBySub = async (
  sub: string
): Promise<NodotsPlayerInitialized> => {
  const result = await fetch(`http://localhost:3000/player/sub/${sub}`)
  return result.json()
}
