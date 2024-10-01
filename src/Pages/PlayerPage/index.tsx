import { NodotsAppBar } from '../../Components/NodotsAppBar'
import { Loading } from '../../Components/utils/Loading'
import { useGameContext } from '../../Contexts/Game/GameContext'

const PlayerPage = () => {
  const { game } = useGameContext()
  switch (game?.kind) {
    case 'initializing':
    case 'ready':
      return <>PlayerPage Stub Loading</>
    case 'rolling-for-start':
    case 'rolling':
    case 'moving':
      return (
        <>
          PlayerPage Stub gameId: ${game.id} ${game.kind}
        </>
      )
  }
}

export default PlayerPage
