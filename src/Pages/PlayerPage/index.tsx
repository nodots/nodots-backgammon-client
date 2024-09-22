import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import { NodotsPlayerActive } from '../../../../nodots_modules/backgammon-types'

interface Props {
  player: NodotsPlayerActive
}

const PlayerPage = ({ player }: Props) => {
  return (
    <>
      <NodotsAppBar />
    </>
  )
}

export default PlayerPage
