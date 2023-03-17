import React from 'react'
import { Folder } from './Folder'
import FolderCell from './FolderCell';

interface FolderRowProps{
    folder:Folder;
    onEdit: (folder: Folder) => void;
    onCancel: () => void;
    indexFolderBeingEdited: number | undefined;
}

function FolderRow(props: FolderRowProps) {
    const {folder, onEdit, onCancel, indexFolderBeingEdited} = props;
    const handleCancel = () => {
        onCancel();
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
                {folder.id === indexFolderBeingEdited ? 
                    <button className="tertiary small folder-row-button"
                    onClick={() => {console.log("Save Button clicked")}}>Save
                    </button>: 
                    <button className="primary small folder-row-button"
                    onClick={() => {handleEdit(folder)}}>Edit
                    </button>
                }
                {folder.id === indexFolderBeingEdited ?
                    <button 
                    className="inverse small folder-row-button"
                        onClick={() => {handleCancel()}}>Cancel
                    </button>
                    :
                    <button 
                        className="secondary small folder-row-button"
                        onClick={() => {console.log("Delete button clicked")}}>Delete
                    </button>
                }
            </td>
        </tr>
    )
}

export default FolderRow