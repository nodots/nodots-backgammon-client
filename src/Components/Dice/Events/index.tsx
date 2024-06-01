import { observer } from 'mobx-react'
import { Rolled, Rolling } from '../../../GameStore/types'
import { Card } from '@mui/material'

interface Props {
  state: Rolling | Rolled
}

function DiceEvents({ state }: Props) {
  const { activeColor, players, kind } = state
  const activePlayer = players[activeColor]
  const buildMessage = () => {
    switch (kind) {
      case 'game-rolled':
        const { roll } = state
        return `${activePlayer.username} rolls ${roll[0]}:${roll[1]}`
      case 'game-rolling':
      default:
        console.error(`invalid state ${kind}`)
      //noop
    }
  }
  return <Card>{buildMessage()}</Card>
}

export default observer(DiceEvents)
