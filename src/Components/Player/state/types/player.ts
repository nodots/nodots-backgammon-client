import { Color, isColor, MoveDirection } from '../../../../game'
import { Roll, DiePair } from '../../../Die/state/types'
import { Board } from '../../../Board/state/types'
import { isDiePair } from '../../../Die/state/types/die-pair'
import { QuadrantLocation } from '../../../Quadrant/state'

export interface InitializeTurnAction {
  board: Board,
  player: Player,
  roll: Roll
}

export type Player = {
  id: string,
  color: Color
  active: boolean
  dice: DiePair
  moveDirection: MoveDirection
  pipCount: number
  homeQuadrantLocation?: QuadrantLocation
  bearOffQuadrantLocation?: QuadrantLocation
}

export const isPlayer = (v: any): v is Player => {
  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const idIndex = keys.findIndex(k => k === 'id')
  if (idIndex === -1) {
    return false
  }
  const colorIndex = keys.findIndex(k => k === 'color')
  if (colorIndex === -1) {
    return false
  }
  if (!isColor(v.color)) {
    return false
  }
  const activeIndex = keys.findIndex(k => k === 'active')
  if (activeIndex === -1) {
    return false
  }
  if (typeof v.active !== 'boolean') {
    return false
  }
  const diceIndex = keys.findIndex(k => k === 'dice')
  if (diceIndex === -1) {
    return false
  }
  if (!isDiePair(v.dice)) {
    return false
  }
  const moveDirectionIndex = keys.findIndex(k => k === 'moveDirection')
  if (moveDirectionIndex === -1) {
    return false
  }

  if (typeof v.moveDirection !== 'string' || (
    v.moveDirection !== 'clockwise' &&
    v.moveDirection !== 'counterclockwise'
  )) {
    return false
  }

  return true
}

export const getBearOffQuadrantLocation = (moveDirection: MoveDirection) => {
  return moveDirection === 'clockwise' ? QuadrantLocation.NE : QuadrantLocation.SE
}

export const getHomeQuadrantLocation = (moveDirection: MoveDirection) => {
  return moveDirection === 'clockwise' ? QuadrantLocation.SE : QuadrantLocation.NE
}