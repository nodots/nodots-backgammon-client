import { Paper } from '@mui/material'
import { QuadrantPoints } from '.'
import {
  NodotsColor,
  NodotsGameStateActive,
} from '../../../nodots_modules/backgammon-types/index'
import NodotsQuadrantComponent from './NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from './NodotsRollSurfaceComponent'
import NodotsOffComponent from './NodotsOffComponent/NodotsOffComponent'
import useNodotsGame from '../../Contexts/Game/GameHook'
import NodotsBarComponent from './NodotsBarComponent'
import { useEffect, useState } from 'react'

export interface NodotsDirectionColors {
  clockwiseColor: NodotsColor
  counterclockwiseColor: NodotsColor
}

export const NodotsBoardComponent = () => {
  const { getActiveGameById, getDirectionColors } = useNodotsGame()
  const [game, setGame] = useState<NodotsGameStateActive>()
  const [directionColors, setDirectionColors] =
    useState<NodotsDirectionColors>()
  const gameId = sessionStorage.getItem('gameId')

  useEffect(() => {
    console.log('[NodotsBoardComponent] useEffect')
    const interval = setInterval(() => {
      gameId &&
        console.log(
          '[NodotsBoardComponent] useEffect getActiveGameById gameId:',
          gameId
        )
      // getActiveGameById(gameId).then((game) => {
      //   setGame(game)
      //   const players = game.players
      //   console.log(
      //     '[NodotsBoardComponent] useEffect getActiveGameById players:',
      //     players
      //   )
      //   // const directionColors = getDirectionColors(players)
      //   // console.log(
      //   //   '[NodotsBoardComponent] useEffect getActiveGameById',
      //   //   game,
      //   //   directionColors
      //   // )
      // })
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return game && directionColors ? (
    <Paper id="BoardContainer" elevation={2}>
      <Paper id="West" className="board-half counterclockwise" elevation={1}>
        <NodotsQuadrantComponent
          board={game.board}
          latitude="north"
          longitude="west"
          start={13}
          points={game.board.points.slice(12, 18) as QuadrantPoints}
        />
        <NodotsRollSurfaceComponent
          color={directionColors.counterclockwiseColor}
        />
        <NodotsQuadrantComponent
          board={game.board}
          latitude="south"
          longitude="west"
          start={7}
          points={game.board.points.slice(6, 12) as QuadrantPoints}
        />
      </Paper>
      <NodotsBarComponent />
      <Paper id="East" className="board-half" elevation={1}>
        <NodotsQuadrantComponent
          board={game.board}
          latitude="north"
          longitude="east"
          start={19}
          points={game.board.points.slice(18, 24) as QuadrantPoints}
        />
        <NodotsRollSurfaceComponent color={directionColors.clockwiseColor} />
        <NodotsQuadrantComponent
          board={game.board}
          latitude="south"
          longitude="east"
          start={1}
          points={game.board.points.slice(0, 6) as QuadrantPoints}
        />
      </Paper>
      <NodotsOffComponent />
    </Paper>
  ) : (
    <>Board Loading...</>
  )
}
