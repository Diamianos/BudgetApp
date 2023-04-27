import React from 'react'
import {Folder} from '../Folder'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import FolderList from './FolderList';

interface ColumnProps{
    column: {id: string; title: string; folderIds: string[]};
    folders: Folder[];
}

function Column({column, folders}: ColumnProps) {
  return (
    <Container sx={{border: '1px solid grey', marginTop:'8px'}}>
        <Typography variant='h4' sx={{padding:'8px'}}>{column.title}</Typography>
                <FolderList     
                folders={folders}></FolderList> 
    </Container>
  )
}

export default Column