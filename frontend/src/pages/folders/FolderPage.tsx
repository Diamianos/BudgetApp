import React, { useState } from "react";
import { Folder } from "../../components/Folder";
import FolderList from "./FolderList";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

function FoldersPage() {
	const [folders, setFolders] = useState<Folder[]>([]);
	const [openDialog, setOpenDialog] = useState(false);

	// URI params from react router
	const { monthYearPeriod } = useParams();
	let month = "";
	let year = "";
	parseMonthYearPeriodString();

	function parseMonthYearPeriodString() {
		var customParseFormat = require("dayjs/plugin/customParseFormat");
		dayjs.extend(customParseFormat);
		const dateObject = dayjs(monthYearPeriod, "YYYY-MM-DD");
		month = dateObject.format("MMMM");
		year = dateObject.format("YYYY");
	}

	const handleSave = (folder: Folder, newFolder: boolean) => {
		folder.monthYearPeriod = monthYearPeriod!;

		let updatedFolders: React.SetStateAction<Folder[]> = [];
		if (newFolder) {
			if (checkForDuplicateFolderName(folder, folders)) {
				setOpenDialog(true);
				return;
			}
			console.log(folder);
			updatedFolders = [...folders];
			updatedFolders.push(folder);
			updatedFolders.sort((a, b) => a.name.localeCompare(b.name)); // Sorting alphabetically by name
		} else {
			updatedFolders = folders.map((f: Folder) => {
				return f.name === folder.name ? folder : f;
			});
		}
		setFolders(updatedFolders);
	};
	const handleDelete = (folder: Folder) => {
		let updatedFolders = folders.filter((f) => folder.name !== f.name);
		setFolders(updatedFolders);
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	return (
		<>
			<Typography variant="h4" textAlign="center" mt="1rem" mb="1rem">
				{month + " " + year}
			</Typography>
			<FolderList
				folders={folders}
				onSave={handleSave}
				onDelete={handleDelete}
				monthYearPeriod={monthYearPeriod!}
			/>

			<Dialog
				open={openDialog}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Duplicate Folder Name Found"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Unable to save new folder. Please choose a different name.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Okay</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

function checkForDuplicateFolderName(folder: Folder, folders: Folder[]) {
	let duplicate = false;

	folders.forEach((f) => {
		if (f.name.toLowerCase().trim() === folder.name.toLowerCase().trim()) {
			duplicate = true;
		}
	});

	return duplicate;
}

export default FoldersPage;
