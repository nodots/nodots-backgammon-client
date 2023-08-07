import { Cube } from './types'

export const enum CUBE_ACTION_TYPE {
  SET_CUBE_VALUE
}

export const initCubeState: Cube = {
  value: undefined,
  owner: undefined
}

