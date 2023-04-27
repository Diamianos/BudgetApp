import React, { useState } from 'react'
import { InitialData } from './InitialData'
import Column from './Column'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import { Button, Container } from '@mui/material'

function CreateSubFoldersPage() {

    const [foldersAndColumns, setFoldersAndColumns] = useState(InitialData)

    const handleSplitFolders = (event: any) => {
        console.log(JSON.stringify(foldersAndColumns.columns))
    }

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

        const start = foldersAndColumns.columns[source.droppableId as keyof typeof foldersAndColumns.columns];
        const finish = foldersAndColumns.columns[destination.droppableId as keyof typeof foldersAndColumns.columns];

        // Moving within the same column
        if (start === finish){
            const newFolderIds = Array.from(start.folderIds)

            newFolderIds.splice(source.index, 1);
            newFolderIds.splice(destination.index, 0, draggableId);


            const newColumn = {
                ...start,
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
            return;
        }

        // Moving from one list to another
        const startFolderIds = Array.from(start.folderIds)
        startFolderIds.splice(source.index, 1);
        const newStart = {
        ...start,
        folderIds: startFolderIds,
        };

        const finishFolderIds = Array.from(finish.folderIds);
        finishFolderIds.splice(destination.index, 0, draggableId);
        const newFinish = {
        ...finish,
        folderIds: finishFolderIds,
        };

        const newState = {
            ...foldersAndColumns,
            columns: {
                ...foldersAndColumns.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setFoldersAndColumns(newState);
    };

    return (
        <>
            <DragDropContext
                onDragEnd={handleOnDragEnd}>
                <Container sx={{display: 'flex'}} disableGutters>
                {foldersAndColumns.columnOrder.map(columnId => {
                    const column = foldersAndColumns.columns[columnId as keyof typeof foldersAndColumns.columns];
                    const initialFolders = column.folderIds.map(folderId => foldersAndColumns.folders[folderId as keyof typeof foldersAndColumns.folders]);
                    return <Column key={column.id} column={column} folders={initialFolders} />
                })}
                </Container>
            </DragDropContext>
            <Button 
            variant="contained"
            onClick={handleSplitFolders}
            color='success'
            sx={{marginTop:'15px'}}>Split Folders
            </Button>
        </>
    )
}

export default CreateSubFoldersPage