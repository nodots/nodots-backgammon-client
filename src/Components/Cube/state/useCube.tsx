import { useContext } from 'react'
import { Cube } from './types'
import { CubeContext } from './cube.context'

import { SetCubeValuePayload } from './cube.context'

type UseCubeHookType = {
  cube: Cube
  setCubeValue: (value: SetCubeValuePayload) => void
}

export const useCube = (): UseCubeHookType => {
  const { cube, setCubeValue } = useContext(CubeContext)
  return { cube, setCubeValue }
}
