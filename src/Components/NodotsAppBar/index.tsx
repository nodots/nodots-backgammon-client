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
import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'

export const NodotsAppBar = () => {
  const { isAuthenticated, logout } = useAuth0()
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    window.location.href = '/player'
  }

  const handleSignOut = () =>
    console.warn('handleSignOut not implemented', logout())

  return <>NodotsAppBarStub</>

  // return player ? (
  //   <Box sx={{ flexGrow: 1 }}>
  //     <AppBar position="static">
  //       <Toolbar>
  //         <Typography
  //           variant="h6"
  //           component="div"
  //           sx={{ flexGrow: 1, fontVariant: 'all-petite-caps' }}
  //         ></Typography>

  //         {player && isAuthenticated && (
  //           <div>
  //             <IconButton
  //               size="large"
  //               aria-label="account of current user"
  //               aria-controls="menu-appbar"
  //               aria-haspopup="true"
  //               onClick={handleMenu}
  //               color="inherit"
  //             >
  //               <Avatar
  //                 alt={player.preferences?.username}
  //                 src={player.preferences?.avatar}
  //               />
  //             </IconButton>
  //             <Menu
  //               id="menu-appbar"
  //               anchorEl={anchorEl}
  //               anchorOrigin={{
  //                 vertical: 'top',
  //                 horizontal: 'right',
  //               }}
  //               keepMounted
  //               transformOrigin={{
  //                 vertical: 'top',
  //                 horizontal: 'right',
  //               }}
  //               open={Boolean(anchorEl)}
  //               onClose={handleClose}
  //             >
  //               <MenuItem onClick={handleProfile}>{t('NDBG_PROFILE')}</MenuItem>
  //               <MenuItem onClick={handleSignOut}>
  //                 {t('NDBG_SIGN_OUT')}
  //               </MenuItem>
  //             </Menu>
  //           </div>
  //         )}
  //       </Toolbar>
  //     </AppBar>
  //   </Box>
  // ) : (
  //   <></>
  // )
}