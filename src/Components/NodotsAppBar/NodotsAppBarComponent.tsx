import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { signInPage } from '../../App'
import { useGameContext } from '../../Contexts/Game/GameContext'

const NodotsAppBarComponent = () => {
  const { user, logout } = useAuth0()
  const { player } = useGameContext()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleSignOut = () => {
    logout({ logoutParams: { returnTo: signInPage } })
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    window.location.href = '/game/player'
  }

  return (
    user && (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontVariant: 'all-petite-caps' }}
            ></Typography>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={player?.preferences?.username}
                  src={player?.preferences?.avatar}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>{t('NDBG_PROFILE')}</MenuItem>
                <MenuItem onClick={handleSignOut}>
                  {t('NDBG_SIGN_OUT')}
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    )
  )
}

export default NodotsAppBarComponent
