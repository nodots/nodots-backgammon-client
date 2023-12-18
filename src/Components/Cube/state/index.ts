import { Cube, CubeValue, double } from './types'
import { initCubeState, CUBE_ACTION_TYPE } from './cube.state'
import { reducer } from './reducers'

export { initCubeState, reducer, CUBE_ACTION_TYPE, double }

export type { Cube, CubeValue }
