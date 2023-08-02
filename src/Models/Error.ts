export type GameErrorType = 'Game' | 'Turn' | 'Move' | 'Roll' | 'Player' | 'Die' | 'Cube' | 'CheckerBox' | 'Quadrant' | 'Point' | 'RollSurface'
export class GameError extends Error {
  model: GameErrorType
  constructor ({ model, errorMessage }: { model?: GameErrorType; errorMessage: string }) {
    super(errorMessage)
    this.model = model || 'Game'
  }
}