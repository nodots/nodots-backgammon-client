import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { t } from 'i18next'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { NodotsPlayerReady } from '../../../../../nodots_modules/backgammon-types'
import { Loading } from '../../../../Components/utils/Loading'
import { useGameContext } from '../../../../Contexts/Game/GameContext'
import { togglePlayerSeekingGame } from '../../../../Contexts/Game/playerHelpers'

const setSeekingGameAction = async (
  player: NodotsPlayerReady,
  setPlayer: (player: NodotsPlayerReady) => void
): Promise<NodotsPlayerReady> => {
  console.log(
    '[SeekingGameToggle] setSeekingGame player.isSeekingGame:',
    player.isSeekingGame
  )
  const updatedPlayer = await togglePlayerSeekingGame(player)
  console.log(
    '[SeekingGameToggle] setSeekingGame updatedPlayer.isSeekingGame:',
    updatedPlayer.isSeekingGame
  )
  if (!updatedPlayer) {
    throw Error('Failed to toggle seeking game')
  }
  await setPlayer(updatedPlayer)
  return updatedPlayer
}

const SeekingGameToggle = () => {
  const { game, player, setPlayer } = useGameContext()
  const [isSeekingGame, setIsSeekingGame] = useState<boolean>(false)

  useEffect(() => {
    if (player && player.kind === 'ready') {
      setIsSeekingGame(player.isSeekingGame)
    }
  }, [player])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player || player.kind !== 'ready') {
      return
    }
    const updatedPlayer = await setSeekingGameAction(player, setPlayer)
    setIsSeekingGame(updatedPlayer.isSeekingGame)
  }

  switch (player?.kind) {
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
            control={
              <Switch
                checked={player.isSeekingGame}
                onChange={(e) => handleChange(e)}
              />
            }
            label={t('NDBG_READY_TO_PLAY')}
            labelPlacement="end"
          />
        </FormGroup>
      )
  }
}

export default observer(SeekingGameToggle)
