import { NodotsGameStore } from '../../../../stores/Game/Store'
import { NodotsChecker } from '../../../../stores/Game/types/Checker'

export class CheckerEventHandler {
  public checker: NodotsChecker
  public store: NodotsGameStore

  constructor(checker: NodotsChecker, store: NodotsGameStore) {
    this.checker = checker
    this.store = store
  }

  click = (e: React.MouseEvent) => {
    console.log('[Handler Checker] click e:', e)
    console.log('[Handler Checker] click checker:', this.checker)
    console.log('[Handler Checker] click store:', this.store)
  }

  doubleClick = (e: React.MouseEvent) => {
    console.warn('[CheckerEventHandler NOT IMPLEMENTED] doubleclick e:', e)
    console.warn(
      '[CheckerEventHandler NOT IMPLEMENTED] doubleclick checker:',
      this.checker
    )
    console.warn(
      '[CheckerEventHandler NOT IMPLEMENTED] doubleclick store:',
      this.store
    )
  }
}
