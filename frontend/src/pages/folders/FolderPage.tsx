import React, { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import MonthYearDropDown from "../../components/MonthYearDropDown";

function FoldersPage() {
	const [folders, setFolders] = useState<Folder[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [showFolderList, setShowFolderList] = useState(false);

	const handleSave = (folder: Folder, newFolder: boolean) => {
		dayjs.extend(customParseFormat);
		const formattedDate = dayjs(`${year} ${month} 01`, "YYYY MMMM DD").format(
			"MM-DD-YYYY"
		);
		folder.monthYearPeriod = formattedDate;

		let updatedFolders: React.SetStateAction<Folder[]> = [];
		if (newFolder) {
			if (checkForDuplicateFolderName(folder, folders)) {
				setOpenDialog(true);
				return;
			}
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

	const handleMonthYearButtonClick = () => {
		if (year === null || month === null) {
			return;
		}

		if (year.toString().length !== 4) {
			return;
		}
		setShowFolderList(true);
	};

	useEffect(() => {
		setFolders([]);
		setShowFolderList(false);
	}, [month, year]);

	return (
		<>
			<Typography variant="h4" textAlign="center" mt="1rem" mb="1rem">
				Folder Creation
			</Typography>

			<MonthYearDropDown
				month={month}
				setMonth={setMonth}
				year={year}
				setYear={setYear}
				handleMonthYearButtonClick={handleMonthYearButtonClick}
			/>
			{showFolderList ? (
				<FolderList
					folders={folders}
					onSave={handleSave}
					onDelete={handleDelete}
				/>
			) : null}

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
