import { Button, TableCell, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Folder } from '../Folder'

interface FolderRowNewProps{
    onSave: (folder: Folder, newFolder: boolean) => void;
    onCancel: (newFolder: boolean) => void;
}

function FolderRowNew(props: FolderRowNewProps) {
    const {onSave, onCancel} = props;
    const [folder, setFolder] = useState(new Folder())

    const handleSave = (folder: Folder) => {
        onSave(folder, true);
        setFolder(new Folder())
    }

    const handleCancel = () => {
        onCancel(true);
    }

    const handleChange = (event: any) => {
        console.log("handleChange")
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

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter'){
            console.log("Enter was pressed");
            handleSave(folder);
        }
    }

    const handleFocus = (event: any) => {
        event.target.select();
    }

    const style = {
        "& label.Mui-focused": {
            color: "rgba(0,0,0,0.23)"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#2e7d32",
                borderWidth: "medium"
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2e7d32',
                borderWidth: "medium"
            },
            '&:hover fieldset': {
                borderColor: '#2e7d32',
            }
        },
    }
    
    return (
        <TableRow>
            <TableCell align='center'>
                <TextField sx={style} size='small' value={folder.name} name="name" onChange={handleChange} onFocus={handleFocus} autoFocus={true}/> 
            </TableCell>
            <TableCell align='center'>
                <TextField sx={style} size='small' value={folder.amount} name="amount" type="number" onChange={handleChange} onFocus={handleFocus} onKeyDown={handleKeyDown}/> 
            </TableCell>
            <TableCell align='center'>
                <Button
                    color='success'
                    variant="contained"
                    onClick={() => {handleSave(folder)}}>Save
                </Button> 
                <Button
                    sx={{marginLeft: 2}}
                    color='warning'
                    variant="contained"
                    onClick={() => {handleCancel()}}>Cancel
                </Button> 
            </TableCell>
        </TableRow>
    )
}

export default FolderRowNew