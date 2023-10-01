import { produce } from 'immer'
import { GameError } from '../game'
import { Checker, isChecker } from '../../components/checker/state'
import { Bar } from '../../components/bar/state/types'

export const hit = (bar: Bar, checker: Checker): Bar => {
  if (!isChecker(checker)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid Checker'
    })
  }

  const newRail = produce(bar, draft => {
    draft.checkers.push(checker)
  })

  return newRail
}
