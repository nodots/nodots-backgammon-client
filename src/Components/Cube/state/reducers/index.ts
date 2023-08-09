import { produce } from 'immer'
import { Cube, isCubeValue } from '../types'
import { CUBE_ACTION_TYPE } from '../cube.state'
import { SetCubeValuePayload } from '../cube.context'

interface CubeAction {
  type: CUBE_ACTION_TYPE,
  payload: SetCubeValuePayload
}

export const reducer = (state: Cube, action: CubeAction): Cube => {
  const { payload } = action
  console.log(`[Cube Reducer]: state`, state)
  console.log(`[Cube Reducer]: action`, action)

  const newState = produce(state, draft => {
    if (isCubeValue(payload.value)) {
      // Do nothing if we are already maxxed out
      if (payload.value <= 64) {
        draft.value = payload.value
        if (state.owner === 'black') {
          draft.owner = 'white'
        } else {
          draft.owner = 'black'
        }
      }

    }
  })
  return newState
}