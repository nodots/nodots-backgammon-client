import { Card, CardContent, CardHeader } from '@mui/material'
import { CommonProps } from '@mui/material/OverridableComponent'
import { observer } from 'mobx-react'

interface Props {
  eventSource: 'checker' | 'dice' | 'cube' | 'dice switcher' | 'game' | 'player'
  title?: string | JSX.Element
  message?: string | JSX.Element
  graph?: JSX.Element
  className?: string
}

function HUDCard({ eventSource, title, message, graph, className }: Props) {
  return (
    <Card className={`${className ? className : 'hud-card'}`} elevation={3}>
      {title && <CardHeader title={title} className="hud-card-title" />}
      <CardContent>
        {message ? message : ''}
        {graph ? graph : ''}
      </CardContent>
    </Card>
  )
}

export default observer(HUDCard)
