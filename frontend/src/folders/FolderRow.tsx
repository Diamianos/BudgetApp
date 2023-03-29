import { Button, TableCell, TableRow, TextField} from '@mui/material';
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

    const style = {
        "& label.Mui-focused": {
          color: "rgba(0,0,0,0.23)"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "rgba(0,0,0,0.23)"
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0,0,0,0.23)',
        }
        },
      }  

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align='center'>
               <TextField sx={style} size='small' InputProps={{readOnly: true}} value={folder.name} />
            </TableCell>
            <TableCell align='center'>
                <TextField sx={style} size='small' InputProps={{readOnly: true}} value={folder.amount}/>
            </TableCell>
            <TableCell align='center'>
                <TextField sx={style} size='small' InputProps={{readOnly: true}} value={folder.balance}/>
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