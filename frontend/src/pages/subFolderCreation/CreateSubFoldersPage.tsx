import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BlankInitialSubFolderData } from "../../static_data/BlankInitialSubFolderData";
import { SplitFolderHistoryObject } from "../../interfaces/SplitFolderHistoryObject";
import CreateSubFolderColumn from "./CreateSubFolderColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { folderAPI } from "../../apis/FolderAPI";
import { Folder } from "../../components/Folder";

import { FolderStateInterface } from "../../interfaces/FolderStateInterface";
import { ColumnStateInterface } from "../../interfaces/ColumnStateInterface";
import { FolderAndColumnStateInterface } from "../../interfaces/FolderAndColumnStateInterface";
import { SubFolder } from "../../components/SubFolder";
import { subFolderAPI } from "../../apis/SubFolderAPI";

function CreateSubFoldersPage() {
	const [foldersAndColumns, setFoldersAndColumns] =
		useState<FolderAndColumnStateInterface>(BlankInitialSubFolderData);
	const [splitFolderHistory, setSplitFolderHistory] =
		useState<SplitFolderHistoryObject>({});
	const [loading, setLoading] = useState(false);
	const [folderTotalAmount, setFolderTotalAmount] = useState(0);
	const [dialog, setDialog] = useState({
		isOpen: false,
		errorMsg: "",
	});

	// URI params from react router
	const { monthYearPeriod } = useParams();

	const handleSplitFolders = (event: any) => {
		// If any folders remain in the distribute column, present dialog and return from function
		if (foldersAndColumns.columns["column-2"].folderIds.length !== 0) {
			const newDialogState = {
				isOpen: true,
				errorMsg: '"Distribute" column must be empty before splitting',
			};
			setDialog(newDialogState);
			return;
		}

		// Call subfolder API to create subfolders with respective monthPeriod value and proceed to Sub Folder page
		const column1FolderIds = foldersAndColumns.columns["column-1"].folderIds;
		const column3FolderIds = foldersAndColumns.columns["column-3"].folderIds;

		const column1Folders = column1FolderIds.map((id) => {
			return foldersAndColumns.folders[id];
		});
		const column3Folders = column3FolderIds.map((id) => {
			return foldersAndColumns.folders[id];
		});

		column1Folders.forEach((folder) => {
			folder.id = undefined;
			const subFolder = convertFolderToSubfolder(folder, "FIRST_HALF");
			subFolderAPI.post(subFolder, monthYearPeriod);
		});

		column3Folders.forEach((folder) => {
			folder.id = undefined;
			const subFolder = convertFolderToSubfolder(folder, "SECOND_HALF");
			subFolderAPI.post(subFolder, monthYearPeriod);
		});
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

	const handleDialogClose = () => {
		const newDialogState = { isOpen: false, errorMsg: "" };
		setDialog(newDialogState);
	};

	useEffect(() => {
		async function loadFolders() {
			setLoading(true);
			try {
				const data = await folderAPI.getByMonthYearPeriod(monthYearPeriod);
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
	}, [monthYearPeriod]);

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
					<Link to={`/`}>
						<Button
							variant="contained"
							onClick={handleSplitFolders}
							color="success"
							sx={{ marginTop: "15px", marginBottom: "2rem" }}
						>
							Split Folders
						</Button>
					</Link>

					<Dialog
						open={dialog.isOpen}
						onClose={handleDialogClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								{dialog.errorMsg}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleDialogClose}>Okay</Button>
						</DialogActions>
					</Dialog>
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
		columnOrder: [...BlankInitialSubFolderData.columnOrder],
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

function sumColumnFolderAmount(
	column: string,
	foldersAndColumns: FolderAndColumnStateInterface
) {
	let sum = 0;

	const columnFolderIds = foldersAndColumns.columns[column].folderIds;
	columnFolderIds.forEach((id) => {
		const folder = foldersAndColumns.folders[id];
		sum += folder.amount;
	});

	return sum;
}

function convertFolderToSubfolder(folder: Folder, monthPeriod: string) {
	return new SubFolder({
		name: folder.name,
		amount: folder.amount,
		monthPeriod: monthPeriod,
	});
}

export default CreateSubFoldersPage;
