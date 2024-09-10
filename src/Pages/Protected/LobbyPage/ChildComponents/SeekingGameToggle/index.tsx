import { useState } from 'react'
import { FormControlLabel, FormGroup, Switch, useTheme } from '@mui/material'
import { useNodotsPlayer } from '../../../../../Contexts/Player/useNodotsPlayer'
import {
  PlayerActionTypes,
  playerActionSetSeekingGame,
} from '../../../../../Contexts/Player/PlayerContextActions'
import { PlayerReady } from '../../../../../../nodots_modules/backgammon-types'

interface Props {
  player: PlayerReady
}

export const SeekingGameToggle = ({ player }: Props) => {
  const theme = useTheme()
  const { dispatch } = useNodotsPlayer()
  const [seekingGame, setSeekingGame] = useState<boolean>(player.isSeekingGame)

  const handleChange = async (e: React.ChangeEvent) => {
    console.log('[SeekingGameToggle] handleChange:', player)
    switch (player.kind) {
      case 'player-ready':
        console.log('[SeekingGameToggle] handleChange player-ready:', player)
        setSeekingGame(!seekingGame)
        await playerActionSetSeekingGame(player, !seekingGame).then(
          (player) => {
            console.log(
              '[SeekingGameToggle] handleChange back from playerActionSetSeekingGame:',
              player
            )
          }
        )
        break
      default:
        console.log('Player not seeking game')
    }
    // switch (state.player.kind) {
    //   case 'player-ready':
    //     SetPlayerSeekingGame(state.player).then((player) => {
    //       player.isSeekingGame = !player.isSeekingGame
    //       dispatch({
    //         type: PlayerActionTypes.SET_PLAYER,
    //         payload: state.player,
    //       })
    //     })

    //     break
    //   default:
    //     console.error('Player is not ready to play')
    // }
  }

  return (
    <FormGroup
      sx={{
        width: '24vw',
      }}
    >
      <FormControlLabel
        control={<Switch checked={seekingGame} onChange={handleChange} />}
        label={`Ready to play?`}
        labelPlacement="end"
      />
    </FormGroup>
  )
}
