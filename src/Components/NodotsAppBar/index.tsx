import { useAuth0 } from '@auth0/auth0-react'
import { Avatar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { NodotsPlayerActive } from '../../../nodots_modules/backgammon-types'
import { usePlayerContext } from '../../Contexts/Player/usePlayerContext'
import { Loading } from '../utils/Loading'
import NodotsAppBarComponent from './NodotsAppBarComponent'

// FIXME: Is this necessary?
export const NodotsAppBar = () => {
  return <NodotsAppBarComponent />
}
