import { AppBar, Box, Container, Link, Toolbar } from '@mui/material'
import React from 'react'

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link
                href='/'
                variant='button'
                sx={{ color: 'white', display: 'block' }}>
                Folders
            </Link>
            <Link
                href='/subfolders'
                variant='button'
                sx={{ marginLeft: '5rem', color: 'white', display: 'block' }}
                >
                SubFolders
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar