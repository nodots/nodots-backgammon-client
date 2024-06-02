import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import CheckerEventsNotification from '../Checker/Events'

interface Props {
  store: NodotsGameStore
}

function EventNotifications({ store }: Props) {
  const buildEventMessage = () => {
    const gameState = store.state.kind
    let messageContent = `${gameState.toString()} missing Event Notification Component`
    console.log('[EventNotifications]:', store.state.kind)
    switch (store.state.kind) {
      case 'game-moving':
      case 'game-confirming-play':
        return <CheckerEventsNotification state={store.state} />
      case 'game-dice-switched':
      case 'game-rolled':
      case 'game-rolling':
      default:
        return <div>{messageContent}</div>
    }
  }
  return <div id="EventNotifications">{buildEventMessage()}</div>
}

export default observer(EventNotifications)
