import React from 'react'
import {
  CheckerContainer as CheckerContainerModel,
  Checker as CheckerModel
} from '../../Models/Backgammon'
import Checker from '../Checker/Checker'

interface CheckerContainerProps {
  checkerContainer: CheckerContainerModel
}

const CheckerContainer = (props: CheckerContainerProps) => {
  const checkers: React.JSX.Element[] = []
  props.checkerContainer.checkers.forEach(c => {
    checkers.push(<Checker checker={c} />)
  })
  return <div className='checker-container' >
    {checkers}
  </ div>
}

export default CheckerContainer