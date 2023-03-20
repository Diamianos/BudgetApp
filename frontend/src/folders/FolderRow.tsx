import React, { useState } from 'react'
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
        <tr>
            <td className='folder-cell' data-label="Name">
                <span className='folder-cell-span'>{folder.name}</span>
            </td>
            <td className='folder-cell' data-label="Amount">
                <span className='folder-cell-span'>{folder.amount}</span> 
            </td>
            <td className='folder-cell' data-label="Balance">
                <span className='folder-cell-span'>{folder.balance}</span> 
            </td>
            <td data-label="Actions" className='action-buttons'>
                <button 
                    className="primary small folder-row-button"
                    onClick={() => {handleEdit(folder)}}>Edit
                </button>
                <button 
                    className="secondary small folder-row-button"
                    onClick={() => {handleDelete(folder)}}>Delete
                </button>
            </td>
        </tr>
    )
}

export default FolderRow