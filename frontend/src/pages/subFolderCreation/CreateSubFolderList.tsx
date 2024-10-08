import {
	Alert,
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import React, { useEffect } from "react";
import { SplitFolderHistoryObject } from "../../interfaces/SplitFolderHistoryObject";
import { Folder } from "../../components/Folder";
import {
	Draggable,
	DroppableProvided,
	DroppableStateSnapshot,
} from "react-beautiful-dnd";

import { FolderStateInterface } from "../../interfaces/FolderStateInterface";
import { FolderAndColumnStateInterface } from "../../interfaces/FolderAndColumnStateInterface";

interface FolderListProps {
	folders: Folder[];
	column: { id: string; title: string; folderIds: string[] };
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	foldersAndColumns: FolderAndColumnStateInterface;
	splitFolderHistory: SplitFolderHistoryObject;
	setFoldersAndColumns: (data: FolderAndColumnStateInterface) => void;
	setSplitFolderHistory: (data: SplitFolderHistoryObject) => void;
}

interface DialogContentInterface {
	folderName: string;
	folderAmount: number;
	folderDraggableId: string;
	days1_14Amount: number;
	days15_30Amount: number;
}

function CreateSubFolderList({
	folders,
	column,
	provided,
	snapshot,
	foldersAndColumns,
	splitFolderHistory,
	setFoldersAndColumns,
	setSplitFolderHistory,
}: FolderListProps) {
	/****
	 * States
	 */
	const [dialogContentInformation, setDialogContentInformation] =
		React.useState({
			folderName: "",
			folderAmount: 0,
			folderDraggableId: "",
			days1_14Amount: 0,
			days15_30Amount: 0,
		});
	const [showDialogError, setShowDialogError] = React.useState({
		showError: false,
		errorMessage: "",
	});
	const [open, setOpen] = React.useState(false);
	const [openPopup, setOpenPopup] = React.useState(false);
	const [splitEvenly, setSplitEvenly] = React.useState(false);

	/******************
	 * Refs
	 */
	const inputRef = React.useRef<HTMLInputElement>(null);

	/******************
	 * Effects
	 */

	// This is used for setting the focus and selecting the first input box for the dialg pop up box
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (openPopup && inputRef.current) {
				inputRef.current.focus();
				inputRef.current.select();
			}
		}, 0);
		return () => clearTimeout(timeout);
	}, [openPopup]);

	// Used to handle splitting sub folders evenly based off of a boolean state value
	useEffect(() => {
		handleRegularFolderSubmit(
			foldersAndColumns,
			dialogContentInformation,
			splitFolderHistory,
			setSplitFolderHistory,
			setFoldersAndColumns,
			setOpen,
			setOpenPopup
		);
	}, [splitEvenly]);

	/******************
	 * Arrow Functions
	 */

	const handleSplitButton = (folder: Folder) => {
		// Assigning information from folder that had its "Split" button clicked to the dialog information state for display
		const newDialogViewInformation = {
			folderName: folder.name,
			folderAmount: folder.amount,
			folderDraggableId: folder.draggable_id,
			days1_14Amount: 0,
			days15_30Amount: 0,
		};
		setDialogContentInformation(newDialogViewInformation);
		setOpen(true);
		setOpenPopup(true);
	};

	const handleSplitEditButton = (folder: Folder) => {
		const splitFolder = retrieveSplitFolderInformation(
			splitFolderHistory,
			folder.name
		);

		// Assigning information from folder that had its "Edit Split" button clicked to the dialog information state for display
		const newDialogViewInformation = {
			folderName: folder.name,
			folderAmount: splitFolder.folderAmountTotal,
			folderDraggableId: folder.draggable_id,
			days1_14Amount: splitFolder.folderOneAmount,
			days15_30Amount: splitFolder.folderTwoAmount,
		};
		setDialogContentInformation(newDialogViewInformation);
		setOpen(true);
		setOpenPopup(true);
	};

	const handleClose = () => {
		setOpen(false);
		setOpenPopup(false);
		setShowDialogError({ showError: false, errorMessage: "" });
	};

	const handleDialogTextFieldChange = (event: any) => {
		const { name, value } = event.target;

		let updatedValue = value;
		// if input type is number, convert the updatedValue string to a number

		// Regex to validate input is a number
		const re = /^[0-9\b]+$/;

		if (updatedValue === "" || re.test(updatedValue)) {
			const newDialogContentInformation = {
				...dialogContentInformation,
				[name]: Number(updatedValue),
			};

			setShowDialogError({ showError: false, errorMessage: "" });

			setDialogContentInformation(newDialogContentInformation);
		}
	};

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			handleSplitSubmit();
		}
	};

	// This relies on a 'useEffect' hook to kick off the split even process
	const handleSplitEvenly = () => {
		const newDialogContentInformation = { ...dialogContentInformation };
		newDialogContentInformation.days1_14Amount =
			newDialogContentInformation.folderAmount / 2;
		newDialogContentInformation.days15_30Amount =
			newDialogContentInformation.folderAmount / 2;
		setDialogContentInformation(newDialogContentInformation);
		// This set has a 'useEffect' hook attached so that it will split the folders after the 'setDialogContentInformation' has completed
		setSplitEvenly(!splitEvenly);
	};

	const handleSplitSubmit = () => {
		console.log(dialogContentInformation);
		// Check dialog text fields for errors
		if (
			checkDialogFieldsForErrors(dialogContentInformation, setShowDialogError)
		) {
			return;
		}

		// Checking if when "Split" button was pressed in the "Split Folder" dialog box, if we are modifying an
		// original folder, or a folder that was already split, and branching accordingly
		determineFolderIsSplitFolder(
			splitFolderHistory,
			dialogContentInformation.folderName
		)
			? handleSplitFolderSubmit(
					foldersAndColumns,
					dialogContentInformation,
					splitFolderHistory,
					setSplitFolderHistory,
					setFoldersAndColumns,
					setOpen,
					setOpenPopup
			  )
			: handleRegularFolderSubmit(
					foldersAndColumns,
					dialogContentInformation,
					splitFolderHistory,
					setSplitFolderHistory,
					setFoldersAndColumns,
					setOpen,
					setOpenPopup
			  );
	};

	return (
		<Container
			ref={provided.innerRef}
			{...provided.droppableProps}
			disableGutters
			sx={{
				padding: "8px",
				transition: "background-color 0.2s ease",
				backgroundColor: snapshot.isDraggingOver ? "aquamarine" : "white",
				flexGrow: "1",
			}}
		>
			{folders
				.map((folder, index) => (
					<Draggable
						key={folder.draggable_id}
						draggableId={folder.draggable_id.toString()}
						index={index}
					>
						{(provided, snapshot) => (
							<Box
								{...provided.draggableProps}
								ref={provided.innerRef}
								sx={{
									display: "flex",
									border: "1px solid grey",
									borderRadius: "15px",
									padding: "8px",
									marginBottom: "8px",
									backgroundColor: snapshot.isDragging ? "lightblue" : "white",
								}}
							>
								<Box {...provided.dragHandleProps} sx={{ marginRight: "15px" }}>
									{!determineFolderIsSplitFolder(
										splitFolderHistory,
										folder.name
									) && <DragIndicatorIcon></DragIndicatorIcon>}
								</Box>
								<Typography sx={{ marginRight: "10px" }} variant="body1">
									{folder.name}
								</Typography>
								<Typography variant="body1">{folder.amount}</Typography>
								{column.title === "Distribute" ? (
									<Button
										variant="contained"
										size="small"
										sx={{ marginLeft: "auto" }}
										onClick={() => {
											handleSplitButton(folder);
										}}
									>
										Split
									</Button>
								) : (
									determineFolderIsSplitFolder(
										splitFolderHistory,
										folder.name
									) && (
										<Button
											variant="contained"
											color="secondary"
											size="small"
											sx={{ marginLeft: "auto" }}
											onClick={() => {
												handleSplitEditButton(folder);
											}}
										>
											Edit Split
										</Button>
									)
								)}
							</Box>
						)}
					</Draggable>
				))}
			{provided.placeholder}
			<Dialog disableRestoreFocus={true} open={open} onClose={handleClose}>
				<DialogTitle sx={{ textAlign: "center" }}>Split Folder</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ textAlign: "center" }}>
						Please indicate below the amount to put in each folder. The total
						between both folder amounts must equal{" "}
						{dialogContentInformation.folderAmount}... Half is{" "}
						{dialogContentInformation.folderAmount / 2}
					</DialogContentText>
					<TextField
						margin="dense"
						id="folderName"
						label="Folder Name"
						type="email"
						fullWidth
						variant="standard"
						value={dialogContentInformation.folderName}
						InputProps={{
							readOnly: true,
						}}
					/>
					<TextField
						margin="dense"
						name="days1_14Amount"
						label="Days 1-14 Folder Amount"
						fullWidth
						variant="standard"
						value={
							dialogContentInformation.days1_14Amount
								? dialogContentInformation.days1_14Amount
								: ""
						}
						inputRef={inputRef}
						onChange={handleDialogTextFieldChange}
					/>
					<TextField
						margin="dense"
						name="days15_30Amount"
						label="Days 15-30 Folder Amount"
						fullWidth
						variant="standard"
						value={
							dialogContentInformation.days15_30Amount
								? dialogContentInformation.days15_30Amount
								: ""
						}
						onChange={handleDialogTextFieldChange}
						onKeyDown={handleKeyDown}
					/>
				</DialogContent>
				{showDialogError.showError && (
					<Alert variant="filled" severity="error">
						{showDialogError.errorMessage}
					</Alert>
				)}
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSplitSubmit}>Split</Button>
					<Button
						disabled={column.title === "Distribute" ? false : true}
						onClick={handleSplitEvenly}
					>
						Split Evenly
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}

/**************************
 * Page specific functions
 */

function retrieveSplitFolderInformation(
	splitFolderHistory: SplitFolderHistoryObject,
	folderName: string
) {
	for (const key in splitFolderHistory) {
		const splitFolder = splitFolderHistory[key];
		if (splitFolder.folderName === folderName) {
			return splitFolder;
		}
	}
	const emptySplitFolder = {
		folderName: "",
		folderAmountTotal: 0,
		folderOneAmount: 0,
		folderOneDraggableId: "",
		folderTwoAmount: 0,
		folderTwoDraggableId: "",
	};
	return emptySplitFolder;
}

function determineFolderIsSplitFolder(
	splitFolderHistory: SplitFolderHistoryObject,
	folderName: string
) {
	for (const key in splitFolderHistory) {
		const splitFolder = splitFolderHistory[key];
		if (splitFolder.folderName === folderName) {
			return true;
		}
	}
	return false;
}

function checkDialogFieldsForErrors(
	dialogContentInformation: DialogContentInterface,
	setShowDialogError: React.Dispatch<
		React.SetStateAction<{
			showError: boolean;
			errorMessage: string;
		}>
	>
) {
	const { folderAmount, days1_14Amount, days15_30Amount } =
		dialogContentInformation;

	if (days1_14Amount < 0 || days15_30Amount < 0) {
		const newError = {
			showError: true,
			errorMessage: "Neither value can be a negative",
		};
		setShowDialogError(newError);
		return true;
	}
	if (days1_14Amount + days15_30Amount !== folderAmount) {
		const newError = {
			showError: true,
			errorMessage: "Both folder amounts must equal " + folderAmount.toString(),
		};
		setShowDialogError(newError);
		return true;
	}

	return false;
}

function determineNextDraggableId(
	foldersAndColumns: FolderAndColumnStateInterface
) {
	const draggableIds: number[] = [];
	Object.values(foldersAndColumns.folders).forEach((f) =>
		draggableIds.push(f.draggable_id)
	);
	return Math.max(...draggableIds) + 1;
}

function retrieveFoldersByDraggableId(
	folderIds: string[],
	foldersAndColumns: FolderAndColumnStateInterface
) {
	const folders: Folder[] = [];

	const existingFolders = foldersAndColumns.folders;
	for (let i = 0; i < folderIds.length; i++) {
		folders.push(
			existingFolders[
				folderIds[i].toString() as keyof typeof foldersAndColumns.folders
			]
		);
	}

	return folders;
}

function handleSplitFolderSubmit(
	foldersAndColumns: FolderAndColumnStateInterface,
	dialogContentInformation: DialogContentInterface,
	splitFolderHistory: SplitFolderHistoryObject,
	setSplitFolderHistory: (data: SplitFolderHistoryObject) => void,
	setFoldersAndColumns: (data: FolderAndColumnStateInterface) => void,
	setOpen: (data: boolean) => void,
	setOpenPopup: (data: boolean) => void
) {
	const splitFolder = retrieveSplitFolderInformation(
		splitFolderHistory,
		dialogContentInformation.folderName
	);
	const { folderOneDraggableId, folderTwoDraggableId } = splitFolder;
	const [firstFolder, secondFolder] = retrieveFoldersByDraggableId(
		Array.of(folderOneDraggableId, folderTwoDraggableId),
		foldersAndColumns
	);

	firstFolder.amount = dialogContentInformation.days1_14Amount;
	secondFolder.amount = dialogContentInformation.days15_30Amount;

	if (firstFolder.amount !== 0 && secondFolder.amount !== 0) {
		// Both folders have a positive value amount

		const newFoldersAndColumns = {
			...foldersAndColumns,
			folders: {
				...foldersAndColumns.folders,
				[firstFolder.draggable_id]: firstFolder,
				[secondFolder.draggable_id]: secondFolder,
			},
		};

		const newSplitFolder = {
			folderName: dialogContentInformation.folderName,
			folderAmountTotal: dialogContentInformation.folderAmount,
			folderOneAmount: dialogContentInformation.days1_14Amount,
			folderOneDraggableId: firstFolder.draggable_id,
			folderTwoAmount: dialogContentInformation.days15_30Amount,
			folderTwoDraggableId: secondFolder.draggable_id,
		};
		const newSplitFolderHistory = {
			...splitFolderHistory,
			[newSplitFolder.folderName]: newSplitFolder,
		};

		setSplitFolderHistory(newSplitFolderHistory);
		setFoldersAndColumns(newFoldersAndColumns);
		setOpen(false);
		setOpenPopup(false);
	} else {
		// One folder is 0, correct folders to reflect
		const folderToBeRemoved =
			firstFolder.amount === 0 ? firstFolder : secondFolder;
		const folderToRemain =
			firstFolder.amount === 0 ? secondFolder : firstFolder;

		// Removing both folder ids from column 1

		const column_1 = {
			...foldersAndColumns.columns[
				"column-1" as keyof typeof foldersAndColumns.columns
			],
		};
		const column_1FolderIds = Array.from(column_1.folderIds);
		const filteredColumn1FolderIds = column_1FolderIds.filter(function (e) {
			return (
				e !== folderToBeRemoved.draggable_id &&
				e !== folderToRemain.draggable_id
			);
		});

		// Removing both folder ids from column 3
		const column_3 = {
			...foldersAndColumns.columns[
				"column-3" as keyof typeof foldersAndColumns.columns
			],
		};
		const column_3FolderIds = Array.from(column_3.folderIds);
		const filteredColumn3FolderIds = column_3FolderIds.filter(function (e) {
			return (
				e !== folderToBeRemoved.draggable_id &&
				e !== folderToRemain.draggable_id
			);
		});

		// Adding the folder to the correct column for the one which is staying
		if (dialogContentInformation.days1_14Amount === 0) {
			filteredColumn3FolderIds.push(folderToRemain.draggable_id);
		} else {
			filteredColumn1FolderIds.push(folderToRemain.draggable_id);
		}

		// Removing the folder that needs to be taken away
		const newFolders = { ...foldersAndColumns.folders };
		delete newFolders[
			folderToBeRemoved.draggable_id as keyof typeof foldersAndColumns.folders
		];

		// new folder and column state
		const newFoldersAndColumns = {
			folders: newFolders,
			columns: {
				...foldersAndColumns.columns,
				[column_1.id]: {
					...foldersAndColumns.columns[
						column_1.id as keyof typeof foldersAndColumns.columns
					],
					folderIds: filteredColumn1FolderIds,
				},
				[column_3.id]: {
					...foldersAndColumns.columns[
						column_3.id as keyof typeof foldersAndColumns.columns
					],
					folderIds: filteredColumn3FolderIds,
				},
			},
			columnOrder: foldersAndColumns.columnOrder,
		};

		const newSplitFolderHistory = { ...splitFolderHistory };
		delete newSplitFolderHistory[dialogContentInformation.folderName];

		console.log(newFoldersAndColumns);

		setSplitFolderHistory(newSplitFolderHistory);
		setFoldersAndColumns(newFoldersAndColumns);
		setOpen(false);
		setOpenPopup(false);
	}
}

function handleRegularFolderSubmit(
	foldersAndColumns: FolderAndColumnStateInterface,
	dialogContentInformation: DialogContentInterface,
	splitFolderHistory: SplitFolderHistoryObject,
	setSplitFolderHistory: (data: SplitFolderHistoryObject) => void,
	setFoldersAndColumns: (data: FolderAndColumnStateInterface) => void,
	setOpen: (data: boolean) => void,
	setOpenPopup: (data: boolean) => void
) {
	// Checking all folders and getting the next draggable ID for assigning to the new folders
	const nextDraggableId = determineNextDraggableId(foldersAndColumns);

	// Creating the two new folders from the split with the new draggable IDs
	let days1_14Folder = new Folder();
	if (dialogContentInformation.days1_14Amount !== 0) {
		days1_14Folder = new Folder({
			draggable_id: nextDraggableId.toString(),
			name: dialogContentInformation.folderName,
			amount: dialogContentInformation.days1_14Amount,
		});
	}
	// Just incremeting the draggable ID by one for next folder
	let days15_30Folder = new Folder();
	if (dialogContentInformation.days15_30Amount !== 0) {
		days15_30Folder = new Folder({
			draggable_id: (nextDraggableId + 1).toString(),
			name: dialogContentInformation.folderName,
			amount: dialogContentInformation.days15_30Amount,
		});
	}

	// Getting the columns from the folderAndColumn state for mutating the state
	// TODO: I'm sure theres a better way to do this with deconstruction, need to fix this.
	const column1 = foldersAndColumns.columns["column-1"];
	const column2 = foldersAndColumns.columns["column-2"];
	const column3 = foldersAndColumns.columns["column-3"];

	// Pushing one of the split folders to the first "Day 1-14" column
	const column1FolderIds: string[] = Array.from(column1.folderIds);
	if (dialogContentInformation.days1_14Amount !== 0) {
		column1FolderIds.push(days1_14Folder.draggable_id);
	}

	// Removing the original folder by index
	const column2FolderIds: string[] = Array.from(column2.folderIds);
	let index = column2FolderIds.indexOf(
		dialogContentInformation.folderDraggableId.toString()
	);
	if (index !== -1) {
		column2FolderIds.splice(index, 1);
	}

	// Pushing one of the split folders to the second "Day 15-20" column
	const column3FolderIds: string[] = Array.from(column3.folderIds);
	if (dialogContentInformation.days15_30Amount !== 0) {
		column3FolderIds.push(days15_30Folder.draggable_id);
	}

	// Creating the new 1-3 columns with the new folder IDs
	const newColumn1 = {
		...column1,
		folderIds: column1FolderIds,
	};
	const newColumn2 = {
		...column2,
		folderIds: column2FolderIds,
	};
	const newColumn3 = {
		...column3,
		folderIds: column3FolderIds,
	};

	const newFolders: FolderStateInterface = {};
	if (days1_14Folder.amount !== 0) {
		newFolders[days1_14Folder.draggable_id] = days1_14Folder;
	}
	if (days15_30Folder.amount !== 0) {
		newFolders[days15_30Folder.draggable_id] = days15_30Folder;
	}

	// Creating the new state for the foldersAndColumns
	const newFoldersAndColumns = {
		...foldersAndColumns,
		folders: {
			...foldersAndColumns.folders,
			...newFolders,
		},
		columns: {
			...foldersAndColumns.columns,
			[newColumn1.id]: newColumn1,
			[newColumn2.id]: newColumn2,
			[newColumn3.id]: newColumn3,
		},
	};

	// Adding draggable Ids to the splitFolderHistory state for hidding drag handle div

	if (days1_14Folder.amount !== 0 && days15_30Folder.amount !== 0) {
		const newSplitFolder = {
			folderName: dialogContentInformation.folderName,
			folderAmountTotal: dialogContentInformation.folderAmount,
			folderOneAmount: dialogContentInformation.days1_14Amount,
			folderOneDraggableId: days1_14Folder.draggable_id,
			folderTwoAmount: dialogContentInformation.days15_30Amount,
			folderTwoDraggableId: days15_30Folder.draggable_id,
		};
		const newSplitFolderHistory = {
			...splitFolderHistory,
			[newSplitFolder.folderName]: newSplitFolder,
		};

		setSplitFolderHistory(newSplitFolderHistory);
	}

	setFoldersAndColumns(newFoldersAndColumns);
	setOpen(false);
	setOpenPopup(false);
}

export default CreateSubFolderList;
