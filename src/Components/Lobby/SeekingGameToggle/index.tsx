import React, { useEffect, useState } from 'react'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import { FormControlLabel, FormGroup, Switch, useTheme } from '@mui/material'

interface Props {
  handleSeekingGameChange: (e: React.MouseEvent, seekingGame: boolean) => void
}

function SeekingGameToggle({ handleSeekingGameChange }: Props) {
  const theme = useTheme()
  const { togglePlayerSeekingGame } = useNodotsGame()
  const [seekingGame, setSeekingGame] = useState<boolean>(false)
  const playerId = sessionStorage.getItem('playerId')

  const handleChange = (e: React.ChangeEvent) => {
    setSeekingGame((prev) => !prev)
    playerId &&
      togglePlayerSeekingGame(
        playerId,
        seekingGame ? 'player-seeking-game' : 'player-initialized'
      )
  }

  const switchLabelStyle = () => {
    if (seekingGame) {
      return { color: theme.palette.secondary.dark, float: 'left' }
    } else {
      return { color: theme.palette.secondary.light, float: 'left' }
    }
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={seekingGame} onChange={handleChange} />}
        label={`Ready to play?`}
        labelPlacement="end"
        sx={switchLabelStyle}
      />
    </FormGroup>
  )
}

export default SeekingGameToggle
