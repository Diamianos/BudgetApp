import React from 'react'
import {Folder} from '../Folder'
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import { StrictModeDroppable } from '../../components/StrictModeDroppable';
import CreateSubFolderList from './CreateSubFolderList';

interface ColumnProps{
    column: {id: string; title: string; folderIds: string[]};
    folders: Folder[];
}

function Column({column, folders}: ColumnProps) {
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
                    ></CreateSubFolderList> 
                )}
            </StrictModeDroppable>
    </Container>
  )
}

export default Column