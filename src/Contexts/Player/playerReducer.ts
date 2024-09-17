import { PlayerAction, PlayerActionType, PlayerState } from './playerActions'

export const playerReducer = (
  state: PlayerState,
  action: PlayerAction
): PlayerState => {
  const { player, type } = action
  switch (action.type) {
    case PlayerActionType.SET_PLAYER:
      console.log('[playerReducer] SET_PLAYER player:', player)
      return {
        ...state,
        player,
      }
    default:
      return state
  }
}
