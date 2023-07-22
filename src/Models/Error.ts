export type GameErrorType = 'Game' | 'Move' | 'Player' | 'Die' | 'Cube' | 'CheckerBox' | 'Quadrant' | 'Point'
export class GameError extends Error {
  model: GameErrorType
  constructor ({ model, errorMessage }: { model?: GameErrorType; errorMessage: string }) {
    super(errorMessage)
    this.model = model || 'Game'
  }

}