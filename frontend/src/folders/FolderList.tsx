import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Folder } from './Folder'
import FolderRow from './FolderRow'
import FolderRowEdit from './FolderRowEdit';
import FolderRowNew from './FolderRowNew';

// https://minicss.us/docs.htm#tables

interface FolderListProps {
    folders: Folder[];
    onSave: (folder: Folder, newFolder: boolean) => void;
    onDelete: (folder: Folder) => void;
}

export default function FolderList({folders, onSave, onDelete}: FolderListProps) {

    const [folderBeingEdited, setFolderBeingEdited] = useState({});
    const [hideNewFolder, setHideNewFolder] = useState(true);

    const handleEdit = (folder: Folder) => {
        setHideNewFolder(true)
        setFolderBeingEdited(folder)
    }
    const handleCancel = (newFolder: boolean) => {
        if (newFolder){setHideNewFolder(true)};
        setFolderBeingEdited({});
    }

    const handleNewFolder = (hideFolder: boolean) => {
        setHideNewFolder(hideFolder);
        setFolderBeingEdited({});
    }

    const handleSave = (folder: Folder, newFolder: boolean) => {
        if (newFolder){
            setHideNewFolder(true)
        }
        onSave(folder, newFolder)
    }

    return (
            <TableContainer>
                <div className='new-folder-div'>
                    <Button variant="contained"
                        onClick={() => {handleNewFolder(false)}}
                        color='success'
                        >New Folder
                    </Button>
                </div> 
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize: 16, fontWeight: 'bold' }} align='center'>Name</TableCell>
                            <TableCell sx={{fontSize: 16, fontWeight: 'bold' }} align='center'>Amount</TableCell>
                            <TableCell sx={{fontSize: 16, fontWeight: 'bold' }} align='center'>Remaining</TableCell>
                            <TableCell sx={{fontSize: 16, fontWeight: 'bold' }} align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <FolderRowNew onSave={handleSave} onCancel={handleCancel} hideNewFolder={hideNewFolder}/>
                        {folders.map((folder) => (
                            <React.Fragment key={folder.id}>
                                {folder === folderBeingEdited ?
                                <FolderRowEdit 
                                    folder={folder}
                                    onSave={handleSave} 
                                    onCancel={handleCancel}/> 
                                :
                                <FolderRow 
                                    folder={folder} 
                                    onEdit={handleEdit} 
                                    onDelete={onDelete}
                                />}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

