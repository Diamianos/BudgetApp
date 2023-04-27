import { Box, Container, Typography } from '@mui/material'
import React from 'react'

import {Folder} from '../Folder'
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'

interface FolderListProps{
  folders: Folder[],
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
}

function FolderList({ folders, provided, snapshot}: FolderListProps) {
  return (
    <Container 
    ref={provided.innerRef}
    {...provided.droppableProps}
    disableGutters 
    sx={{padding: '8px', transition: 'background-color 0.2s ease', backgroundColor: snapshot.isDraggingOver ? 'aquamarine' : 'white', flexGrow: '1'}}
    >
    {folders.map((folder, index) => 
      <Draggable key={folder.id} draggableId={folder.id.toString()} index={index}>
        {(provided, snapshot) => (
        <Box 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        sx={{border: '1px solid grey', borderRadius: '15px', padding: '8px', marginBottom: '8px', backgroundColor: snapshot.isDragging ? 'lightblue' : 'white'}}>
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