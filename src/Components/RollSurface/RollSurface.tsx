import { useGame } from '../../State'
import { useState, useEffect } from 'react'
import { Player, DieValue, Game } from '../../Models'
import Die from '../Die/Die'

interface RollSurfaceProps {
  player: Player
}

const RollSurface = (props: RollSurfaceProps) => {
  const { players } = useGame()
  const [dieOne, setDieOne] = useState<DieValue>(1)
  const [dieTwo, setDieTwo] = useState<DieValue>(1)
  const [isRollForStart, setIsRollForStart] = useState<boolean>(false)

  useEffect(() => {
    if (!players.white.active && !players.black.active) {
      setIsRollForStart(true)
    }
  }, [])

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const rollResults: [DieValue, DieValue] = props.player.roll()
    setDieOne(rollResults[0])
    setDieTwo(rollResults[1])
  }

  // TODO: Eventually animate rollForStart process
  return <div className='roll-surface' onClick={clickHandler} >
    {props.player.active &&
      <>
        <Die color={props.player.color} value={dieOne} />
        <Die color={props.player.color} value={dieTwo} />
      </>
    }
    {isRollForStart &&
      <Die color={props.player.color} value={dieOne} />
    }

  </div>
}

export default RollSurface