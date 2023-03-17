import React, { useState } from 'react'
import { Folder } from './Folder'
import FolderList from './FolderList'
import { MOCK_FOLDERS } from './MockFolders'

function FoldersPage(){

    const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS)

    const saveFolder = (folder: Folder) => {
        console.log("folder saved");
    }

    return (
    <>
        <FolderList 
            folders={folders} 
            onSave={saveFolder}
        />
    </>
    )
}

export default FoldersPage