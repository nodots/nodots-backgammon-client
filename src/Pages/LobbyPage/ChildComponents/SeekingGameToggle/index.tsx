import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useGameContext } from '../../../../Contexts/Game/GameContext'
import {
  setPlayer,
  togglePlayerSeekingGame,
} from '../../../../Contexts/Game/playerHelpers'

export const SeekingGameToggle = () => {
  const { game, player } = useGameContext()
  const [isSeekingGame, setIsSeekingGame] = useState(
    player?.isSeekingGame || false
  )

  useEffect(() => {
    console.log(
      '[SeekingGameToggle] useEffect player.isSeekingGame:',
      player?.isSeekingGame
    )
  }, [player])

  const toggleSeekingGame = async () => {
    console.log(
      '[SeekingGameToggle] toggleSeekingGame isSeekingGame:',
      isSeekingGame
    )
    console.log('[SeekingGameToggle] toggleSeekingGame player:', player)
    if (!player || player.kind !== 'ready') {
      return
    }
    setIsSeekingGame(!isSeekingGame)
    const updatedPlayer = {
      ...player,
      isSeekingGame: !isSeekingGame,
    }
    return await togglePlayerSeekingGame(updatedPlayer)
  }

  return (
    <FormGroup
      sx={{
        width: '24vw',
      }}
    >
      <FormControlLabel
        control={
          <Switch checked={isSeekingGame} onChange={toggleSeekingGame} />
        }
        label={t('NDBG_READY_TO_PLAY')}
        labelPlacement="end"
      />
    </FormGroup>
  )
}
