import { Button, TableCell, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Folder } from './Folder'

interface FolderRowNewProps{
    onSave: (folder: Folder, newFolder: boolean) => void;
    onCancel: (newFolder: boolean) => void;
    hideNewFolder: boolean;
}

function FolderRowNew(props: FolderRowNewProps) {
    const {onSave, onCancel, hideNewFolder} = props;
    const [folder, setFolder] = useState(new Folder())

    const handleSave = (folder: Folder) => {
        onSave(folder, true);
        setFolder(new Folder())
    }

    const handleCancel = () => {
        onCancel(true);
    }

    const handleChange = (event: any) => {
        const {type, name, value} = event.target;

        let updatedValue = value;
        // if input type is number, convert the updatedValue string to a number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue
        };
        let updatedFolder: Folder;
        // need to do functional updated b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited like project.id
        // the spread operator (...) is used to 
        // spread the previous project properties and the new change
        setFolder((p) => {
            updatedFolder = new Folder({...p, ...change});
            return updatedFolder;
        });

        
    }

    const handleFocus = (event: any) => {
        event.target.select();
    }
    
    return (
        <TableRow sx={hideNewFolder ? {display: 'none'}: {display: 'table-row'}}>
            <TableCell align='center'>
                <TextField size='small' defaultValue={folder.name} name="name" onChange={handleChange} onFocus={handleFocus}/> 
            </TableCell>
            <TableCell align='center'>
                <TextField size='small' defaultValue={folder.amount} name="amount" type="number" onChange={handleChange} onFocus={handleFocus}/> 
            </TableCell>
            <TableCell align='center'>
                <TextField size='small' defaultValue={folder.balance} name="balance" type="number" onChange={handleChange} onFocus={handleFocus}/> 
            </TableCell>
            <TableCell align='center'>
                <Button
                    variant="contained"
                    onClick={() => {handleSave(folder)}}>Save
                </Button> 
                <Button
                    sx={{marginLeft: 2}}
                    variant="contained"
                    onClick={() => {handleCancel()}}>Cancel
                </Button> 
            </TableCell>
        </TableRow>
    )
}

export default FolderRowNew