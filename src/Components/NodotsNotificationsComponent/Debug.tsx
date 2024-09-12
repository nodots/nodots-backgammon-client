import { AlertColor, Card } from '@mui/material'
// import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'

interface Props {
  severity?: AlertColor
}

function DebugNotifications({ severity }: Props) {
  const { game } = useNodotsGame()
  const d = new Date()
  const ts = `${d.getHours()}:${
    d.getMinutes() < 10 ? '0' : ''
  }${d.getMinutes()}:${d.getSeconds() < 10 ? '0' : ''}${d.getSeconds()}`
  return (
    <Card raised={true} id="DebugNotifications">
      DebugNotifications
      {/* <div className="debug-state">{store.state.kind}</div>

      <div className="debug-message">
        {store.state.message?.debug ? store.state.message.debug : ''}
      </div> */}
    </Card>
  )
}

export default DebugNotifications
