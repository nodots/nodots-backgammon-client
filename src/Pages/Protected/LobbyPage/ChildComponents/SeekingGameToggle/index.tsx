import { FormControlLabel, FormGroup, Switch, useTheme } from '@mui/material'
import { usePlayerContext } from '../../../../../Contexts/Player/usePlayerContext'
import { togglePlayerSeekingGameAction } from '../../../../../Contexts/Player/playerActions'
import { Loading } from '../../../../../Components/Loading'
import {
  NodotsPlayerActive,
  NodotsPlayerReady,
} from '../../../../../../nodots_modules/backgammon-types'
import { useEffect } from 'react'

export const SeekingGameToggle = () => {
  const { state, dispatch } = usePlayerContext()
  const { player } = state

  useEffect(() => {
    console.log(player)
  }, [])

  return <>SeekingGameToggle Stub {state.player.id}</>
}

// return (
//   <FormGroup
//     sx={{
//       width: '24vw',
//     }}
//   >
//     <FormControlLabel
//       control={
//         <Switch
//           checked={true}
//           onChange={() => console.log('not implemented')}
//         />
//       }
//       label={`PLACEHOLDER`}
//       labelPlacement="end"
//     />
//   </FormGroup>
// )
