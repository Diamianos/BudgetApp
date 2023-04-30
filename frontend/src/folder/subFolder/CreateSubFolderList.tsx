import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React from 'react'

import {Folder} from '../Folder'
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { InitialData } from './InitialData';

interface FolderListProps{
  folders: Folder[],
  column: { id: string; title: string; folderIds: string[]},
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
  foldersAndColumns: typeof InitialData;
  setFoldersAndColumns: (data: typeof InitialData) => void;
}

function CreateSubFolderList({ folders, column, provided, snapshot, foldersAndColumns, setFoldersAndColumns}: FolderListProps) {

  const [dialogContentInformation, setDialogContentInformation] = React.useState({
    folderName: '',
    folderAmount: '',
    folderDraggableId: 0,
    days1_14Amount: 0,
    days15_30Amount: 0
  })
  const [open, setOpen] = React.useState(false);
  const [splitFolderHistory, setSplitFolderHistory] = React.useState({})


  const handleSplitButton = (folder:Folder) => {
    // Assigning information from folder that had its "Split" button clicked to the dialog information state for display
    const newDialogViewInformation = {folderName: folder.name, folderAmount: folder.amount, folderDraggableId:folder.draggable_id, days1_14Amount: 0, days15_30Amount: 0}
    setDialogContentInformation(newDialogViewInformation)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogTextFieldChange = (event: any) => {
    const {name, value} = event.target;

    const newDialogContentInformation = {...dialogContentInformation, [name]: value};

    setDialogContentInformation(newDialogContentInformation);

  }

  const handleSplitSubmit = () => {

    // If one of the dialog text fields are blank when clicking the Split button on the dialog, close dialog and return without changes
    if (dialogContentInformation.days1_14Amount <= 0 || dialogContentInformation.days15_30Amount <= 0){
      setOpen(false);
      console.log("At least one field is blank or negative, returning");
      return;
    }

    // Checking all folders and getting the next draggable ID for assigning to the new folders
    const nextDraggableId = determineNextDraggableId(foldersAndColumns);

    // Creating the two new folders from the split with the new draggable IDs
    const days1_14Folder = new Folder({draggable_id:nextDraggableId, name:dialogContentInformation.folderName, amount:dialogContentInformation.days1_14Amount})
    // Just incremeting the draggable ID by one for next folder
    const days15_30Folder = new Folder({draggable_id:nextDraggableId+1, name:dialogContentInformation.folderName, amount:dialogContentInformation.days15_30Amount})
  
    // Getting the columns from the folderAndColumn state for mutating the state
    // TODO: I'm sure theres a better way to do this with deconstruction, need to fix this.
    const column1 = foldersAndColumns.columns['column-1'];
    const column2 = foldersAndColumns.columns['column-2'];
    const column3 = foldersAndColumns.columns['column-3'];

    // Pushing one of the split folders to the first "Day 1-14" column
    const column1FolderIds: String[] = Array.from(column1.folderIds)
    column1FolderIds.push(days1_14Folder.draggable_id);

    // Removing the original folder by index
    const column2FolderIds: String[] = Array.from(column2.folderIds)
    let index = column2FolderIds.indexOf(dialogContentInformation.folderDraggableId.toString())
    if (index !== -1){
      column2FolderIds.splice(index, 1);
    }

    // Pushong one of the split folders to the second "Day 15-20" column
    const column3FolderIds: String[] = Array.from(column3.folderIds)
    column3FolderIds.push(days15_30Folder.draggable_id);

    // Creating the new 1-3 columns with the new folder IDs
    const newColumn1 = {
      ...column1,
      folderIds: column1FolderIds 
    };

    const newColumn2 = {
      ...column2,
      folderIds: column2FolderIds 
    };

    const newColumn3 = {
      ...column3,
      folderIds: column3FolderIds 
    };

    // Creating the new state for the foldersAndColumns
    const newFoldersAndColumns= {
      ...foldersAndColumns,
      folders:{
        ...foldersAndColumns.folders,
        [days1_14Folder.draggable_id]: days1_14Folder,
        [days15_30Folder.draggable_id]: days15_30Folder,
      },
      columns:{
        ...foldersAndColumns.columns,
        [newColumn1.id]: newColumn1,
        [newColumn2.id]: newColumn2,
        [newColumn3.id]: newColumn3,

      }
    }

    setFoldersAndColumns(newFoldersAndColumns);
    
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
        <Draggable key={folder.draggable_id} draggableId={folder.draggable_id.toString()} index={index}>
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
            {column.title === 'Distribute' && <Button variant='contained' size='small' sx={{marginLeft: 'auto'}} onClick={() => {handleSplitButton(folder)}}>Split</Button>}
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
                name="days1_14Amount"
                label="Days 1-14 Folder Amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleDialogTextFieldChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="days15_30Amount"
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

function determineNextDraggableId(foldersAndColumns: typeof InitialData){
  const draggableIds: number[] = [];
  Object.values(foldersAndColumns.folders).forEach(f => draggableIds.push(f.draggable_id));
  return(Math.max(...draggableIds) +1);
}

export default CreateSubFolderList