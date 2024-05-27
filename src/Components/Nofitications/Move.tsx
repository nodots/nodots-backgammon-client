import { observer } from 'mobx-react'
import { NodotsMoveState } from '../../GameStore/types/move'

interface Props {
  state: NodotsMoveState
}

function Move({ state }: Props) {
  console.log(state)
  return <div id="MoveNotifications">MoveNotifications</div>
}

export default observer(Move)
