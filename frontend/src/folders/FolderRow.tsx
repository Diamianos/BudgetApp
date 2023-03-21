import { Button, TableCell, TableRow, TextField } from '@mui/material';
import React from 'react'
import { Folder } from './Folder'

interface FolderRowProps{
    folder:Folder;
    onEdit: (folder: Folder) => void;
    onDelete: (folder: Folder) => void;
}

function FolderRow(props: FolderRowProps) {
    const {folder, onEdit, onDelete} = props;
    const handleEdit = (folder: Folder) => {
        onEdit(folder);
    }
    const handleDelete = (folder: Folder) => {
        onDelete(folder);
    }
    
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align='center'>
               <TextField size='small' InputProps={{readOnly: true}} defaultValue={folder.name} />
            </TableCell>
            <TableCell align='center'>
                <TextField size='small' InputProps={{readOnly: true}} defaultValue={folder.amount}/>
            </TableCell>
            <TableCell align='center'>
                <TextField size='small' InputProps={{readOnly: true}} defaultValue={folder.balance}/>
            </TableCell>
            <TableCell align='center'>
                <Button
                    sx={{minWidth:'71px'}}
                    variant="contained"
                    onClick={() => {handleEdit(folder)}}>Edit
                </Button>
                <Button
                    sx={{marginLeft: 2}}
                    variant="contained" 
                    color='error'
                    onClick={() => {handleDelete(folder)}}>Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default FolderRow