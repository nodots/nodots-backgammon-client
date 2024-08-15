import { Paper } from '@mui/material'
import { QuadrantPoints } from '.'
import { NodotsGameStateReady } from '../../../nodots_modules/backgammon-types/index'
import NodotsQuadrantComponent from './NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from './NodotsRollSurfaceComponent'
import NodotsOffComponent from './NodotsOffComponent/NodotsOffComponent'
import useNodotsGame from '../../Hooks/GameHook'
import NodotsBarComponent from './NodotsBarComponent'

export const NodotsBoardComponent = () => {
  const { game } = useNodotsGame()
  // const _game = game as NodotsGameStateReady
  return <>game: {game?.kind}</>

  // return (
  //   <Paper id="BoardContainer" elevation={2}>
  //     <Paper id="West" className="board-half counterclockwise" elevation={1}>
  //       <NodotsQuadrantComponent
  //         board={_game.board}
  //         latitude="north"
  //         longitude="west"
  //         start={13}
  //         points={_game.board.points.slice(12, 18) as QuadrantPoints}
  //       />
  //       <NodotsRollSurfaceComponent color={counterclockwiseColor} />
  //       <NodotsQuadrantComponent
  //         board={_game.board}
  //         latitude="south"
  //         longitude="west"
  //         start={7}
  //         points={_game.board.points.slice(6, 12) as QuadrantPoints}
  //       />
  //     </Paper>
  //     <NodotsBarComponent />
  //     <Paper id="East" className="board-half" elevation={1}>
  //       <NodotsQuadrantComponent
  //         board={_game.board}
  //         latitude="north"
  //         longitude="east"
  //         start={19}
  //         points={_game.board.points.slice(18, 24) as QuadrantPoints}
  //       />
  //       <NodotsRollSurfaceComponent color={clockwiseColor} />
  //       <NodotsQuadrantComponent
  //         board={_game.board}
  //         latitude="south"
  //         longitude="east"
  //         start={1}
  //         points={_game.board.points.slice(0, 6) as QuadrantPoints}
  //       />
  //     </Paper>
  //     <NodotsOffComponent />
  //   </Paper>
  // )
}
