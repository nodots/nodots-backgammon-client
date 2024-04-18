import { Color } from '../../../../GameStore/types'

export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64

export const isCubeValue = (v: unknown): v is CubeValue => {
  if (
    v &&
    typeof v === 'number' &&
    v >= 1 &&
    (v === 2 || v === 4 || v === 8 || v === 16 || v === 32 || v === 64)
  ) {
    return true
  }
  return false
}

export type Cube = {
  value: CubeValue | undefined
  owner: Color | undefined
}

export interface SetCubeValuePayload {
  value: CubeValue | undefined
}

export const double = (value: CubeValue): CubeValue => {
  // at the start of them game the Cube has no value. If undefined, set to 2
  if (!value) {
    return 2
  }
  // Max value is 64
  if (value === 64) {
    return 64
  }
  if (isCubeValue(value)) {
    const newValue = value * 2
    if (isCubeValue(newValue)) {
      return newValue
    } else {
      throw Error('Invalid CubeValue')
    }
  } else {
    throw Error('Invalid CubeValue')
  }
}
