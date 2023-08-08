import { produce } from 'immer'
import { createContext, useReducer } from 'react'

import { Board } from './components/Board/state/types'
import { initBoardState } from './components/Board/state/board.state'
// import { reducer as boardReducer } from './components/Board/state/reducers'

import { Dice } from './components/Die/state/dice.state'
import { initDiceState } from './components/Die/state/dice.state'
import { roll } from './components/Die/state/types'
// import { reducer as diceReducer } from './components/Die/state/reducers'

import { Cube, CubeValue, } from './components/Cube/state/types'
import { initCubeState, CUBE_ACTION_TYPE } from './components/Cube/state/cube.state'
import { reducer as cubeReducer } from './components/Cube/state/reducers'

import { Color, generateId } from './models'
import { Player, Turn } from './components/Player/state/types'

import { SetCubeValuePayload } from './components/Cube/state/cube.context'
export type Game = {
  board: Board,
  dice: Dice,
  cube: Cube,
  players: {
    black: Player,
    white: Player,
  }
  activeColor?: Color
  activeTurn?: Turn
  setCubeValue?: (value: CubeValue) => CubeValue
}

// FIXME: needs to be from user input
const blackPlayer: Player = {
  id: generateId(),
  color: 'black',
  active: false,
  dice: initDiceState.black
}

const whitePlayer: Player = {
  id: generateId(),
  color: 'white',
  active: false,
  dice: initDiceState.white
}

function rollForStart (white: Player, black: Player): Player {
  const whiteRoll = roll()
  const blackRoll = roll()
  // no ties
  if (whiteRoll === blackRoll) {
    rollForStart(white, black)
  }
  return blackRoll > whiteRoll ? black : white
}

const winner = rollForStart(whitePlayer, blackPlayer)

winner.color === 'black' ? blackPlayer.active = true : whitePlayer.active = true

export const initialGameState: Game = {
  board: initBoardState,
  dice: initDiceState,
  cube: initCubeState,
  activeColor: winner.color,
  players: {
    black: blackPlayer,
    white: whitePlayer,
  },
}

export const reducer = (state: Game, action: any): Game => {
  const { type, payload } = action
  console.log('[Game Context] reducer params state', state)
  console.log('[Game Context] reducer params action.type', type)
  console.log('[Game Context] reducer params action.payload', payload)
  switch (type) {
    case CUBE_ACTION_TYPE.SET_CUBE_VALUE:
      {
        const newCube = cubeReducer(state.cube, action)
        const newState = produce(state, draft => {
          draft.cube = newCube
        })
        return newState
      }
    default:
      return state

  }

}



export const useGameContext = (initialState: Game) => {
  const [game, dispatch] = useReducer(reducer, initialGameState)

  const setCubeValue = (payload: SetCubeValuePayload) => dispatch({ type: CUBE_ACTION_TYPE.SET_CUBE_VALUE, payload })

  return { game, setCubeValue }
}

type UseGameContextType = ReturnType<typeof useGameContext>

const initGameContextState: UseGameContextType = {
  game: initialGameState,
  setCubeValue: () => { },
}

export const GameContext = createContext<UseGameContextType>(initGameContextState)

