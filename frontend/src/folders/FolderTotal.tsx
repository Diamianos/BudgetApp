import { TableCell, TableRow } from '@mui/material'
import { Folder } from './Folder';
import React from 'react'

interface FolderTotalProps{
    folders: Folder[];
}

function FolderTotal({folders}: FolderTotalProps) {

    const calculateFolderTotal = (folders: Folder[]) => {
        let values = folders.map((f) => {
            return parseInt(f.amount)
        })
        return values.reduce((partialSum, a) => partialSum + a, 0)
        
    }

    return (
        <TableRow>
            <TableCell>FolderTotal: {calculateFolderTotal(folders)}</TableCell>
        </TableRow>
    )
}

export default FolderTotal