import { useEffect, useState } from 'react'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { get } from 'http'
import { Label } from '@mui/icons-material'

interface Props {}

function SeekingGameToggle({}: Props) {
  const { getPlayerById, togglePlayerSeekingGame } = useNodotsGame()
  const [player, setPlayer] = useState<NodotsPlayer>()
  const playerId = sessionStorage.getItem('playerId')
  useEffect(() => {
    playerId &&
      getPlayerById(playerId).then((player: NodotsPlayer) => {
        setPlayer(player)
      })
  }, [])

  useEffect(() => {
    playerId &&
      getPlayerById(playerId).then((player: NodotsPlayer) => {
        setPlayer(player)
      })
  }, [player])

  const handleChange = (e: any) => {
    player &&
      player.kind !== 'player-playing' &&
      togglePlayerSeekingGame(player.id, player.kind)
  }

  const handleClick = (e: any) => {
    player &&
      player.kind !== 'player-playing' &&
      togglePlayerSeekingGame(player.id, player.kind)
  }

  switch (player?.kind) {
    case 'player-initialized':
    case 'player-seeking-game':
      return (
        <ToggleButtonGroup value={player.kind} onChange={handleChange}>
          <label>Ready to Play?</label>
          <ToggleButton value={'player-initialized'} onClick={handleClick}>
            Yes
          </ToggleButton>
          <ToggleButton value="player-seeking-game" onClick={handleClick}>
            No
          </ToggleButton>
        </ToggleButtonGroup>
      )
    // return <Button onClick={handleClick}>{player.kind}</Button>
    case 'player-playing':
      return <></>
  }
}

export default SeekingGameToggle
