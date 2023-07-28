import { useGame } from '../../hooks/useGame'
import { Checker as CheckerModel } from '../../Models'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'
import React from 'react'
import { MOVE_STATUS } from '../../State/Game.State'

export interface CheckerProps {
  checker: CheckerModel
}

const Checker = (props: CheckerProps) => {
  const { players, activeColor, activeMove } = useGame()
  const classes = `checker ${props.checker.color}`

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // if (!players[props.checker.color].active &&
    //   (
    //     activeColor !== props.checker.color &&
    //     activeMove.status !== MOVE_STATUS.ORIGIN_SET
    //   )
    // ) {
    //   e.stopPropagation()
    //   return alert('This is not your checker')
    // }

  }

  return <div className={classes} id={props.checker.id} onClick={handleClick}><RadioButtonCheckedTwoToneIcon sx={{ fill: 'rgba(69, 109, 157, .4)' }} /></div>
}

export default Checker