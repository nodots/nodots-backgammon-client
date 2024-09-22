import { FormControlLabel, FormGroup, Switch, useTheme } from '@mui/material'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'
import {
  PlayerActions,
  PlayerActionTypes,
} from '../../../../Contexts/Player/playerActions'
import { Loading } from '../../../../Components/utils/Loading'
import { togglePlayerSeekingGame } from '../../../../Contexts/Player/playerHelpers'
import { NodotsPlayerReady } from '../../../../../nodots_modules/backgammon-types'
import { useState } from 'react'

const setSeekingGameAction = async (
  player: NodotsPlayerReady,
  dispatch: React.Dispatch<PlayerActions>
): Promise<NodotsPlayerReady> => {
  console.log('[SeekingGameToggle] setSeekingGame player:', player)
  const updatedPlayer = await togglePlayerSeekingGame(player)
  console.log(
    '[SeekingGameToggle] setSeekingGame updatedPlayer:',
    updatedPlayer
  )
  dispatch({
    type: PlayerActionTypes.TOGGLE_PLAYER_SEEKING_GAME,
    payload: { seekingGame: updatedPlayer.isSeekingGame },
  })
  return updatedPlayer
}

export const SeekingGameToggle = () => {
  const { state, dispatch } = usePlayerContext()
  const { player } = state
  const [isSeekingGame, setIsSeekingGame] = useState<boolean>(
    player.isSeekingGame || false
  )

  const handleChange = async () => {
    switch (player.kind) {
      case 'initializing':
      case 'playing':
        break
      case 'ready':
        console.log('[SeekingGameToggle] handleChange player:', player)
        const updatedPlayer = await setSeekingGameAction(player, dispatch)
        setIsSeekingGame(updatedPlayer.isSeekingGame)
        break
    }
  }

  switch (player.kind) {
    case 'initializing':
      return <Loading message="Seeking Game Toggle Loading" />
    case 'playing':
      return <div>Error: {player.email}</div>
    case 'ready':
      return (
        <FormGroup
          sx={{
            width: '24vw',
          }}
        >
          <FormControlLabel
            control={<Switch checked={isSeekingGame} onChange={handleChange} />}
            label={'Seeking Game'}
            labelPlacement="end"
          />
        </FormGroup>
      )
  }
}
