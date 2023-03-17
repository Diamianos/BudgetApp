import React, { useState } from 'react'

interface FolderCellProps{
    label: string;
    value: string | number;
    folder_id: number | undefined;
    indexFolderBeingEdited: number | undefined;
}

function FolderCell(props : FolderCellProps) {
    const {label, value, folder_id, indexFolderBeingEdited} = props;

    const handleFieldEdit = (e : React.ChangeEvent<HTMLInputElement>) => {
        return;
    }

    return (
        <td data-label={label}>
            { indexFolderBeingEdited === folder_id ? <input value={value} 
            onChange={handleFieldEdit}
            />: <span>{value}</span> } 
        </td> 
    )
}

export default FolderCell