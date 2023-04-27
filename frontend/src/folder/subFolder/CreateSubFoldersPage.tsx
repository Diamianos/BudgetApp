import React, { useState } from 'react'
import { InitialData } from './InitialData'
import Column from './Column'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import { Container } from '@mui/material'

function CreateSubFoldersPage() {

    const [foldersAndColumns, setFoldersAndColumns] = useState(InitialData)

    const handleOnDragEnd = (result: DropResult) => {

        const {destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return;
        }



        const column = foldersAndColumns.columns[source.droppableId as keyof typeof foldersAndColumns.columns];
        const newFolderIds = Array.from(column.folderIds)

        newFolderIds.splice(source.index, 1);
        newFolderIds.splice(destination.index, 0, draggableId);


        const newColumn = {
            ...column,
            folderIds: newFolderIds,
        };

        const newState = {
            ...foldersAndColumns,
            columns: {
                ...foldersAndColumns.columns,
                [newColumn.id]: newColumn
            },
        };

        setFoldersAndColumns(newState);
    };

    return (
        <DragDropContext
            onDragEnd={handleOnDragEnd}>
            <Container sx={{display: 'flex'}}>
            {foldersAndColumns.columnOrder.map(columnId => {
                const column = foldersAndColumns.columns[columnId as keyof typeof foldersAndColumns.columns];
                const initialFolders = column.folderIds.map(folderId => foldersAndColumns.folders[folderId as keyof typeof foldersAndColumns.folders]);
                return <Column key={column.id} column={column} folders={initialFolders} />
            })}
            </Container>
        </DragDropContext>
    )
}

export default CreateSubFoldersPage