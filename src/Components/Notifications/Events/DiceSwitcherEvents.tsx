import { observer } from 'mobx-react'
import { DiceSwitched, Rolled } from '../../../GameStore/types'
import { Card } from '@mui/material'

interface Props {
  state: Rolled | DiceSwitched
}

function DiceSwitcherEvents({ state }: Props) {
  const { activeColor, players } = state
  const activePlayer = players[activeColor]
  const buildMessage = () => {
    switch (state.kind) {
      case 'game-dice-switched':
        const { roll } = state
        return `${activePlayer.username} switched ${roll[0]}:${roll[1]}`
      default:
        return <></>
    }
  }
  return (
    <Card>
      <h2>Dice Switcher Events</h2>
      {buildMessage()}
    </Card>
  )
}

export default observer(DiceSwitcherEvents)
