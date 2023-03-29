import React, { useEffect, useState } from 'react'
import { Folder } from './Folder'
import FolderList from './FolderList'
// import { MOCK_FOLDERS } from './MockFolders'
import { folderAPI } from './FolderAPI'

function FoldersPage(){

    // const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS)
    const [folders, setFolders] = useState<Folder[]>([])

    const handleSave = (folder: Folder, newFolder: boolean) => {
        let updatedFolders: React.SetStateAction<Folder[]> = [];
        if (newFolder){
            folder.id = folders.length + 1;
            updatedFolders = [...folders];
            updatedFolders.push(folder);
        } else {
            updatedFolders = folders.map((f:Folder) => {
                return f.id === folder.id ? folder : f
            })}
        setFolders(updatedFolders);
    }
    const handleDelete = (folder: Folder) => {
        let updatedFolders = folders.filter(f => folder.id !== f.id);
        setFolders(updatedFolders);
    }

    useEffect(() => {
        async function loadFolders() {
          try {
            const data = await folderAPI.get();
            setFolders(data);
          }
           catch (e) {
            if (e instanceof Error) {
              console.log(e.message);
            }}
        }
        loadFolders();
      }, []);

    return (
        <FolderList 
            folders={folders} 
            onSave={handleSave}
            onDelete={handleDelete}
        />
    )
}

export default FoldersPage