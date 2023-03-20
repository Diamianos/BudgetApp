import React, { useState } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Folder } from './Folder'
import FolderRow from './FolderRow'
import FolderRowEdit from './FolderRowEdit';
import FolderRowNew from './FolderRowNew';

// https://minicss.us/docs.htm#tables

interface FolderListProps {
    folders: Folder[];
    onSave: (folder: Folder, newFolder: boolean) => void;
    onDelete: (folder: Folder) => void;
}

export default function FolderList({folders, onSave, onDelete}: FolderListProps) {

    const [folderBeingEdited, setFolderBeingEdited] = useState({});
    const [hideNewFolder, setHideNewFolder] = useState(true);

    const handleEdit = (folder: Folder) => {
        setHideNewFolder(true)
        setFolderBeingEdited(folder)
    }
    const handleCancel = (newFolder: boolean) => {
        if (newFolder){setHideNewFolder(true)};
        setFolderBeingEdited({});
    }

    const handleNewFolder = (hideFolder: boolean) => {
        setHideNewFolder(hideFolder);
        setFolderBeingEdited({});
    }

    const handleSave = (folder: Folder, newFolder: boolean) => {
        if (newFolder){
            setHideNewFolder(true)
        }
        onSave(folder, newFolder)
    }

    return (
            <div>
                <div className='new-folder-div'>
                    <button
                        className="tertiary medium new-folder-row-button"
                        onClick={() => {handleNewFolder(false)}}
                        >New Folder
                    </button>
                </div> 
                <table className="folder-table striped hoverable">
                    <caption className='folder-table-caption'>Folders</caption>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Remaining</th>
                        <th className="action-header text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <FolderRowNew onSave={handleSave} onCancel={handleCancel} hideNewFolder={hideNewFolder}/>
                        {folders.map((folder) => (
                            <React.Fragment key={folder.id}>
                                {folder === folderBeingEdited ?
                                <FolderRowEdit 
                                    folder={folder}
                                    onSave={handleSave} 
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

