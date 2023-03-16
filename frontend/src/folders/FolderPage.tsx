import React from 'react'
import FolderList from './FolderList'
import { MOCK_FOLDERS } from './MockFolders'

function FoldersPage(){
    return (
    <>
        <FolderList folders={MOCK_FOLDERS} />
    </>
    )
}

export default FoldersPage