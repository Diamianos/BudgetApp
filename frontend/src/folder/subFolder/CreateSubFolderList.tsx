import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React, { useEffect } from 'react'
import { SplitFolderHistoryObject } from '../../interfaces/SplitFolderHistoryObject';
import {Folder} from '../Folder'
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { InitialData } from './InitialData';

interface FolderListProps{
  folders: Folder[],
  column: { id: string; title: string; folderIds: string[]},
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
  foldersAndColumns: typeof InitialData;
  splitFolderHistory: SplitFolderHistoryObject,
  setFoldersAndColumns: (data: typeof InitialData) => void;
  setSplitFolderHistory: (data:SplitFolderHistoryObject) => void;
}

interface DialogContentInterface{
  folderName: string,
  folderAmount: number,
  folderDraggableId: number,
  days1_14Amount: number,
  days15_30Amount: number,
}

function CreateSubFolderList({ 
  folders, column, provided, snapshot, foldersAndColumns, 
  splitFolderHistory, setFoldersAndColumns, setSplitFolderHistory}: FolderListProps) {

  /****
   * States
   */
  const [dialogContentInformation, setDialogContentInformation] = React.useState({
    folderName: '',
    folderAmount: 0,
    folderDraggableId: 0,
    days1_14Amount: 0,
    days15_30Amount: 0
  })
  const [showDialogError, setShowDialogError] = React.useState({
    showError: false,
    errorMessage: '',
  });
  const [open, setOpen] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);

  /******************
   * Refs
   */
  const inputRef = React.useRef<HTMLInputElement>(null);
  

  /******************
   * Effects
   */

  // This is used for setting the focus and selecting the first input box for the dialg pop up box
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (openPopup && inputRef.current){
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 0);
    return () => clearTimeout(timeout)
  }, [openPopup]);

  /******************
   * Arrow Functions
   */

  const handleSplitButton = (folder:Folder) => {
    // Assigning information from folder that had its "Split" button clicked to the dialog information state for display
    const newDialogViewInformation = {folderName: folder.name, folderAmount: folder.amount, folderDraggableId:folder.draggable_id, days1_14Amount: 0, days15_30Amount: 0}
    setDialogContentInformation(newDialogViewInformation)
    setOpen(true);
    setOpenPopup(true)
  };

  const handleSplitEditButton = (folder: Folder) => {
    
    const splitFolder = retrieveSplitFolderInformation(splitFolderHistory, folder.name);

    // Assigning information from folder that had its "Edit Split" button clicked to the dialog information state for display
    const newDialogViewInformation = {folderName: folder.name, folderAmount: splitFolder.folderAmountTotal, folderDraggableId:folder.draggable_id, 
                                      days1_14Amount: splitFolder.folderOneAmount, days15_30Amount: splitFolder.folderTwoAmount}
    setDialogContentInformation(newDialogViewInformation)
    setOpen(true);
    setOpenPopup(true)
  };

  const handleClose = () => {
    setOpen(false);
    setOpenPopup(false)
    setShowDialogError({showError:false, errorMessage:''});
  };

  const handleDialogTextFieldChange = (event: any) => {
    const {name, value, type} = event.target;

    let updatedValue = value;
      // if input type is number, convert the updatedValue string to a number
      if (type === 'number') {
          updatedValue = Number(updatedValue);
      }

    const newDialogContentInformation = {...dialogContentInformation, [name]: updatedValue};

    setShowDialogError({showError:false, errorMessage:''});

    setDialogContentInformation(newDialogContentInformation);

  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter'){
        handleSplitSubmit();
    }
  };

  const handleSplitSubmit = () => {

    console.log(dialogContentInformation);
    // Check dialog text fields for errors
    if (checkDialogFieldsForErrors(dialogContentInformation, setShowDialogError)){
      return;
    }

    // Checking if when "Split" button was pressed in the "Split Folder" dialog box, if we are modifying an 
    // original folder, or a folder that was already split, and branching accordingly
    determineFolderIsSplitFolder(splitFolderHistory, dialogContentInformation.folderName) ? 
      handleSplitFolderSubmit(foldersAndColumns, dialogContentInformation, splitFolderHistory, setSplitFolderHistory, setFoldersAndColumns, setOpen, setOpenPopup) : 
      handleRegularFolderSubmit(foldersAndColumns, dialogContentInformation, splitFolderHistory, setSplitFolderHistory, setFoldersAndColumns, setOpen, setOpenPopup);

  };

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
              { !determineFolderIsSplitFolder(splitFolderHistory ,folder.name) &&
              <DragIndicatorIcon></DragIndicatorIcon>
              }
            </Box>
            <Typography sx={{marginRight:'10px'}} variant='body1'>{folder.name}</Typography>
            <Typography variant='body1'>{folder.amount}</Typography>
            {
              column.title === 'Distribute' ?
              <Button variant='contained' size='small' sx={{marginLeft: 'auto'}} onClick={() => {handleSplitButton(folder)}}>Split</Button>:
              determineFolderIsSplitFolder(splitFolderHistory, folder.name) &&
              <Button variant='contained' color='secondary' size='small' sx={{marginLeft: 'auto'}} onClick={() => {handleSplitEditButton(folder)}}>Edit Split</Button>
            }
            <Dialog disableRestoreFocus={true} open={open} onClose={handleClose}>
            <DialogTitle sx={{textAlign: 'center'}}>Split Folder</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{textAlign: 'center'}}>
                Please indicate below the amount to put in each folder. The total between both folder amounts must equal {dialogContentInformation.folderAmount}
              </DialogContentText>
              <TextField
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
                margin="dense"
                name="days1_14Amount"
                label="Days 1-14 Folder Amount"
                type="number"
                fullWidth
                variant="standard"
                value={dialogContentInformation.days1_14Amount}
                inputRef={inputRef}
                onChange={handleDialogTextFieldChange}
              />
              <TextField
                margin="dense"
                name="days15_30Amount"
                label="Days 15-30 Folder Amount"
                type="number"
                fullWidth
                variant="standard"
                value={dialogContentInformation.days15_30Amount}
                onChange={handleDialogTextFieldChange}
                onKeyDown={handleKeyDown}
              />
            </DialogContent>
            {showDialogError.showError && <Alert variant="filled" severity="error">
              {showDialogError.errorMessage}
            </Alert>}
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

/**************************
 * Page specific functions
 */

function retrieveSplitFolderInformation(splitFolderHistory: SplitFolderHistoryObject, folderName: string){
  for (const key in splitFolderHistory){
    const splitFolder = splitFolderHistory[key];
    if (splitFolder.folderName === folderName){
      return splitFolder
    }
  }
  const emptySplitFolder = {
    folderName: '',
    folderAmountTotal: 0,
    folderOneAmount: 0,
    folderOneDraggableId: 0,
    folderTwoAmount: 0,
    folderTwoDraggableId: 0
  };
  return emptySplitFolder;
}

function determineFolderIsSplitFolder(splitFolderHistory: SplitFolderHistoryObject, folderName: string){
  for (const key in splitFolderHistory){
    const splitFolder = splitFolderHistory[key];
    if (splitFolder.folderName === folderName){
      return true;
    }
  }
  return false;
}

function checkDialogFieldsForErrors(
    dialogContentInformation: DialogContentInterface, 
    setShowDialogError: React.Dispatch<React.SetStateAction<{
      showError: boolean;
      errorMessage: string;
      }>>)
{
  const {folderAmount, days1_14Amount, days15_30Amount } = dialogContentInformation;

  if (days1_14Amount < 0 || days15_30Amount < 0){
    const newError = {showError: true, errorMessage: 'Neither value can be a negative'}
    setShowDialogError(newError);
    return true;
  }
  if (days1_14Amount + days15_30Amount !== folderAmount){
    const newError = {showError: true, errorMessage: 'Both folder amounts must equal ' + folderAmount.toString()}
    setShowDialogError(newError);
    return true;
  };


  return false;
}

function determineNextDraggableId(foldersAndColumns: typeof InitialData){
  const draggableIds: number[] = [];
  Object.values(foldersAndColumns.folders).forEach(f => draggableIds.push(f.draggable_id));
  return(Math.max(...draggableIds) +1);
}

function retrieveFoldersByDraggableId(folderIds: number[], foldersAndColumns:typeof InitialData){
  const folders: Folder[] = []

  const existingFolders = foldersAndColumns.folders;
  for (let i = 0; i < folderIds.length; i++){
    folders.push(existingFolders[folderIds[i].toString() as keyof typeof foldersAndColumns.folders]);
  }

  return folders
}

function handleSplitFolderSubmit(
  foldersAndColumns: typeof InitialData, 
  dialogContentInformation: DialogContentInterface, 
  splitFolderHistory: SplitFolderHistoryObject, 
  setSplitFolderHistory: (data:SplitFolderHistoryObject) => void, 
  setFoldersAndColumns: (data: typeof InitialData) => void, 
  setOpen: (data: boolean) => void,
  setOpenPopup: (data: boolean) => void){

    const splitFolder = retrieveSplitFolderInformation(splitFolderHistory, dialogContentInformation.folderName)
    const {folderOneDraggableId, folderTwoDraggableId} = splitFolder;
    const [firstFolder, secondFolder] = retrieveFoldersByDraggableId(Array.of(folderOneDraggableId, folderTwoDraggableId), foldersAndColumns);

    firstFolder.amount = dialogContentInformation.days1_14Amount.toString();
    secondFolder.amount = dialogContentInformation.days15_30Amount.toString();

    const newFoldersAndColumns= {
      ...foldersAndColumns,
      folders:{
        ...foldersAndColumns.folders,
        [firstFolder.draggable_id]: firstFolder,
        [secondFolder.draggable_id]: secondFolder,
      }
    }

    const newSplitFolder = {
      folderName: dialogContentInformation.folderName,
      folderAmountTotal: dialogContentInformation.folderAmount,
      folderOneAmount: dialogContentInformation.days1_14Amount,
      folderOneDraggableId: firstFolder.draggable_id,
      folderTwoAmount: dialogContentInformation.days15_30Amount,
      folderTwoDraggableId: secondFolder.draggable_id
    }
    const newSplitFolderHistory = {...splitFolderHistory, [newSplitFolder.folderName]: newSplitFolder}

    setSplitFolderHistory(newSplitFolderHistory);
    setFoldersAndColumns(newFoldersAndColumns); 
    setOpen(false)
    setOpenPopup(false)

}

function handleRegularFolderSubmit(
  foldersAndColumns: typeof InitialData, 
  dialogContentInformation: DialogContentInterface, 
  splitFolderHistory: SplitFolderHistoryObject, 
  setSplitFolderHistory: (data:SplitFolderHistoryObject) => void, 
  setFoldersAndColumns: (data: typeof InitialData) => void, 
  setOpen: (data: boolean) => void,
  setOpenPopup: (data: boolean) => void){

    // Checking all folders and getting the next draggable ID for assigning to the new folders
    const nextDraggableId = determineNextDraggableId(foldersAndColumns);

    // Creating the two new folders from the split with the new draggable IDs
    let days1_14Folder = new Folder()
    if (dialogContentInformation.days1_14Amount !== 0){
      days1_14Folder = new Folder({draggable_id:nextDraggableId, name:dialogContentInformation.folderName, amount:dialogContentInformation.days1_14Amount})
    }
    // Just incremeting the draggable ID by one for next folder
    let days15_30Folder = new Folder();
    if (dialogContentInformation.days15_30Amount !== 0){
      days15_30Folder = new Folder({draggable_id:nextDraggableId+1, name:dialogContentInformation.folderName, amount:dialogContentInformation.days15_30Amount})
    }
  
    // Getting the columns from the folderAndColumn state for mutating the state
    // TODO: I'm sure theres a better way to do this with deconstruction, need to fix this.
    const column1 = foldersAndColumns.columns['column-1'];
    const column2 = foldersAndColumns.columns['column-2'];
    const column3 = foldersAndColumns.columns['column-3'];

    // Pushing one of the split folders to the first "Day 1-14" column
    const column1FolderIds: String[] = Array.from(column1.folderIds)
    if (dialogContentInformation.days1_14Amount !== 0){
      column1FolderIds.push(days1_14Folder.draggable_id);
    }

    // Removing the original folder by index
    const column2FolderIds: String[] = Array.from(column2.folderIds)
    let index = column2FolderIds.indexOf(dialogContentInformation.folderDraggableId.toString())
    if (index !== -1){
      column2FolderIds.splice(index, 1);
    }

    // Pushing one of the split folders to the second "Day 15-20" column
    const column3FolderIds: String[] = Array.from(column3.folderIds)
    if (dialogContentInformation.days15_30Amount !== 0){
      column3FolderIds.push(days15_30Folder.draggable_id);
    }

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

    const newFolders:any = {};
    if (days1_14Folder.amount !== 0){
      newFolders[days1_14Folder.draggable_id] = days1_14Folder;
    }
    if (days15_30Folder.amount !== 0){
      newFolders[days15_30Folder.draggable_id] = days15_30Folder;
    }

    // Creating the new state for the foldersAndColumns
    const newFoldersAndColumns= {
      ...foldersAndColumns,
      folders:{
        ...foldersAndColumns.folders,
        ...newFolders,
      },
      columns:{
        ...foldersAndColumns.columns,
        [newColumn1.id]: newColumn1,
        [newColumn2.id]: newColumn2,
        [newColumn3.id]: newColumn3,
      }
    }

    // Adding draggable Ids to the splitFolderHistory state for hidding drag handle div

    if (days1_14Folder.amount !== 0 && days15_30Folder.amount !== 0){
      const newSplitFolder = {
        folderName: dialogContentInformation.folderName,
        folderAmountTotal: dialogContentInformation.folderAmount,
        folderOneAmount: dialogContentInformation.days1_14Amount,
        folderOneDraggableId: days1_14Folder.draggable_id,
        folderTwoAmount: dialogContentInformation.days15_30Amount,
        folderTwoDraggableId: days15_30Folder.draggable_id
      }
      const newSplitFolderHistory = {...splitFolderHistory, [newSplitFolder.folderName]: newSplitFolder}
  
      setSplitFolderHistory(newSplitFolderHistory);
    }
  
    setFoldersAndColumns(newFoldersAndColumns); 
    setOpen(false)
    setOpenPopup(false)
}


export default CreateSubFolderList