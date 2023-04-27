import React, { useState } from 'react'
import { InitialData } from './InitialData'
import Column from './Column'
import {DragDropContext} from 'react-beautiful-dnd'

function CreateSubFoldersPage() {

    const [foldersAndColumns, setFoldersAndColumns] = useState(InitialData)

    const handleOnDragEnd = (result:any) =>
        console.log('handleOnDragEnd()')

    return (
        <DragDropContext
            onDragEnd={handleOnDragEnd}>
            {foldersAndColumns.columnOrder.map(columnId => {
                const column = foldersAndColumns.columns[columnId as keyof typeof foldersAndColumns.columns];
                const initialFolders = column.folderIds.map(folderId => foldersAndColumns.folders[folderId as keyof typeof foldersAndColumns.folders]);
                return <Column key={column.id} column={column} folders={initialFolders} />
            })}
        </DragDropContext>
    )
}

export default CreateSubFoldersPage