import { initialize } from './types'
import { Cube } from '../../Cube/state/types'

export const enum CUBE_ACTION_TYPE {
  SET_CUBE_VALUE
}


export const initCubeState: Cube = {
  value: undefined,
  owner: undefined
}


export const initBoardState = initialize()
