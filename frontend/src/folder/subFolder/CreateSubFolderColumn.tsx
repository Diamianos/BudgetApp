import React from 'react'
import {Folder} from '../Folder'
import { InitialData } from './InitialData';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { StrictModeDroppable } from '../../components/StrictModeDroppable';
import CreateSubFolderList from './CreateSubFolderList';

interface ColumnProps{
    column: {id: string; title: string; folderIds: string[]};
    folders: Folder[];
    foldersAndColumns: typeof InitialData;
    setFoldersAndColumns: (data: typeof InitialData) => void;
    
}

function Column({column, folders, foldersAndColumns, setFoldersAndColumns}: ColumnProps) {
  return (
    <Container sx={{border: '1px solid grey', marginTop:'8px', display:'flex', flexDirection:'column'}}>
        <Typography variant='h4' sx={{padding:'8px', textAlign:'center'}}>{column.title}</Typography>
            <StrictModeDroppable droppableId={column.id}>
                {(provided, snapshot) => (    
                    <CreateSubFolderList 
                    provided={provided}
                    snapshot={snapshot}
                    folders={folders}
                    column = {column}
                    foldersAndColumns={foldersAndColumns}
                    setFoldersAndColumns={setFoldersAndColumns}
                    ></CreateSubFolderList> 
                )}
            </StrictModeDroppable>
    </Container>
  )
}

export default Column