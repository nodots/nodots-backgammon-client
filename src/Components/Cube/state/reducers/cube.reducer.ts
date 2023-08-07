import { produce } from 'immer'
import { Cube, isCubeValue } from '../types'
import { CUBE_ACTION_TYPE } from '../cube.state'
import { SetCubeValuePayload } from '../cube.context'

interface CubeAction {
  type: CUBE_ACTION_TYPE,
  payload: SetCubeValuePayload
}

const reducer = (state: Cube, action: CubeAction): Cube => {
  const { payload } = action
  console.log(`[Cube Reducer]: state`, state)
  console.log(`[Cube Reducer]: action`, action)

  if (!payload.color) {
    throw Error('No payload color')
  }

  const newState = produce(state, draft => {
    if (isCubeValue(payload.value)) {
      draft.value = payload.value
      if (state.owner === 'black') {
        draft.owner = 'white'
      } else {
        draft.owner = 'black'
      }
    }
  })
  return newState
}

export default reducer