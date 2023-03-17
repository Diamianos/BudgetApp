import React, { useState } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Folder } from './Folder'
import FolderRow from './FolderRow'

// https://minicss.us/docs.htm#tables

interface FolderListProps {
    folders: Folder[];
    onSave: (folder: Folder) => void;
}

export default function FolderList({folders, onSave}: FolderListProps) {

    const [indexFolderBeingEdited, setIndexFolderBeingEdited] = useState<number|undefined>(undefined);

    const handleEdit = (folder: Folder) => {
        console.log("Folder with id clicked: " + folder.id)
        setIndexFolderBeingEdited(folder.id)
    }
    const handleCancel = () => {
        setIndexFolderBeingEdited(undefined);
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
                        <FolderRow 
                            key={folder.id} 
                            folder={folder} 
                            onEdit={handleEdit} 
                            onCancel={handleCancel}
                            indexFolderBeingEdited={indexFolderBeingEdited} 
                        />
                    ))}
                </tbody>
            </table>
            </div>
    )
}

