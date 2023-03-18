import React, { useState } from 'react'
import { Folder } from './Folder'

interface FolderRowNewProps{
    onSave: (folder: Folder, newFolder: boolean) => void;
    onCancel: (newFolder: boolean) => void;
    hideNewFolder: boolean;
}

function FolderRowNew(props: FolderRowNewProps) {
    const {onSave, onCancel, hideNewFolder} = props;
    const [folder, setFolder] = useState(new Folder())

    const handleSave = (folder: Folder) => {
        onSave(folder, true);
        setFolder(new Folder())
    }

    const handleCancel = () => {
        onCancel(true);
    }

    const handleChange = (event: any) => {
        console.log(event)
        const {type, name, value} = event.target;

        let updatedValue = value;
        // if input type is number, convert the updatedValue string to a number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue
        };
        let updatedFolder: Folder;
        // need to do functional updated b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited like project.id
        // the spread operator (...) is used to 
        // spread the previous project properties and the new change
        setFolder((p) => {
            updatedFolder = new Folder({...p, ...change});
            return updatedFolder;
        });
    }
    return (
        <tr className={hideNewFolder ? 'folder-row-new' : ''}>
            <td className='folder-cell' data-label="Name">
                <input value={folder.name} name="name" onChange={handleChange}/> 
            </td>
            <td className='folder-cell' data-label="Amount">
                <input value={folder.amount} name="amount" type="number" onChange={handleChange}/> 
            </td>
            <td className='folder-cell' data-label="Balance">
                <input value={folder.balance} name="balance" type="number" onChange={handleChange}/> 
            </td>
            <td data-label="Actions" className='action-buttons'>
                <button
                    className="tertiary small folder-row-button"
                    onClick={() => {handleSave(folder)}}>Save
                </button> 
                <button
                    className="inverse small folder-row-button"
                    onClick={() => {handleCancel()}}>Cancel
                </button> 
            </td>
        </tr>
    )
}

export default FolderRowNew