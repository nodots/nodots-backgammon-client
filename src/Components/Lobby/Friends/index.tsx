import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Contexts/Game/GameHook'
import PlayerRow from './PlayerRow'
import PlayerTable from './PlayerTable'

const Friends = () => {
  const { t } = useTranslation()
  return (
    <Card
      sx={{ width: '25vw', minWidth: '340px', padding: '.5vh .5vw' }}
      variant="outlined"
    >
      <CardHeader title={t('NDBG_FRIENDS')} />
      <CardContent>
        <PlayerTable />
      </CardContent>
    </Card>
  )
}
export default Friends
