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
  // const handleChange = async (e: React.ChangeEvent) => {
  //   dispatch(togglePlayerSeekingGameAction(player, dispatch))
  // }

  useEffect(() => {
    console.log(player)
  }, [])

  return <>SeekingGameToggle Stub</>
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
