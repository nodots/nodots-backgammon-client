import { Card, CardContent, CardHeader } from '@mui/material'
import { observer } from 'mobx-react'

interface Props {
  eventSource: 'checker' | 'dice' | 'cube' | 'dice switcher'
  message: string
}

function HUDCard({ eventSource, message }: Props) {
  return (
    <Card className="hud-card" elevation={3}>
      <CardHeader
        title={eventSource}
        titleTypographyProps={{ textTransform: 'capitalize' }}
      />
      <CardContent>{message}</CardContent>
    </Card>
  )
}

export default observer(HUDCard)
