import { Box, Container, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

import {Folder} from '../Folder'
import { DroppableProvided } from 'react-beautiful-dnd'

interface FolderListProps{
  folders: Folder[],
}

function FolderList({ folders}: FolderListProps) {
  return (
    <Container disableGutters sx={{padding: '8px'}}>
    {folders.map(folder => 
      <Box key={folder.id} sx={{border: '1px solid grey', borderRadius: '2px', padding: '8px', marginBottom: '8px'}}>
        <Typography variant='body1'>{folder.name}</Typography>
        <Typography variant='body1'>{folder.amount}</Typography>
      </Box>
    )}
    </Container>
  )
}

export default FolderList