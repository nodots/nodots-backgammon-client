import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import NodotsGameStore from '../../GameStore'
import { Color, Moving, NodotsGameState } from '../../GameStore/types'
import { DieOrder } from '../../GameStore/types/Dice'

const paths = [
  'M92.57,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.57A7.43,7.43,0,0,0,100,92.58V7.42A7.43,7.43,0,0,0,92.57,0ZM50,59.87A9.87,9.87,0,1,1,59.86,50,9.87,9.87,0,0,1,50,59.87Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.85,9.85,0,0,1,24.75,85.1Zm50.5-50.49a9.86,9.86,0,1,1,9.85-9.86A9.86,9.86,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.85,9.85,0,0,1,24.75,85.1ZM50,59.86A9.86,9.86,0,1,1,59.86,50,9.86,9.86,0,0,1,50,59.86ZM75.25,34.61a9.86,9.86,0,1,1,9.85-9.86A9.87,9.87,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.86,9.86,0,0,1,24.75,85.1Zm0-50.49a9.86,9.86,0,1,1,9.86-9.86A9.86,9.86,0,0,1,24.75,34.61ZM75.25,85.1a9.86,9.86,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.25,85.1Zm0-50.49a9.86,9.86,0,1,1,9.85-9.86A9.85,9.85,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.77,85.08a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,24.77,85.08Zm0-50.46a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,24.77,34.62ZM50,59.85A9.85,9.85,0,1,1,59.85,50,9.85,9.85,0,0,1,50,59.85ZM75.23,85.08a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.23,85.08Zm0-50.46a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.23,34.62Z',
  'M92.57,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.57A7.43,7.43,0,0,0,100,92.58V7.42A7.43,7.43,0,0,0,92.57,0ZM24.75,85.11a9.86,9.86,0,1,1,9.86-9.86A9.85,9.85,0,0,1,24.75,85.11Zm0-25.25A9.86,9.86,0,1,1,34.61,50,9.85,9.85,0,0,1,24.75,59.86Zm0-25.25a9.86,9.86,0,1,1,9.86-9.86A9.86,9.86,0,0,1,24.75,34.61Zm50.5,50.5a9.86,9.86,0,1,1,9.85-9.86A9.85,9.85,0,0,1,75.25,85.11Zm0-25.25A9.86,9.86,0,1,1,85.1,50,9.85,9.85,0,0,1,75.25,59.86Zm0-25.25a9.86,9.86,0,1,1,9.85-9.86A9.86,9.86,0,0,1,75.25,34.61Z',
]

interface Props {
  store: NodotsGameStore
  state: NodotsGameState
  order: DieOrder
  color: Color
}

// TODO: Show move state with dice
function Die({ order, color, store }: Props) {
  const { state } = store

  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()

    switch (state.kind) {
      case 'game-moving':
        break
      case 'game-rolling':
        store.rolling(state)
        break
      case 'game-confirming-play':
        store.confirming(state)
        break
      case 'game-completed':
      default:
      //noop
    }
  }

  const theme = useTheme()
  const fill = (color: Color) => {
    return color === 'white'
      ? theme.palette.secondary.light
      : theme.palette.secondary.dark
  }

  switch (store.state.kind) {
    case 'game-rolling-for-start':
    case 'game-initializing':
      return <></>
    case 'game-rolling':
      return (
        store.state.activeColor === color && (
          <Button className="die" onClick={rollHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d={paths[0]} fill={fill(color)} />
                </g>
              </g>
            </svg>
          </Button>
        )
      )
    case 'game-moving':
    case 'game-rolled':
    case 'game-dice-switched':
    case 'game-confirming-play':
      const { roll } = state as Moving // FIXME
      return (
        store.state.activeColor === color && (
          <Button className="die" onClick={rollHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d={paths[roll[order] - 1]} fill={fill(color)} />
                </g>
              </g>
            </svg>
          </Button>
        )
      )
  }
}

export default observer(Die)
