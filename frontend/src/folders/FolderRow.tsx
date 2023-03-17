import React from 'react'
import { Folder } from './Folder'

interface FolderRowProps{
    folder:Folder;
}

function FolderRow(props: FolderRowProps) {
    const {folder} = props;
    const handleEditClick = (folderBeingEdited: Folder) => {
        console.log(folderBeingEdited);
    }
    const handleDeleteClick = (folderBeingDeleted: Folder) => {
        console.log(folderBeingDeleted);
    }

    return (
        <tr>
            <td data-label="Name">{folder.name}</td>
            <td data-label="Amount">{folder.amount}</td>
            <td data-label="Balance">{folder.balance}</td>
            <td data-label="Actions" className='action-buttons'>
                <button 
                    className="primary small folder-row-button"
                    onClick={() => {handleEditClick(folder)}}>Edit
                </button>
                <button 
                    className="secondary small folder-row-button"
                    onClick={() => {handleDeleteClick(folder)}}>Delete
                </button>
            </td>
        </tr>
    )
}

export default FolderRow