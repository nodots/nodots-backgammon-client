import { observer } from 'mobx-react'
import { Player as PlayerType } from '../../GameStore/types/Player'
import de from '../../i18n/de'

interface Props {
  player: PlayerType
}

function Player({ player }: Props) {
  return <>{player.username}</>
}

export default observer(Player)
