import { Card, CardContent, CardHeader } from '@mui/material'
import RootStore from '../../stores/RootStore'
import { observer } from 'mobx-react'

interface Props {
  store: RootStore
}

function StoresOverview({ store }: Props) {
  return (
    <Card className="hud-card" elevation={3}>
      <CardHeader
        title={`Root Store: ${store.name}`}
        titleTypographyProps={{
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      />
      <CardContent>
        <h2>Child Stores</h2>
        <h3>Game Store</h3>
        <h4>Current Game State</h4>
        <p>{store.gameStore.state.kind}</p>
        <h3>Player Stores</h3>
        <h4>{store.gameStore.playerStores.black.playerState.username}</h4>
        <p>State: {store.gameStore.playerStores.black.playerState.kind}</p>
        <h4>{store.gameStore.playerStores.white.playerState.username}</h4>
        <p>State: {store.gameStore.playerStores.white.playerState.kind}</p>
      </CardContent>
    </Card>
  )
}

export default observer(StoresOverview)
