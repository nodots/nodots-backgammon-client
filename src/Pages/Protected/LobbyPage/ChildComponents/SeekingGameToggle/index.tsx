import { FormControlLabel, FormGroup, Switch, useTheme } from '@mui/material'

export const SeekingGameToggle = () => {
  const theme = useTheme()
  // const [seekingGame, setSeekingGame] = useState<boolean>(player.isSeekingGame)

  // const handleChange = async (e: React.ChangeEvent) => {
  //   console.log('[SeekingGameToggle] handleChange:', player)
  //   switch (player.kind) {
  //     case 'player-ready':
  //       console.log('[SeekingGameToggle] handleChange player-ready:', player)
  //       setSeekingGame(!player.isSeekingGame)
  //       // await playerActionSetSeekingGame(player, !player.isSeekingGame).then(
  //       //   (player) => {
  //       //     console.log(
  //       //       '[SeekingGameToggle] handleChange back from playerActionSetSeekingGame:',
  //       //       player
  //       //     )
  //       //   }
  //       // )
  //       break
  //     default:
  //       console.log('Player not seeking game')
  //   }
  // }

  return (
    <FormGroup
      sx={{
        width: '24vw',
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={false}
            onChange={() =>
              console.warn('handleChange not implemented for SeekingGameToggle')
            }
          />
        }
        label={`Ready to play?`}
        labelPlacement="end"
      />
    </FormGroup>
  )
}
