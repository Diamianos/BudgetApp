import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React, { useEffect } from 'react'
import { SplitFolderHistoryInterface } from '../../interfaces/SplitFolderHistoryInterface';
import {Folder} from '../Folder'
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { InitialData } from './InitialData';

interface FolderListProps{
  folders: Folder[],
  column: { id: string; title: string; folderIds: string[]},
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
  foldersAndColumns: typeof InitialData;
  splitFolderHistory: SplitFolderHistoryInterface[],
  setFoldersAndColumns: (data: typeof InitialData) => void;
  setSplitFolderHistory: (data:SplitFolderHistoryInterface[]) => void;
}

interface DialogContentInterface{
  folderName: string,
  folderAmount: string,
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
    folderAmount: '',
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
    
    const splitFolder = retrieveSplitFolderInformation(splitFolderHistory, folder.draggable_id);

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
  };

  const handleDialogTextFieldChange = (event: any) => {
    const {name, value} = event.target;

    const newDialogContentInformation = {...dialogContentInformation, [name]: value};

    setShowDialogError({showError:false, errorMessage:''});

    setDialogContentInformation(newDialogContentInformation);

  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter'){
        handleSplitSubmit();
    }
  };

  const handleSplitSubmit = () => {
    // Check dialog text fields for errors
    if (checkDialogFieldsForErrors(dialogContentInformation, setShowDialogError)){
      return;
    }

    // Checking if when "Split" button was pressed in the "Split Folder" dialog box, if we are modifying an 
    // original folder, or a folder that was already split, and branching accordingly
    determineFolderIsSplitFolder(splitFolderHistory, dialogContentInformation.folderDraggableId) ? 
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
              { !determineFolderIsSplitFolder(splitFolderHistory ,folder.draggable_id) &&
              <DragIndicatorIcon></DragIndicatorIcon>
              }
            </Box>
            <Typography sx={{marginRight:'10px'}} variant='body1'>{folder.name}</Typography>
            <Typography variant='body1'>{folder.amount}</Typography>
            {
              column.title === 'Distribute' ?
              <Button variant='contained' size='small' sx={{marginLeft: 'auto'}} onClick={() => {handleSplitButton(folder)}}>Split</Button>:
              determineFolderIsSplitFolder(splitFolderHistory, folder.draggable_id) &&
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

function retrieveSplitFolderInformation(splitFolderHistory: SplitFolderHistoryInterface[], draggable_id: number){
  for (let i = 0; i < splitFolderHistory.length; i++){
    const splitFolder = splitFolderHistory[i];
    if (splitFolder.folderOneDraggableId === draggable_id || splitFolder.folderTwoDraggableId === draggable_id){
      return splitFolder;
    }
  }
  const emptySplitFolder = {
    folderName: '',
    folderAmountTotal: '',
    folderOneAmount: 0,
    folderOneDraggableId: 0,
    folderTwoAmount: 0,
    folderTwoDraggableId: 0
  };
  return emptySplitFolder;
}

function determineFolderIsSplitFolder(splitFolderHistory: SplitFolderHistoryInterface[], draggableId: number){
  for (let i = 0; i < splitFolderHistory.length; i++){
    const splitFolder = splitFolderHistory[i];
    if (splitFolder.folderOneDraggableId === draggableId || splitFolder.folderTwoDraggableId === draggableId){
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

  // If one of the dialog text fields are blank when clicking the Split button on the dialog, close dialog and return without changes
  if (Number(days1_14Amount) < 0 || Number(days15_30Amount) < 0){
    const newError = {showError: true, errorMessage: 'Neither value can be a negative'}
    setShowDialogError(newError);
    return true;
  }
  if (Number(days1_14Amount) + Number(days15_30Amount) !== Number(folderAmount)){
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
  splitFolderHistory: SplitFolderHistoryInterface[], 
  setSplitFolderHistory: (data:SplitFolderHistoryInterface[]) => void, 
  setFoldersAndColumns: (data: typeof InitialData) => void, 
  setOpen: (data: boolean) => void,
  setOpenPopup: (data: boolean) => void){

    const splitFolder = retrieveSplitFolderInformation(splitFolderHistory, dialogContentInformation.folderDraggableId)
    const {folderOneDraggableId, folderTwoDraggableId} = splitFolder;
    const [firstFolder, secondFolder] = retrieveFoldersByDraggableId(Array.of(folderOneDraggableId, folderTwoDraggableId), foldersAndColumns);

    // firstFolder.amount = dialogContentInformation.days1_14Amount.toString();
    // secondFolder.amount = dialogContentInformation.days15_30Amount.toString();

    // const newFoldersAndColumns= {
    //   ...foldersAndColumns,
    //   folders:{
    //     ...foldersAndColumns.folders,
    //     [firstFolder.draggable_id]: firstFolder,
    //     [secondFolder.draggable_id]: secondFolder,
    //   }
    // }

}

function handleRegularFolderSubmit(
  foldersAndColumns: typeof InitialData, 
  dialogContentInformation: DialogContentInterface, 
  splitFolderHistory: SplitFolderHistoryInterface[], 
  setSplitFolderHistory: (data:SplitFolderHistoryInterface[]) => void, 
  setFoldersAndColumns: (data: typeof InitialData) => void, 
  setOpen: (data: boolean) => void,
  setOpenPopup: (data: boolean) => void){

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

    // Pushing one of the split folders to the second "Day 15-20" column
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

    // Adding draggable Ids to the splitFolderHistory state for hidding drag handle div
    const newSplitFolder = {
      folderName: dialogContentInformation.folderName,
      folderAmountTotal: dialogContentInformation.folderAmount,
      folderOneAmount: dialogContentInformation.days1_14Amount,
      folderOneDraggableId: days1_14Folder.draggable_id,
      folderTwoAmount: dialogContentInformation.days15_30Amount,
      folderTwoDraggableId: days15_30Folder.draggable_id
    }
    const newSplitFolderHistory = [...splitFolderHistory, newSplitFolder]

    setSplitFolderHistory(newSplitFolderHistory);
    setFoldersAndColumns(newFoldersAndColumns); 
    setOpen(false)
    setOpenPopup(false)
}


export default CreateSubFolderList