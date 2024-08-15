import { SyncAlt } from '@mui/icons-material'
import { NodotsColor } from '../../../../../nodots_modules/backgammon-types'

interface Props {
  color: NodotsColor
}
const NodotsDiceSwitcherComponent = ({ color }: Props) => {
  return (
    <>
      <SyncAlt />
    </>
  )
}

export default NodotsDiceSwitcherComponent
