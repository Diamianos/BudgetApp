import React, { useEffect, useState } from "react";
import { Folder } from "./Folder";
import FolderList from "./FolderList";
// import { MOCK_FOLDERS } from './MockFolders'
import { folderAPI } from "../../apis/FolderAPI";
import { Box } from "@mui/system";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

function FoldersPage() {
	// const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS)
	const [folders, setFolders] = useState<Folder[]>([]);
	const [loading, setLoading] = useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);

	const handleSave = async (folder: Folder, newFolder: boolean) => {
		if (checkForDuplicateFolderName(folder, folders)) {
			console.log("Duplicate");
			setOpenDialog(true);
			return;
		}

		console.log("No duplicate");
		let updatedFolders: React.SetStateAction<Folder[]> = [];
		if (newFolder) {
			const newFolder = await folderAPI.post(folder);
			updatedFolders = [...folders];
			updatedFolders.push(new Folder(newFolder));
			updatedFolders.sort((a, b) => a.name.localeCompare(b.name)); // Sorting alphabetically by name
		} else {
			const updatedFolder = await folderAPI.put(folder);
			updatedFolders = folders.map((f: Folder) => {
				return f.id === updatedFolder.id ? updatedFolder : f;
			});
		}
		setFolders(updatedFolders);
		console.log(folders);
	};
	const handleDelete = async (folder: Folder) => {
		const response = await folderAPI.delete(folder);
		if (response.ok) {
			let updatedFolders = folders.filter((f) => folder.id !== f.id);
			setFolders(updatedFolders);
		}
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	useEffect(() => {
		async function loadFolders() {
			setLoading(true);
			try {
				const data = await folderAPI.get();
				setFolders(data);
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
			<h2 className="table-header">Folders</h2>
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			) : (
				<FolderList
					folders={folders}
					onSave={handleSave}
					onDelete={handleDelete}
				/>
			)}
			<Dialog
				open={openDialog}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Duplicate Folder Found"}
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
