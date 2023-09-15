import { useGame } from '../../game/useGame'
import { useState, useEffect } from 'react'
import { Color } from '../../game'
import { GameError } from '../../game/game'
import { DieOrder, DieValue } from './state/types'

import './die.scss'

interface DieProps {
  order: DieOrder
  color: Color
  value: DieValue | undefined
}

const Die = (props: DieProps) => {
  const { game } = useGame()
  const activeColor = game.activeColor
  const [valueClass, setValueClass] = useState<string>('one')

  useEffect(() => {
    switch (props.value) {
      case 1:
        setValueClass('one')
        break
      case 2:
        setValueClass('two')
        break
      case 3:
        setValueClass('three')
        break
      case 4:
        setValueClass('four')
        break
      case 5:
        setValueClass('five')
        break
      case 6:
        setValueClass('six')
        break
      default:
        throw new GameError({ model: 'Die', errorMessage: `Invalid pips for die ${props.value}` })
    }

  }, [props.value])


  let classes = `die ${props.color.toString()} ${valueClass}`
  return <div className={classes}></div>
}

export default Die
