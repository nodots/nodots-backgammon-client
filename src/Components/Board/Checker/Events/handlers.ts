import { NodotsGame } from '../../../../stores/Game'
import { NodotsChecker } from '../../../../stores/Game/types/Checker'

export class CheckerEventHandler {
  public checker: NodotsChecker
  public store: NodotsGame

  constructor(checker: NodotsChecker, store: NodotsGame) {
    this.checker = checker
    this.store = store
  }

  click = (e: React.MouseEvent) => {
    console.log('[CheckerEventHandler] click e:', e)
    console.log('[CheckerEventHandler] click checker:', this.checker)
    console.log('[CheckerEventHandler] click store:', this.store)
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
