import { TableCell, TableRow } from '@mui/material'
import { Folder } from '../Folder';
import React from 'react'

interface FolderTotalProps{
    folders: Folder[];
}

function FolderRowTotal({folders}: FolderTotalProps) {

    const calculateFoldersTotal = (folders: Folder[]) => {
        let values = folders.map((f) => {
            return f.amount
        })
        return values.reduce((partialSum, a) => partialSum + a, 0)
        
    }

    return (
        <TableRow>
            <TableCell sx={{fontSize:"18px", fontWeight:"bold"}} align='center' colSpan={2}>
                Total: {calculateFoldersTotal(folders)}
            </TableCell>
        </TableRow>
    )
}

export default FolderRowTotal