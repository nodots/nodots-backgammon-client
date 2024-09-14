import { useState } from 'react'
import { FormControlLabel, FormGroup, Switch, useTheme } from '@mui/material'
import { useNodotsPlayer } from '../../../../../Contexts/Player/useNodotsPlayer'
import { PlayerActionTypes } from '../../../../../Contexts/Player/PlayerContextActions'
import {
  NodotsPlayer,
  PlayerReady,
} from '../../../../../../nodots_modules/backgammon-types'

interface Props {
  player: PlayerReady
}

export const SeekingGameToggle = ({ player }: Props) => {
  const theme = useTheme()
  const [seekingGame, setSeekingGame] = useState<boolean>(player.isSeekingGame)

  const handleChange = async (e: React.ChangeEvent) => {
    console.log('[SeekingGameToggle] handleChange:', player)
    switch (player.kind) {
      case 'player-ready':
        console.log('[SeekingGameToggle] handleChange player-ready:', player)
        setSeekingGame(!player.isSeekingGame)
        // await playerActionSetSeekingGame(player, !player.isSeekingGame).then(
        //   (player) => {
        //     console.log(
        //       '[SeekingGameToggle] handleChange back from playerActionSetSeekingGame:',
        //       player
        //     )
        //   }
        // )
        break
      default:
        console.log('Player not seeking game')
    }
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
