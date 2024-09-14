import { Card, CardContent, CardHeader } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PlayerTable from './PlayerTable'
import {
  NodotsPlayer,
  PlayerReady,
} from '../../../../../../nodots_modules/backgammon-types'

interface Props {
  player: NodotsPlayer
}

const Friends = ({ player }: Props) => {
  const { t } = useTranslation()
  return (
    <Card
      sx={{ width: '25vw', minWidth: '340px', padding: '.5vh .5vw' }}
      variant="outlined"
    >
      <CardHeader title={t('NDBG_FRIENDS')} />
      <CardContent>
        <PlayerTable player={player} />
      </CardContent>
    </Card>
  )
}
export default Friends
