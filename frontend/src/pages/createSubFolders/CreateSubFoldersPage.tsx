import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlankInitialData } from "./BlankInitialData";
import { SplitFolderHistoryObject } from "../../interfaces/SplitFolderHistoryObject";
import CreateSubFolderColumn from "./CreateSubFolderColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import { folderAPI } from "../../apis/FolderAPI";
import { Folder } from "../folders/Folder";

import { FolderStateInterface } from "../../interfaces/FolderStateInterface";
import { ColumnStateInterface } from "../../interfaces/ColumnStateInterface";
import { FolderAndColumnStateInterface } from "../../interfaces/FolderAndColumnStateInterface";

function CreateSubFoldersPage() {
	const [foldersAndColumns, setFoldersAndColumns] =
		useState<FolderAndColumnStateInterface>(BlankInitialData);
	const [splitFolderHistory, setSplitFolderHistory] =
		useState<SplitFolderHistoryObject>({});
	const [loading, setLoading] = useState(false);
	const [folderTotalAmount, setFolderTotalAmount] = useState(0);

	// URI params from react router
	const params = useParams();

	const handleSplitFolders = (event: any) => {
		// If any folders remain in the distribute column, present dialog and return from function
		// Ensure both folders equal the same amount, if not present dialog and return from function
		// Call subfolder API to create subfolders with respective monthPeriod value and proceed to Sub Folder page
	};

	const handleOnDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start =
			foldersAndColumns.columns[
				source.droppableId as keyof typeof foldersAndColumns.columns
			];
		const finish =
			foldersAndColumns.columns[
				destination.droppableId as keyof typeof foldersAndColumns.columns
			];

		// Moving within the same column
		if (start === finish) {
			const newFolderIds = Array.from(start.folderIds);

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
					[newColumn.id]: newColumn,
				},
			};

			setFoldersAndColumns(newState);
			return;
		}

		// Moving from one list to another
		const startFolderIds = Array.from(start.folderIds);
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

	useEffect(() => {
		async function loadFolders() {
			setLoading(true);
			try {
				const data = await folderAPI.get();
				parseDataToColumnsAndFolders(data, setFoldersAndColumns);
				calculateTotalFolderAmount(data, setFolderTotalAmount);
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message);
				}
			} finally {
				setLoading(false);
			}
		}
		loadFolders();
	}, []);

	return (
		<>
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			) : (
				<>
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Container sx={{ display: "flex" }} disableGutters>
							{foldersAndColumns.columnOrder.map((columnId) => {
								const column =
									foldersAndColumns.columns[
										columnId as keyof typeof foldersAndColumns.columns
									];
								const initialFolders = column.folderIds.map(
									(folderId) =>
										foldersAndColumns.folders[
											folderId as keyof typeof foldersAndColumns.folders
										]
								);
								return (
									<CreateSubFolderColumn
										key={column.id}
										column={column}
										folders={initialFolders}
										foldersAndColumns={foldersAndColumns}
										splitFolderHistory={splitFolderHistory}
										setFoldersAndColumns={setFoldersAndColumns}
										setSplitFolderHistory={setSplitFolderHistory}
										folderTotalAmount={folderTotalAmount}
									/>
								);
							})}
						</Container>
					</DragDropContext>
					<Button
						variant="contained"
						onClick={handleSplitFolders}
						color="success"
						sx={{ marginTop: "15px" }}
					>
						Split Folders
					</Button>
				</>
			)}
		</>
	);
}

function parseDataToColumnsAndFolders(
	data: Folder[],
	setFoldersAndColumns: (data: FolderAndColumnStateInterface) => void
) {
	const columnFolderIds: string[] = [];
	const newFolderState: FolderStateInterface = {};
	let index = 1;
	for (let i = 0; i < data.length; i++) {
		const folder = data[i];
		folder.draggable_id = index.toString();
		index = index + 1;
		newFolderState[folder.draggable_id.toString()] = folder;
		columnFolderIds.push(folder.draggable_id);
	}

	const newColumnState: ColumnStateInterface = {
		"column-1": {
			id: "column-1",
			title: "Days 1-14",
			folderIds: [],
		},
		"column-2": {
			id: "column-2",
			title: "Distribute",
			folderIds: columnFolderIds,
		},
		"column-3": {
			id: "column-3",
			title: "Days 15 - 30",
			folderIds: [],
		},
	};

	const newColumnAndFolderState: FolderAndColumnStateInterface = {
		folders: newFolderState,
		columns: newColumnState,
		columnOrder: [...BlankInitialData.columnOrder],
	};

	setFoldersAndColumns(newColumnAndFolderState);
}

function calculateTotalFolderAmount(
	data: Folder[],
	setFolderTotalAmount: React.Dispatch<React.SetStateAction<number>>
) {
	let folderTotal = 0;

	data.forEach((f) => {
		folderTotal += f.amount;
	});

	setFolderTotalAmount(folderTotal);
}

export default CreateSubFoldersPage;
