import { observer } from 'mobx-react'
import { Rolled } from '../../../GameStore/types'
import { Card } from '@mui/material'

interface Props {
  state: Rolled
}

function DiceSwitcherEvents({ state }: Props) {
  const { activeColor, players, kind, roll } = state
  const activePlayer = players[activeColor]
  const buildMessage = () => {
    return `${activePlayer.username} rolls ${roll[0]}:${roll[1]}`
  }
  return <Card>{buildMessage()}</Card>
}

export default observer(DiceSwitcherEvents)
