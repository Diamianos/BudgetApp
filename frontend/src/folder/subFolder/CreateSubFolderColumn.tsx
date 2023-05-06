import React from 'react'
import {Folder} from '../Folder'
import { InitialData } from './InitialData';
import { SplitFolderHistoryObject } from '../../interfaces/SplitFolderHistoryObject';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { StrictModeDroppable } from '../../components/StrictModeDroppable';
import CreateSubFolderList from './CreateSubFolderList';

interface ColumnProps{
    column: {id: string; title: string; folderIds: string[]};
    folders: Folder[];
    foldersAndColumns: typeof InitialData;
    splitFolderHistory: SplitFolderHistoryObject,
    setFoldersAndColumns: (data: typeof InitialData) => void;
    setSplitFolderHistory: (data:SplitFolderHistoryObject) => void;
    
}

function Column({column, folders, foldersAndColumns, splitFolderHistory, setFoldersAndColumns, setSplitFolderHistory}: ColumnProps) {
  

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
                    splitFolderHistory={splitFolderHistory}
                    setFoldersAndColumns={setFoldersAndColumns}
                    setSplitFolderHistory={setSplitFolderHistory}
                    ></CreateSubFolderList> 
                )}
            </StrictModeDroppable>
    </Container>
  )
}

export default Column