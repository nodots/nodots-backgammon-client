import NodotsGameStore from '../../../GameStore'
import { Cube } from '../../../GameStore/types/Cube'

export class CubeEventHandler {
  public cube: Cube
  public store: NodotsGameStore

  constructor(cube: Cube, store: NodotsGameStore) {
    this.cube = cube
    this.store = store
  }

  click = (e: React.MouseEvent) => {
    console.log('[CubeEventHandler] click e:', e)
    console.log('[CubeEventHandler] click cube:', this.cube)
    console.log('[CubeEventHandler] click store:', this.store)

    switch (this.store.state.kind) {
      case 'game-rolling':
        this.store.doubling(this.store.state)
        break
      default:
        console.warn(
          '[CubeEventHandler] state in which I have no business:',
          this.store.state.kind
        )
    }
  }

  doubleClick = (e: React.MouseEvent) => {
    console.warn('[CubeEventHandler NOT IMPLEMENTED] doubleclick e:', e)
    console.warn(
      '[CubeEventHandler NOT IMPLEMENTED] doubleclick cube:',
      this.cube
    )
    console.warn(
      '[CubeEventHandler NOT IMPLEMENTED] doubleclick store:',
      this.store
    )
  }
}
