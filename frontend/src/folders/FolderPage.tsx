import React, { useState } from 'react'
import { Folder } from './Folder'
import FolderList from './FolderList'
import { MOCK_FOLDERS } from './MockFolders'

function FoldersPage(){

    const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS)

    const handleSave = (folder: Folder) => {
        let updatedFolders = folders.map((f:Folder) => {
            return f.id === folder.id ? folder : f
        })
        setFolders(updatedFolders);
    }
    const handleDelete = (folder: Folder) => {
        let updatedFolders = folders.filter(f => folder.id !== f.id);
        setFolders(updatedFolders);
    }

    return (
    <>
        <FolderList 
            folders={folders} 
            onSave={handleSave}
            onDelete={handleDelete}
        />
    </>
    )
}

export default FoldersPage