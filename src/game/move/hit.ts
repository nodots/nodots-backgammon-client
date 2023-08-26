import { produce } from 'immer'
import { GameError } from '../game'
import { Checker, isChecker } from '../../components/Checker/state'
import { Rail } from '../../components/Rail/state/types'

export const hit = (rail: Rail, checker: Checker): Rail => {
  if (!isChecker(checker)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid Checker'
    })
  }

  const newRail = produce(rail, draft => {
    draft.checkers.push(checker)
  })

  return newRail
}
