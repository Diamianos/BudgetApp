import React, { useEffect, useState } from "react";
import { Folder } from "./Folder";
import FolderList from "./FolderList";
// import { MOCK_FOLDERS } from './MockFolders'
import { folderAPI } from "../../apis/FolderAPI";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

function FoldersPage() {
	// const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS)
	const [folders, setFolders] = useState<Folder[]>([]);
	const [loading, setLoading] = useState(false);

	const handleSave = async (folder: Folder, newFolder: boolean) => {
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
		</>
	);
}

export default FoldersPage;
