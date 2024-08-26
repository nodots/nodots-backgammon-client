import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useAuth0 } from '@auth0/auth0-react'
import { Select } from '@mui/material'
import { Language } from '@mui/icons-material'
import LanguageSwitcher from '../LanguageSwitcher'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string
}

export default function MenuAppBar({ title }: Props) {
  const { i18n, t } = useTranslation()
  const { logout, isAuthenticated, user } = useAuth0()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [language, setLanguage] = React.useState(i18n.language)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    window.location.href = '/player'
  }

  const handleSignOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const handleChangeLanguage = (lang: 'en' | 'es' | 'fr' | 'ar' | 'tr') => {
    return () => {
      console.log(lang)
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontVariant: 'all-petite-caps' }}
          >
            {t(title)}
          </Typography>

          {isAuthenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
