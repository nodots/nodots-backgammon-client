import { useGame } from '../../State'
import { useEffect, useState } from 'react'
import { Player } from '../../Models'
import Die from '../Die/Die'

interface RollSurfaceProps {
  player: Player
}

const RollSurface = (props: RollSurfaceProps) => {
  const { dice, players, activeColor, activeMove, debug, roll, finalizeMove } = useGame()
  const [isRollForStart, setIsRollForStart] = useState<boolean>(false)

  const player = players[props.player.color]
  console.log(`[ROLL_SURFACE COMPONENT] dice:[${props.player.color}]`, dice[props.player.color])


  // FIXME: This is a mess . . .
  useEffect(() => {
    if (!players.white.active && !players.black.active) {
      setIsRollForStart(true)
    }
  }, [players])


  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (debug) {
      console.log(`[ROLL_SURFACE COMPONENT] clickHandler activeMove:`)
      console.log('[ROLL_SURFACE COMPONENT]', activeMove)

    }
    if (activeMove && activeMove.checker1.origin && activeMove.checker1.destination && activeMove.checker2.origin && activeMove.checker2.destination) {
      finalizeMove(activeColor)
    } else {
      roll(activeColor)
    }
  }
  // TODO: Eventually animate rollForStart process
  if (debug) {
    console.log(`${props.player.color}.active? = ${players[props.player.color].active.toString()}`)
  }
  return <div className='roll-surface' onClick={clickHandler} >
    {player.active && player.dice && props.player.color === activeColor &&
      <>
        <Die color={props.player.color} order={1} value={players[props.player.color].dice[0].value} />
        <Die color={props.player.color} order={2} value={players[props.player.color].dice[1].value} />
      </>
    }
    {
      isRollForStart && player.dice &&
      <Die color={props.player.color} order={1} />
    }
  </div >
}

export default RollSurface