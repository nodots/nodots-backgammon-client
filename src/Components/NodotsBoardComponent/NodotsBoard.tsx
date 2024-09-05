import useNodotsGame from '../../Contexts/Game/GameHook'

export const NodotsBoard = () => {
  const { game, getColorsByDirection } = useNodotsGame()
  console.log('[NodotsBoard] game:', game)
  return <>NodotsBoard</>
  // switch (game?.kind) {
  //   case 'game-initializing':
  //   case 'game-initialized':
  //   case 'game-rolling-for-start':
  //     return <>Loading Game . . .</>
  //   case 'game-playing-rolling':
  //   case 'game-playing-moving':
  //     const _game = game as unknown as GamePlayingRolling | GamePlayingMoving // FIXME: This is a hack
  //     const directionColors = {
  //       clockwiseColor: 'black' as NodotsColor,
  //       counterclockwiseColor: 'white' as NodotsColor,
  //     }
  //     console.log('[NodotsBoard] game:', _game)

  //     return _game ? (
  //       <Paper id="BoardContainer" elevation={2}>
  //         <Paper
  //           id="West"
  //           className="board-half counterclockwise"
  //           elevation={1}
  //         >
  //           <NodotsQuadrantComponent
  //             board={_game.board}
  //             latitude="north"
  //             longitude="west"
  //             start={13}
  //             points={_game.board.points.slice(12, 18) as QuadrantPoints}
  //           />
  //           <NodotsRollSurfaceComponent
  //             color={directionColors.counterclockwiseColor}
  //           />
  //           <NodotsQuadrantComponent
  //             board={_game.board}
  //             latitude="south"
  //             longitude="west"
  //             start={7}
  //             points={_game.board.points.slice(6, 12) as QuadrantPoints}
  //           />
  //         </Paper>
  //         <NodotsBarComponent />
  //         <Paper id="East" className="board-half" elevation={1}>
  //           <NodotsQuadrantComponent
  //             board={_game.board}
  //             latitude="north"
  //             longitude="east"
  //             start={19}
  //             points={_game.board.points.slice(18, 24) as QuadrantPoints}
  //           />
  //           <NodotsRollSurfaceComponent
  //             color={directionColors.clockwiseColor}
  //           />
  //           <NodotsQuadrantComponent
  //             board={_game.board}
  //             latitude="south"
  //             longitude="east"
  //             start={1}
  //             points={_game.board.points.slice(0, 6) as QuadrantPoints}
  //           />
  //         </Paper>
  //         <NodotsOffComponent />
  //       </Paper>
  //     ) : (
  //       <>No Game</>
  //     )
  // }
}
