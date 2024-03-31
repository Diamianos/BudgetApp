import React, { useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { folderAPI } from "../../apis/FolderAPI";

import { Folder } from "../../components/Folder";
import FolderRow from "./folderRows/FolderRow";
import FolderRowNew from "./folderRows/FolderRowNew";
import GenericDialog from "../../utils/GenericDialog";
import { DialogInformation } from "../../interfaces/DialogInformation";

// https://minicss.us/docs.htm#tables
// Beautiful React DND tutorial for drag-and-drop list functionality: https://egghead.io/lessons/react-set-up-a-react-environment-with-create-react-app

interface FolderListProps {
	folders: Folder[];
	onSave: (folder: Folder, newFolder: boolean) => void;
	onDelete: (folder: Folder) => void;
	monthYearPeriod: string;
	originalFolders: Folder[];
	existingFolders: boolean;
}

export default function FolderList({
	folders,
	onSave,
	onDelete,
	monthYearPeriod,
	originalFolders,
	existingFolders,
}: FolderListProps) {
	const [hideNewFolder, setHideNewFolder] = useState(true);
	const [dialogInformation, setDialogInformation] = useState<DialogInformation>(
		{
			open: false,
			message: "",
		}
	);

	const handleCancel = (newFolder: boolean) => {
		if (newFolder) {
			setHideNewFolder(true);
		}
	};

	const handleNewFolder = (hideFolder: boolean) => {
		setHideNewFolder(hideFolder);
	};

	const handleSave = (folder: Folder, newFolder: boolean) => {
		if (newFolder) {
			setHideNewFolder(true);
		}
		onSave(folder, newFolder);
	};

	const handleCreateSubFolders = () => {
		try {
			if (existingFolders) {
				setDialogInformation({
					open: true,
					message:
						"Existing folders for month selected, folders will be erased. Select 'Yes' to continue or 'No' to cancel",
				});
			} else {
				addFoldersToDatabaseAndRedirect();
			}
		} catch (Error) {
			console.log("An error occured posting the folders to the database.");
		}
	};

	const handleDialogYes = () => {
		// delete all folders from database
		originalFolders.forEach((f) => {
			folderAPI.delete(f);
		});

		addFoldersToDatabaseAndRedirect();
	};

	const handleDialogNo = () => {
		setDialogInformation({
			open: false,
			message: "",
		});
	};

	function addFoldersToDatabaseAndRedirect() {
		folders.forEach((f) => {
			// Removing id so it doesn't interfere in the database
			f.id = undefined;
		});

		console.log(
			`addFoldersToDatabaseAndRedirect() - sending folders to database: ${JSON.stringify(
				folders
			)}`
		);

		folderAPI.postFolders(folders);

		window.location.href = `/create_subfolders/${monthYearPeriod}`;
	}

	return (
		<>
			<TableContainer>
				<div className="new-folder-div">
					<Button
						variant="contained"
						onClick={() => {
							handleNewFolder(false);
						}}
						color="success"
					>
						New Folder
					</Button>
				</div>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell
								sx={{ fontSize: 16, fontWeight: "bold" }}
								align="center"
							>
								Name
							</TableCell>
							<TableCell
								sx={{ fontSize: 16, fontWeight: "bold" }}
								align="center"
							>
								Amount
							</TableCell>
							<TableCell
								sx={{ fontSize: 16, fontWeight: "bold" }}
								align="center"
							>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!hideNewFolder && (
							<FolderRowNew onSave={handleSave} onCancel={handleCancel} />
						)}
						{folders.map((folder) => (
							<React.Fragment key={folder.id}>
								<FolderRow
									folder={folder}
									onDelete={onDelete}
									onSave={onSave}
								/>
							</React.Fragment>
						))}
					</TableBody>
				</Table>
				<div className="create-subfolders-div">
					<Button
						variant="contained"
						color="secondary"
						onClick={handleCreateSubFolders}
					>
						Save Folders
					</Button>
				</div>
			</TableContainer>
			<GenericDialog
				dialogInformation={dialogInformation}
				setDialogInformation={setDialogInformation}
				handleDialogYes={handleDialogYes}
				handleDialogNo={handleDialogNo}
			></GenericDialog>
		</>
	);
}
