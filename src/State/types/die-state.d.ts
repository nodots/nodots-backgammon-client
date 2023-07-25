import { DieValue, Color } from '../../Models'

export type DieOrder = 0 | 1
export type DieRollPayload = {
  color: Color
  order: DieOrder
  value: DieValue
}
export type DiceRollPayload = [DieRollPayload, DieRollPayload]
export type RollSurfaceState = {
  id: string
  color: Color
  dice: [DieState, DieState]
}
export type DieState = {
  id: string
  order: 0 | 1
  color: Color
  value: DieValue | undefined
  rollDie: () => any
}
