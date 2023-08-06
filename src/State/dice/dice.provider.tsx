import { ReactElement } from 'react'
import { initDiceState } from './dice.state'
import { DiceContext, useDiceContext } from './dice.context'

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const DiceProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <DiceContext.Provider value={useDiceContext(initDiceState)}>
      {children}
    </DiceContext.Provider>
  )
} 