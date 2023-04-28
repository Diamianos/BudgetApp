import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React, { useState } from 'react'

import {Folder} from '../Folder'
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'

interface FolderListProps{
  folders: Folder[],
  column: { id: string; title: string; folderIds: string[]},
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
}

function CreateSubFolderList({ folders, column, provided, snapshot}: FolderListProps) {

  const [dialogInformation, setDialogInformation] = React.useState({
    "folderName": '',
    "folderAmount": ''
  })
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (folder:Folder) => {
    const newDialogInformation = {"folderName": folder.name, "folderAmount": folder.amount}
    setDialogInformation(newDialogInformation)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          ref={provided.innerRef}
          sx={{display: 'flex', border: '1px solid grey', borderRadius: '15px', padding: '8px', marginBottom: '8px', backgroundColor: snapshot.isDragging ? 'lightblue' : 'white'}}
          >
            <Box {...provided.dragHandleProps} sx={{marginRight:'15px'}}>
              <DragIndicatorIcon></DragIndicatorIcon>
            </Box>
            <Typography sx={{marginRight:'10px'}} variant='body1'>{folder.name}</Typography>
            <Typography variant='body1'>{folder.amount}</Typography>
            <Button variant='contained' size='small' sx={{marginLeft: 'auto'}} onClick={() => {handleClickOpen(folder)}}>Split</Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{textAlign: 'center'}}>Split Folder</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{textAlign: 'center'}}>
                Please indicate below the amount to put in each folder. The total between both folder amounts must equal {dialogInformation.folderAmount}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="folderName"
                label="Folder Name"
                type="email"
                fullWidth
                variant="standard"
                value={dialogInformation.folderName}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="firstFolderAmount"
                label="First Folder Amount"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="secondFolderAmount"
                label="Second Folder Amount"
                type="number"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Split</Button>
            </DialogActions>
          </Dialog>
          </Box>
        )}
        </Draggable>)
      }
      {provided.placeholder}
    </Container>
  )
}

export default CreateSubFolderList