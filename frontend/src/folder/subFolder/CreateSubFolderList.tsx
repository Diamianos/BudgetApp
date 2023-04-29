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

  const [dialogContentInformation, setDialogContentInformation] = React.useState({
    folderName: '',
    folderAmount: '',
    days1_14Amount: 0,
    days15_30Amount: 0
  })
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = (folder:Folder) => {
    const newDialogViewInformation = {folderName: folder.name, folderAmount: folder.amount, days1_14Amount: 0, days15_30Amount: 0}
    setDialogContentInformation(newDialogViewInformation)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogTextFieldChange = (event: any) => {
    console.log(event)
  }

  const handleSplitSubmit = () => {
    console.log("Split submit button pressed")
    setOpen(false)
  }

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
            {column.title === 'Distribute' && <Button variant='contained' size='small' sx={{marginLeft: 'auto'}} onClick={() => {handleClickOpen(folder)}}>Split</Button>}
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{textAlign: 'center'}}>Split Folder</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{textAlign: 'center'}}>
                Please indicate below the amount to put in each folder. The total between both folder amounts must equal {dialogContentInformation.folderAmount}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="folderName"
                label="Folder Name"
                type="email"
                fullWidth
                variant="standard"
                value={dialogContentInformation.folderName}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="firstFolderAmount"
                label="Days 1-14 Folder Amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleDialogTextFieldChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="secondFolderAmount"
                label="Days 15-30 Folder Amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleDialogTextFieldChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSplitSubmit}>Split</Button>
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