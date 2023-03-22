import { Button, styled, TableCell, TableRow, TextField, withStyles } from '@mui/material';
import React, { useState } from 'react'
import { Folder } from './Folder';

interface FolderRowEditProps {
    folder: Folder;
    onSave: (folder: Folder, newFolder: boolean) => void;
    onCancel: (newFolder: boolean) => void;
}

const GreenBorderTextField = styled(TextField)`
        & .MuiOutlinedInput-root {
            & fieldset {
               border-color: green;
               border-width: medium
            }
        }
        `;

function FolderRowEdit(props: FolderRowEditProps) {
    const {folder:initalFolder, onSave, onCancel} = props;
    const [folder, setFolder] = useState(initalFolder)
    
    const handleCancel = () => {
        onCancel(false);
    }

    const handleSave = (folder: Folder) => {
        onSave(folder, false);
    }

    const handleChange = (event: any) => {
        console.log(event)
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
        <TableRow>
            <TableCell align='center'>
                <GreenBorderTextField  
                    size='small' 
                    value={folder.name} 
                    name="name" 
                    onChange={handleChange}
                    onFocus={handleFocus}/> 
            </TableCell>
            <TableCell align='center'>
                <GreenBorderTextField 
                    size='small' 
                    value={folder.amount} 
                    name="amount" 
                    type='number'
                    onChange={handleChange} 
                    onFocus={handleFocus}/> 
            </TableCell>
            <TableCell align='center'>
                <GreenBorderTextField 
                    size='small' 
                    value={folder.balance}    
                    name="balance" 
                    type='number'
                    onChange={handleChange} 
                    onFocus={handleFocus}/> 
            </TableCell>
            <TableCell align='center'>
                <Button
                    sx={{minWidth:'36px'}}
                    variant="contained"
                    color='success'
                    onClick={() => {handleSave(folder)}}>Save
                </Button> 
                <Button
                    sx={{marginLeft: 2}}
                    variant="contained"
                    color='warning'
                    onClick={() => {handleCancel()}}>Cancel
                </Button> 
            </TableCell>
        </TableRow>
    )
}

export default FolderRowEdit