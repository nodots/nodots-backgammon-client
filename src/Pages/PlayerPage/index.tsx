import { NodotsAppBar } from '../../Components/NodotsAppBar'
import { Loading } from '../../Components/utils/Loading'
import { usePlayerContext } from '../../Contexts/Player/usePlayerContext'

const PlayerPage = () => {
  const { state, dispatch } = usePlayerContext()
  const { player } = state
  return !player || player.kind === 'initializing' ? (
    <Loading message="PlayerPage Waiting for Player" />
  ) : (
    <>
      <NodotsAppBar />
      <>{player.id}</>
    </>
  )
}

export default PlayerPage
