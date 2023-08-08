import { reducer } from './reducers'
import { Color } from '../../../models'
import { createContext, useReducer } from 'react'

import { Cube, CubeValue } from './types'
import { CUBE_ACTION_TYPE, initCubeState } from './cube.state'

export interface SetCubeValuePayload {
  color: Color
  value: CubeValue | undefined
}

export const useCubeContext = (initialState: Cube) => {
  const [cube, dispatch] = useReducer(reducer, initialState)

  const setCubeValue = (payload: SetCubeValuePayload) => dispatch({ type: CUBE_ACTION_TYPE.SET_CUBE_VALUE, payload })
  return { cube, setCubeValue }
}

type UseCubeContextType = ReturnType<typeof useCubeContext>

const initContextState: UseCubeContextType = {
  cube: initCubeState,
  setCubeValue () { }

}

export const CubeContext = createContext<UseCubeContextType>(initContextState)
