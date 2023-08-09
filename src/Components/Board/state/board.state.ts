import { initialize } from './types'

export const enum BOARD_ACTION_TYPE {
  SET_CHECKERBOX_CHECKERS
}

// export const enum CUBE_ACTION_TYPE {
//   SET_CUBE_VALUE
// }


// export const initCubeState: Cube = {
//   value: undefined,
//   owner: undefined
// }


export const initBoardState = initialize()
