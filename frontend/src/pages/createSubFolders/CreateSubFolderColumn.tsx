import React from 'react'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import {Folder} from '../folders/Folder'
import { SplitFolderHistoryObject } from '../../interfaces/SplitFolderHistoryObject';
import { StrictModeDroppable } from '../../components/StrictModeDroppable';
import CreateSubFolderList from './CreateSubFolderList';
import { FolderAndColumnStateInterface } from '../../interfaces/FolderAndColumnStateInterface'

interface ColumnProps{
    column: {id: string; title: string; folderIds: string[]};
    folders: Folder[];
    foldersAndColumns: FolderAndColumnStateInterface;
    splitFolderHistory: SplitFolderHistoryObject,
    setFoldersAndColumns: (data: FolderAndColumnStateInterface) => void;
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