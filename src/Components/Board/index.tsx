import { Paper, Box } from '@mui/material'
// Hooks
import { useGame } from '../../game/useGame'

// Types
import {
  Quadrant as QuadrantType,
  QuadrantLocation,
} from '../Quadrant/state/types'

// Components
import Quadrant, { PointLabelContainer } from '../Quadrant'
import Rail from '../Bar'
import Off from '../Off'
import RollSurface from '../Rollsurface'
import Cube from '../Cube'
import Die from '../Die'
import Checker from '../Checker'

import './board.scss'
import { generateId } from '../../game/game'

const Board = () => {
  const { game } = useGame()
  const { players, cube, board } = game

  return (
    <div id="BoardContainer">
      <div id="West" className="board-half">
        <div className="point-labels north west">
          <div className="point-label">13</div>
          <div className="point-label">14</div>
          <div className="point-label">15</div>
          <div className="point-label">16</div>
          <div className="point-label">17</div>
          <div className="point-label">18</div>
        </div>
        <div className="quadrant north west">
          <div className="point even">
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
          </div>
          <div className="point odd"></div>
          <div className="point even"></div>
          <div className="point odd"></div>
          <div className="point even">
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
          </div>
          <div className="point odd"></div>
        </div>
        <div className="rollsurface clockwise">
          <Die order={0} color="black" value={1} />
          <Die order={1} color="black" value={1} />
        </div>
        <div className="quadrant south west">
          <div className="point even">
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
          </div>
          <div className="point odd"></div>
          <div className="point even"></div>
          <div className="point odd"></div>
          <div className="point even">
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
          </div>
          <div className="point odd"></div>
        </div>
        <div className="point-labels south west">
          <div className="point-label">7</div>
          <div className="point-label">8</div>
          <div className="point-label">9</div>
          <div className="point-label">10</div>
          <div className="point-label">11</div>
          <div className="point-label">12</div>
        </div>
      </div>
      <div id="Bar">
        <div className="clockwise"></div>
        <div className="counterclockwise"></div>
      </div>
      <div id="East" className="board-half">
        <div className="point-labels north east">
          <div className="point-label">19</div>
          <div className="point-label">20</div>
          <div className="point-label">21</div>
          <div className="point-label">22</div>
          <div className="point-label">23</div>
          <div className="point-label">24</div>
        </div>
        <div className="quadrant north east">
          <div className="point even">
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
          </div>
          <div className="point odd"></div>
          <div className="point even"></div>
          <div className="point odd"></div>
          <div className="point even"></div>
          <div className="point odd">
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
          </div>
        </div>
        <div className="rollsurface counterclockwise">
          <Die order={0} color="white" value={1} />
          <Die order={1} color="white" value={1} />
        </div>
        <div className="quadrant south east">
          <div className="point even">
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
            <Checker checker={{ id: generateId(), color: 'white' }} />
          </div>
          <div className="point odd"></div>
          <div className="point even"></div>
          <div className="point odd"></div>
          <div className="point even"></div>
          <div className="point odd">
            <Checker checker={{ id: generateId(), color: 'black' }} />
            <Checker checker={{ id: generateId(), color: 'black' }} />
          </div>
        </div>
        <div className="point-labels south east">
          <div className="point-label">1</div>
          <div className="point-label">2</div>
          <div className="point-label">3</div>
          <div className="point-label">4</div>
          <div className="point-label">5</div>
          <div className="point-label">6</div>
        </div>
      </div>
      <div id="Off">
        <div className="checkerbox clockwise"></div>
        <Cube />
        <div className="checkerbox counterclockwise"></div>
      </div>
    </div>
  )

  // if (board) {
  //   const nwQuadrant = board.quadrants.find(
  //     (q) => q.location === QuadrantLocation.NW
  //   ) as QuadrantType
  //   const neQuadrant = board.quadrants.find(
  //     (q) => q.location === QuadrantLocation.NE
  //   ) as QuadrantType
  //   const swQuadrant = board.quadrants.find(
  //     (q) => q.location === QuadrantLocation.SW
  //   ) as QuadrantType
  //   const seQuadrant = board.quadrants.find(
  //     (q) => q.location === QuadrantLocation.SE
  //   ) as QuadrantType
  //   return (
  //     <span className="board">
  //       <Paper className="board-half west" elevation={4}>
  //         <PointLabelContainer
  //           quadrant={nwQuadrant}
  //           startingPosition={13}
  //           quadrantLocation={QuadrantLocation.NW}
  //         />
  //         <Quadrant
  //           quadrant={nwQuadrant}
  //           startingPosition={13}
  //           quadrantLocation={QuadrantLocation.NW}
  //         />
  //         <Box className="roll-surface">
  //           {players.black && <RollSurface color="black" />}
  //         </Box>
  //         <Quadrant
  //           quadrant={swQuadrant}
  //           startingPosition={7}
  //           quadrantLocation={QuadrantLocation.SW}
  //         />
  //         <PointLabelContainer
  //           quadrant={swQuadrant}
  //           startingPosition={7}
  //           quadrantLocation={QuadrantLocation.SW}
  //         />
  //       </Paper>
  //       <Paper className="bar" elevation={4}>
  //         <Paper className="pip-count black">{players.black.pipCount}</Paper>
  //         <Paper className="bar-checker-box white">
  //           <Rail bar={game.board.bar.black} />
  //         </Paper>
  //         <Paper className="bar-checker-box black">
  //           <Rail bar={game.board.bar.white} />
  //         </Paper>
  //         <Paper className="pip-count white">{players.white.pipCount}</Paper>
  //       </Paper>
  //       <Paper className="board-half east" elevation={4}>
  //         <PointLabelContainer
  //           quadrant={neQuadrant}
  //           startingPosition={19}
  //           quadrantLocation={QuadrantLocation.NE}
  //         />
  //         <Quadrant
  //           quadrant={neQuadrant}
  //           startingPosition={19}
  //           quadrantLocation={QuadrantLocation.NE}
  //         />
  //         <Box className="roll-surface">
  //           {players.white && <RollSurface color="white" />}
  //         </Box>
  //         <Quadrant
  //           quadrant={seQuadrant}
  //           startingPosition={1}
  //           quadrantLocation={QuadrantLocation.SW}
  //         />
  //         <PointLabelContainer
  //           quadrant={seQuadrant}
  //           startingPosition={1}
  //           quadrantLocation={QuadrantLocation.SW}
  //         />
  //       </Paper>
  //       <Paper className="off-container" elevation={4}>
  //         <Box className="off-container-inner">
  //           <Paper className="dice-container black">
  //             {game.players.white.active && (
  //               <>
  //                 <Die order={0} value={1} color="black" />
  //                 <Die order={1} value={1} color="black" />
  //               </>
  //             )}
  //           </Paper>
  //           <Paper className="cube-container">
  //             {game.cube.owner === 'black' && <Cube />}
  //           </Paper>
  //           <Paper className="off-checker-box black">
  //             <Off off={game.board.off.black} />
  //           </Paper>
  //           <Paper className="cube-container">
  //             {game.cube.owner === undefined && <Cube />}
  //           </Paper>
  //           <Paper className="off-checker-box white">
  //             <Off off={game.board.off.white} />
  //           </Paper>
  //           <Paper className="cube-container">
  //             {game.cube.owner === 'white' && <Cube />}
  //           </Paper>
  //           <Paper className="dice-container white">
  //             {game.players.black.active && (
  //               <>
  //                 <Die order={0} value={1} color="white" />
  //                 <Die order={1} value={1} color="white" />
  //               </>
  //             )}
  //           </Paper>
  //         </Box>
  //       </Paper>
  //     </span>
  //   )
  // } else {
  //   return <h1>No Game Set</h1>
  // }
}

export default Board
