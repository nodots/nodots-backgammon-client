import { ReactElement } from 'react'
import { initCubeState } from './cube.state'
import { CubeContext, useCubeContext } from './cube.context'

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const CubeProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CubeContext.Provider value={useCubeContext(initCubeState)}>
      {children}
    </CubeContext.Provider>
  )
} 