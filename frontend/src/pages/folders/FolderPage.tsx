import React, { useEffect, useState } from "react";
import { Folder } from "../../components/Folder";
import FolderList from "./FolderList";
import { Box } from "@mui/system";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function FoldersPage() {
	const [folders, setFolders] = useState<Folder[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const handleMonthChange = (event: SelectChangeEvent) => {
		setMonth(event.target.value as string);
	};

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

	useEffect(() => {
		setFolders([]);
	}, [month, year]);

	return (
		<>
			<h2 className="table-header">Folders</h2>

			<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
				<FormControl sx={{ minWidth: 120 }}>
					<InputLabel id="simple-select-label">Month</InputLabel>
					<Select
						labelId="simple-select-label"
						id="simple-select"
						value={month}
						label="Month"
						onChange={handleMonthChange}
					>
						{months.map((name) => (
							<MenuItem key={name} value={name}>
								{name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					variant="outlined"
					type="number"
					label="Year"
					value={year}
					onChange={(e) => {
						setYear(e.target.value);
					}}
					sx={{ marginLeft: ".5rem", marginRight: ".5rem" }}
				></TextField>
			</Box>
			<FolderList
				folders={folders}
				onSave={handleSave}
				onDelete={handleDelete}
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
