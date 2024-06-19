import { Button, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import { DiceEventHandler } from './Events/handlers'
import { DieOrder, NodotsDie, Roll } from '../../../stores/Game/types/Dice'
import { GamePlaying, NodotsColor } from '../../../stores/Game/Types'
import { NodotsPlayer } from '../../../stores/Game/Stores/Player/Types'
import { NodotsGameStore } from '../../../stores/Game/Store'
import { PlayMoving } from '../../../stores/Game/Stores/Play/Types'

const paths = [
  'M92.57,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.57A7.43,7.43,0,0,0,100,92.58V7.42A7.43,7.43,0,0,0,92.57,0ZM50,59.87A9.87,9.87,0,1,1,59.86,50,9.87,9.87,0,0,1,50,59.87Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.85,9.85,0,0,1,24.75,85.1Zm50.5-50.49a9.86,9.86,0,1,1,9.85-9.86A9.86,9.86,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.85,9.85,0,0,1,24.75,85.1ZM50,59.86A9.86,9.86,0,1,1,59.86,50,9.86,9.86,0,0,1,50,59.86ZM75.25,34.61a9.86,9.86,0,1,1,9.85-9.86A9.87,9.87,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.75,85.1a9.86,9.86,0,1,1,9.86-9.85A9.86,9.86,0,0,1,24.75,85.1Zm0-50.49a9.86,9.86,0,1,1,9.86-9.86A9.86,9.86,0,0,1,24.75,34.61ZM75.25,85.1a9.86,9.86,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.25,85.1Zm0-50.49a9.86,9.86,0,1,1,9.85-9.86A9.85,9.85,0,0,1,75.25,34.61Z',
  'M92.58,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.58A7.42,7.42,0,0,0,100,92.58V7.42A7.42,7.42,0,0,0,92.58,0ZM24.77,85.08a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,24.77,85.08Zm0-50.46a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,24.77,34.62ZM50,59.85A9.85,9.85,0,1,1,59.85,50,9.85,9.85,0,0,1,50,59.85ZM75.23,85.08a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.23,85.08Zm0-50.46a9.85,9.85,0,1,1,9.85-9.85A9.85,9.85,0,0,1,75.23,34.62Z',
  'M92.57,0H7.42A7.42,7.42,0,0,0,0,7.42V92.58A7.42,7.42,0,0,0,7.42,100H92.57A7.43,7.43,0,0,0,100,92.58V7.42A7.43,7.43,0,0,0,92.57,0ZM24.75,85.11a9.86,9.86,0,1,1,9.86-9.86A9.85,9.85,0,0,1,24.75,85.11Zm0-25.25A9.86,9.86,0,1,1,34.61,50,9.85,9.85,0,0,1,24.75,59.86Zm0-25.25a9.86,9.86,0,1,1,9.86-9.86A9.86,9.86,0,0,1,24.75,34.61Zm50.5,50.5a9.86,9.86,0,1,1,9.85-9.86A9.85,9.85,0,0,1,75.25,85.11Zm0-25.25A9.86,9.86,0,1,1,85.1,50,9.85,9.85,0,0,1,75.25,59.86Zm0-25.25a9.86,9.86,0,1,1,9.85-9.86A9.86,9.86,0,0,1,75.25,34.61Z',
]

interface Props {
  gameStore: NodotsGameStore
  order: DieOrder
  color: NodotsColor
}

// TODO: Show move state with dice
function Die({ order, color, gameStore }: Props) {
  const die: NodotsDie = {
    kind: 'inactive',
    color,
    order,
    value: 1,
  }
  const eventHandler = React.useRef<DiceEventHandler>(
    new DiceEventHandler(die, gameStore)
  ).current
  const theme = useTheme()

  const clicker = () => {
    console.log('[Component: Dice] gameStore:', gameStore)
    switch (gameStore.state.kind) {
      case 'game-playing':
        const gameState = gameStore.state as GamePlaying //FIXME. Too much on client
        const { activeColor, players } = gameState
        const activePlayer = players[activeColor]
        const dice = activePlayer.dice

        console.log(
          '[Component: Dice] clicker game-playing activePlayer:',
          activePlayer
        )
        break
      default:
        console.warn(
          `[Component: Dice] clicker unexpected kind: ${gameStore.state.kind}`
        )
    }
    eventHandler.clickHandler()
  }

  const fill = (color: NodotsColor) => {
    return color === 'white'
      ? theme.palette.secondary.light
      : theme.palette.secondary.dark
  }

  console.log('[Component: Dice] gameStore.state.kind:', gameStore.state.kind)
  switch (gameStore.state.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
    case 'game-completed':
    case 'game-ready':
      return <></>
    case 'game-playing':
      const { playStore, activeColor } = gameStore.state as GamePlaying // FIXME
      console.log(
        '[Components: Dice] game-playing playStore.state.kind:',
        playStore.state.kind
      )
      switch (playStore.state.kind) {
        case 'play-initializing':
        case 'play-confirming':
        case 'play-dice-switched':
        case 'play-doubling':
        case 'play-moved':
          return <></>
        case 'play-rolling':
          return (
            activeColor === color && (
              <Button className="die" onClick={clicker}>
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
        case 'play-moving':
          const playState = playStore.state as PlayMoving
          console.log('[Component: Dice] play-moving playState:', playState)

          console.warn(
            '[Component] Dice play-moving playStore.state',
            playStore.state
          )
          return (
            activeColor === color && (
              <Button
                className="die"
                onClick={() => console.error('Not implemented')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        d={paths[playState.roll[order] - 1]}
                        fill={fill(color)}
                      />
                    </g>
                  </g>
                </svg>
              </Button>
            )
          )
      }
  }
}

export default observer(Die)
