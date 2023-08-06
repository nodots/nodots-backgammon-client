import { Color, } from '../../../models'
export type DieOrder = 0 | 1
export type DieValue = 1 | 2 | 3 | 4 | 5 | 6

const isDieValue = (v: unknown): v is DieValue => {
  if (v && typeof v === 'number' && v >= 1 && v <= 6) {
    return true
  }
  return false
}

// const isDieOrder = (o: unknown): o is DieOrder => {
//   if (o && typeof o === 'number' && o >= 0 && o <= 1) {
//     return true
//   }
//   return false
// }

export type Die = {
  order: DieOrder
  color: Color
  value?: DieValue | undefined
  roll?: () => DieValue
}

export const roll = (): DieValue => {
  const value = Math.floor(Math.random() * 6) + 1
  if (isDieValue(value)) {
    return value
  } else {
    throw Error('Invalid DieValue')
  }
}

