import React from 'react'
import type {
  CheckerBox as CheckerBoxModel,
  Checker as CheckerModel
} from '../../Models/Backgammon'
import Checker from '../Checker/Checker'

interface CheckerBoxProps {
  checkerBox: CheckerBoxModel
}

const CheckerBox = (props: CheckerBoxProps) => {
  const checkers: React.JSX.Element[] = []
  props.checkerBox.checkers.forEach((c: CheckerModel) => {
    checkers.push(<Checker checker={c} key={c.id} />)
  })
  return <div className='checker-box' >
    {checkers}
  </ div>
}

export default CheckerBox