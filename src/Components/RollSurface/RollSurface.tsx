import { useGame } from '../../State'
import { useState, useEffect } from 'react'
import { Player, DieValue, Game } from '../../Models'
import Die from '../Die/Die'

interface RollSurfaceProps {
  player: Player
}

const RollSurface = (props: RollSurfaceProps) => {
  const { players, activeMove, toggleActivePlayer } = useGame()
  const [dieOne, setDieOne] = useState<DieValue>(1)
  const [dieTwo, setDieTwo] = useState<DieValue>(1)
  const [isRollForStart, setIsRollForStart] = useState<boolean>(false)

  useEffect(() => {
    if (!players.white.active && !players.black.active) {
      setIsRollForStart(true)
    }
  }, [players])

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log(activeMove)
    if (!activeMove.origin && !activeMove.destination) {
      console.log('Toggling active player')
      toggleActivePlayer()
    } else {
      // TODO: Refactor to use dispatch
      const rollResults: [DieValue, DieValue] = props.player.roll()
      setDieOne(rollResults[0])
      setDieTwo(rollResults[1])

    }
  }

  // TODO: Eventually animate rollForStart process
  console.log(`${props.player.color}.active? = ${players[props.player.color].active.toString()}`)
  return <div className='roll-surface' onClick={clickHandler} >
    {players[props.player.color].active &&
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