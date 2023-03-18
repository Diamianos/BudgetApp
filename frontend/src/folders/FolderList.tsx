import React, { useState } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Folder } from './Folder'
import FolderRow from './FolderRow'
import FolderRowEdit from './FolderRowEdit';

// https://minicss.us/docs.htm#tables

interface FolderListProps {
    folders: Folder[];
    onSave: (folder: Folder) => void;
    onDelete: (folder: Folder) => void;
}

export default function FolderList({folders, onSave, onDelete}: FolderListProps) {

    const [folderBeingEdited, setFolderBeingEdited] = useState({});

    const handleEdit = (folder: Folder) => {
        console.log("Folder with id clicked: " + folder.id)
        setFolderBeingEdited(folder)
    }
    const handleCancel = () => {
        setFolderBeingEdited({});
    }

    return (
            <div>
            <table className="folder-table striped hoverable">
                <caption>Folders</caption>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th className="action-header text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {folders.map((folder) => (
                        <React.Fragment key={folder.id}>
                            {folder === folderBeingEdited ?
                            <FolderRowEdit 
                                folder={folder}
                                onSave={onSave} 
                                onCancel={handleCancel}/> 
                            :
                            <FolderRow 
                                folder={folder} 
                                onEdit={handleEdit} 
                                onDelete={onDelete}
                            />}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            </div>
    )
}

