import { Box, Container, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

import {Folder} from '../Folder'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'

interface FolderListProps{
  folders: Folder[],
  provided: DroppableProvided
}

function FolderList({ folders, provided}: FolderListProps) {
  return (
    <Container 
    ref={provided.innerRef}
    {...provided.droppableProps}
    disableGutters sx={{padding: '8px'}}>
    {folders.map((folder, index) => 
      <Draggable key={folder.id} draggableId={folder.id.toString()} index={index}>
      {(provided) => (
      <Box 
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      sx={{border: '1px solid grey', borderRadius: '2px', padding: '8px', marginBottom: '8px', backgroundColor: 'white'}}>
        <Typography variant='body1'>{folder.name}</Typography>
        <Typography variant='body1'>{folder.amount}</Typography>
      </Box>
      
      )}
      </Draggable>
    )}
    {provided.placeholder}
    </Container>
  )
}

export default FolderList