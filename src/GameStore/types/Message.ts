import { NodotsMoves, NodotsMove } from './move'
import { getLastMove } from './move/helpers'

import { Point } from './Checkercontainer'
import { NodotsPlayer } from './Player'

export interface NodotsMessage {
  game?: string
  debug?: string
  players?: {
    white?: string
    black?: string
  }
}

export const buildMoveMessage = () => {
  console.warn('[GameStore NOT IMPLEMENTED] types/Message buildMoveMessage')
  return undefined
}
// export const buildMoveMessage = (
//   player: NodotsPlayer,
//   moves: NodotsMoves
// ): NodotsMessage | undefined => {
//   const lastMove = getLastMove(moves) as NodotsMove
//   let msgString = `${player.username} moves `
//   if (!lastMove || !lastMove.from) {
//     //noop
//   } else {
//     switch (lastMove.from.kind) {
//       case 'point':
//         const fromPoint = lastMove.from as Point
//         msgString += ` from ${fromPoint.position[player.direction]}`
//         if (lastMove.to && lastMove.to.kind === 'point') {
//           const toPoint = lastMove.to as Point
//           msgString += ` to ${toPoint.position[player.direction]}`
//         }
//         break
//       case 'bar':
//         msgString += ` bar to ${lastMove.dieValue}`
//         break
//       default:
//         msgString += `from ${JSON.stringify(lastMove.from)} to ${JSON.stringify(
//           lastMove.to
//         )}`
//     }
//   }

//   return {
//     game: msgString,
//   }
// }
