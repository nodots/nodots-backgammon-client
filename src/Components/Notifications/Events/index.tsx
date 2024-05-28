import { observer } from 'mobx-react'
import NodotsGameStore from '../../../GameStore'
import CheckerEvents from './CheckerEvents'
import DiceEvents from './DiceEvents'
import DiceSwitcherEvents from './DiceSwitcherEvents'

interface Props {
  store: NodotsGameStore
}

function EventNotifications({ store }: Props) {
  const buildEventMessage = () => {
    const gameState = store.state.kind
    let messageContent = `${gameState.toString()} missing Event Notification Component`
    switch (store.state.kind) {
      case 'game-moving':
      case 'game-confirming-play':
        return <CheckerEvents state={store.state} />
      case 'game-dice-switched':
        return <DiceSwitcherEvents state={store.state} />
      case 'game-rolled':
      case 'game-rolling':
        return <DiceEvents state={store.state} />
      default:
        return <div>{messageContent}</div>
    }
  }
  return <div id="EventNotifications">{buildEventMessage()}</div>
}

export default observer(EventNotifications)
