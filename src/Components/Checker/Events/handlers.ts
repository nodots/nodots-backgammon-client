import NodotsGameStore from '../../../GameStore'
import { Checker } from '../../../GameStore/types/Checker'

export class CheckerEventHandler {
  public checker: Checker
  public store: NodotsGameStore

  constructor(checker: Checker, store: NodotsGameStore) {
    this.checker = checker
    this.store = store
  }

  click = (e: React.MouseEvent) => {
    console.log('[CheckerEventHandler] click e:', e)
    console.log('[CheckerEventHandler] click checker:', this.checker)
    console.log('[CheckerEventHandler] click store:', this.store)

    switch (this.store.state.kind) {
      case 'game-rolled':
      case 'game-moving':
        console.log(
          `[CheckerEventHandler] ${this.store.state.kind} calling moving`
        )
        this.store.moving(this.store.state, this.checker.id)
        break
      default:
        console.warn(
          '[CheckerEventHandler] state in which I have no business:',
          this.store.state.kind
        )
    }
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
