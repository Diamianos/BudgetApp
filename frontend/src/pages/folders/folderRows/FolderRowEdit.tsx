import { Button, TableCell, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Folder } from '../Folder';

interface FolderRowEditProps {
    folder: Folder;
    onSave: (folder: Folder, newFolder: boolean) => void;
    onCancel: (newFolder: boolean) => void;
    

}


function FolderRowEdit(props: FolderRowEditProps) {
    const {folder:initalFolder, onSave, onCancel} = props;
    const [folder, setFolder] = useState(initalFolder)
    const [errors, setErrors] = useState({
        name: false,
        amount: false
    })

    function validate(folder: Folder) {
        let errors: any = {name: false, amount: false};
        if (folder.name.length <= 3){
            errors.name = true;
        }
        if (folder.amount <= 0 ){
            errors.amount = true;
        }
        return errors;

    }
    
    function isValid(){
        return (
            errors.name === false && errors.amount === false
        )
    }

    const handleCancel = () => {
        onCancel(false);
    }

    const handleSave = (folder: Folder) => {
        if (!isValid()) return;
        onSave(folder, false);
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

        // need to do functional updated b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited like project.id
        // the spread operator (...) is used to 
        // spread the previous project properties and the new change
        let updatedFolder: Folder = new Folder({...folder, ...change});
        setFolder(updatedFolder);
        setErrors(() => validate(updatedFolder))
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter'){
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
                <TextField 
                error={errors.name ? true : false}
                label={errors.name ? 'error' : ''}
                sx={errors.name ? null : style}
                autoFocus={true}
                size='small' 
                value={folder.name} 
                name="name" 
                onChange={handleChange}
                onFocus={handleFocus}
                />       
            </TableCell>
            <TableCell align='center'>
                <TextField 
                error={errors.amount ? true : false}
                label={errors.amount ? 'error' : ''}
                sx={errors.amount ? null : style}
                type="number"
                size='small' 
                value={folder.amount} 
                name="amount" 
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                />        
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