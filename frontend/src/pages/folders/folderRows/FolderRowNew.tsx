import { Button, TableCell, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import { Folder } from "../../../components/Folder";

interface FolderRowNewProps {
	onSave: (folder: Folder, newFolder: boolean) => void;
	onCancel: (newFolder: boolean) => void;
}

function FolderRowNew(props: FolderRowNewProps) {
	const { onSave, onCancel } = props;
	const [folder, setFolder] = useState(new Folder());
	const [errors, setErrors] = useState({
		name: true,
		amount: true,
	});

	function validate(folder: Folder) {
		let errors: any = { name: false, amount: false };
		if (folder.name.length === 0) {
			errors.name = true;
		}
		if (folder.amount <= 0) {
			errors.amount = true;
		}
		return errors;
	}

	function isValid() {
		return errors.name === false && errors.amount === false;
	}

	const handleSave = (folder: Folder) => {
		if (!isValid()) return;
		onSave(folder, true);
		setFolder(new Folder());
	};

	const handleCancel = () => {
		onCancel(true);
	};

	const handleChange = (event: any) => {
		const { type, name, value } = event.target;

		let updatedValue = value;
		// if input type is number, convert the updatedValue string to a number
		if (type === "number") {
			updatedValue = Number(updatedValue);
		}

		let change;
		if (name === "amount") {
			change = {
				[name]: updatedValue,
				["balance"]: updatedValue,
			};
		} else {
			change = {
				[name]: updatedValue,
			};
		}

		// need to do functional updated b/c
		// the new project state is based on the previous project state
		// so we can keep the project properties that aren't being edited like project.id
		// the spread operator (...) is used to
		// spread the previous project properties and the new change
		let updatedFolder: Folder = new Folder({ ...folder, ...change });
		setFolder(updatedFolder);
		setErrors(() => validate(updatedFolder));
	};

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			handleSave(folder);
		}
	};

	const handleFocus = (event: any) => {
		event.target.select();
	};

	return (
		<TableRow>
			<TableCell align="center">
				<TextField
					error={errors.name ? true : false}
					label={errors.name ? "error" : ""}
					size="small"
					value={folder.name}
					name="name"
					onChange={handleChange}
					onFocus={handleFocus}
					autoFocus={true}
				/>
			</TableCell>
			<TableCell align="center">
				<TextField
					error={errors.amount ? true : false}
					label={errors.amount ? "error" : ""}
					size="small"
					value={folder.amount === 0 ? "" : folder.amount}
					name="amount"
					type="number"
					onChange={handleChange}
					onFocus={handleFocus}
					onKeyDown={handleKeyDown}
				/>
			</TableCell>
			<TableCell align="center">
				<Button
					color="success"
					variant="contained"
					onClick={() => {
						handleSave(folder);
					}}
				>
					Save
				</Button>
				<Button
					sx={{ marginLeft: 2 }}
					color="warning"
					variant="contained"
					onClick={() => {
						handleCancel();
					}}
				>
					Cancel
				</Button>
			</TableCell>
		</TableRow>
	);
}

export default FolderRowNew;
