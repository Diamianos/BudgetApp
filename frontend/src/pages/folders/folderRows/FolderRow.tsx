import { Button, TableCell, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { Folder } from "../../../components/Folder";

interface FolderRowProps {
	folder: Folder;
	onDelete: (folder: Folder) => void;
	onSave: (folder: Folder, newFolder: boolean) => void;
}

function FolderRow(props: FolderRowProps) {
	const { folder: initalFolder, onDelete, onSave } = props;
	const [open, setOpen] = useState(false);
	const [folder, setFolder] = useState(initalFolder);

	const handleDelete = (folder: Folder) => {
		onDelete(folder);
	};

	const handleChange = (event: any) => {
		const { type, name, value } = event.target;

		let updatedValue = value;
		// if input type is number, convert the updatedValue string to a number
		if (type === "number") {
			updatedValue = Number(updatedValue);
		}
		const change = {
			[name]: updatedValue,
		};

		let updatedFolder: Folder = new Folder({ ...folder, ...change });
		setFolder(updatedFolder);
		onSave(updatedFolder, false);
	};

	const handleFocus = (event: any) => {
		event.target.select();
	};

	const style = {
		"& label.Mui-focused": {
			color: "rgba(0,0,0,0.23)",
		},
		"& .MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: "rgba(0,0,0,0.23)",
			},
			"&:hover fieldset": {
				borderColor: "rgba(0,0,0,0.23)",
			},
		},
	};

	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell align="center">
				<TextField
					autoFocus={true}
					size="small"
					value={folder.name}
					name="name"
					onChange={handleChange}
					onFocus={handleFocus}
				/>
			</TableCell>
			<TableCell align="center">
				<TextField
					type="number"
					size="small"
					value={folder.amount}
					name="amount"
					onChange={handleChange}
					onFocus={handleFocus}
				/>
			</TableCell>
			<TableCell align="center">
				<Button
					sx={{ marginLeft: 2 }}
					variant="contained"
					color="error"
					onClick={() => setOpen(true)}
				>
					Delete
				</Button>
				<ConfirmDialog
					title="Confirm"
					children="Are you sure you want to delete this folder?"
					open={open}
					setOpen={setOpen}
					onConfirm={handleDelete}
					folder={folder}
				/>
			</TableCell>
		</TableRow>
	);
}

export default FolderRow;
