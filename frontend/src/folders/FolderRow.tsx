import React from 'react'
import { Folder } from './Folder'
import FolderCell from './FolderCell';

interface FolderRowProps{
    folder:Folder;
    onEdit: (folder: Folder) => void
    indexFolderBeingEdited: number | undefined
}

function FolderRow(props: FolderRowProps) {
    const {folder, onEdit, indexFolderBeingEdited} = props;
    const handleDeleteClick = (folderBeingDeleted: Folder) => {
        console.log(folderBeingDeleted);
    }
    const handleEdit = (folder: Folder) => {
        onEdit(folder);
    }

    return (
        <tr>
            <FolderCell label="Name" value={folder.name} folder_id={folder.id} indexFolderBeingEdited={indexFolderBeingEdited} />
            <FolderCell label="Amount" value={folder.amount} folder_id={folder.id} indexFolderBeingEdited={indexFolderBeingEdited} />
            <FolderCell label="Balance" value={folder.balance} folder_id={folder.id} indexFolderBeingEdited={indexFolderBeingEdited} />
            <td data-label="Actions" className='action-buttons'>
                <button 
                    className="primary small folder-row-button"
                    onClick={() => {handleEdit(folder)}}>Edit
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