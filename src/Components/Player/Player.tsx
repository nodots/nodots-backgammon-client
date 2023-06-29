import { Card, CardHeader, CardContent } from '@mui/material'
import { Player as PlayerModel, Color } from '../../Models/Backgammon'

interface PlayerProps {
  player: PlayerModel
}

const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  console.log(e)
  e.preventDefault()
}

const Player = (props: PlayerProps) => {
  let classes = 'player-info-card'
  if (props.player.active) {
    classes += ' active'
  }
  return <Card className={classes} onClick={clickHandler}>
    <CardHeader title={props.player.nickName} />
    <CardContent>
      <div>Checker Color: {props.player.color.toString()}</div>
      <div>Active: {props.player.active.toString()} </div>
      <div>PIPS: 167</div>


    </CardContent>
  </Card>

}

export default Player