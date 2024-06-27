import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Avatar } from '@mui/material'

export default function NavBar() {
  const { user, logout } = useAuth0()
  const [, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async (e: React.MouseEvent<HTMLElement>) => {
    const date = new Date()
    logout({ logoutParams: { returnTo: 'http://127.0.0.1:5173' } })
  }

  const handleProfile = (e: React.MouseEvent<HTMLElement>) => {
    window.location.href = '/profile'
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {user && (
                <Avatar alt={user.name?.substring(0, 1)} src={user.picture} />
              )}
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
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
