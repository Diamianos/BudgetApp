import React, { useEffect, useState } from "react";
import { SubFolder } from "./SubFolder";
import { Button, Container, TextField, Typography } from "@mui/material";

interface SubFolderDetailProps {
	subFolders: SubFolder[];
	selectedSubFolder: SubFolder | undefined;
	handleSubFolderUpdate: (subFolder: SubFolder) => void;
	showDescriptionSaveButton: boolean;
	setShowDescriptionSaveButton: (value: boolean) => void;
}

function SubFolderDetail(props: SubFolderDetailProps) {
	const {
		subFolders,
		selectedSubFolder,
		handleSubFolderUpdate,
		showDescriptionSaveButton,
		setShowDescriptionSaveButton,
	} = props;

	const [subFolder, setSubFolder] = useState<SubFolder | undefined>(undefined);

	useEffect(() => {
		setSubFolder(selectedSubFolder);
	}, [selectedSubFolder]);

	const calculateFoldersTotal = (folders: SubFolder[]) => {
		let values = folders.map((f) => {
			return f.amount;
		});
		return values.reduce((partialSum, a) => partialSum + a, 0);
	};

	const handleClick = (event: any) => {
		event.stopPropagation();
	};

	const handleSave = () => {
		{
			if (subFolder) {
				handleSubFolderUpdate(subFolder);
			} else {
				return;
			}
		}
	};

	const handleChange = (event: any) => {
		setShowDescriptionSaveButton(true);

		const { name, value } = event.target;

		let updatedValue = value;
		const change = {
			[name]: updatedValue,
		};

		let updatedSubFolder: SubFolder = new SubFolder({
			...subFolder,
			...change,
		});
		setSubFolder(updatedSubFolder);
	};

	return (
		<Container
			sx={{
				backgroundColor: "white",
				maxHeight: "100vh",
				overflow: "auto",
			}}
			onClick={handleClick}
		>
			{subFolder ? (
				<>
					<Typography variant="h4" align="center" gutterBottom>
						{subFolder.name}
					</Typography>
					<Typography variant="h6" align="center" gutterBottom>
						{subFolder.balance} remaning
					</Typography>
					<Typography variant="body1" align="center" gutterBottom>
						{JSON.stringify(subFolder.tags)}
					</Typography>
					<TextField
						id="outlined-basic"
						label="Description"
						name="description"
						value={subFolder.description}
						variant="outlined"
						onChange={handleChange}
					/>
					{showDescriptionSaveButton && (
						<Button size="large" variant="contained" onClick={handleSave}>
							Save
						</Button>
					)}
				</>
			) : (
				<Typography variant="h6" align="center" gutterBottom>
					Income: {calculateFoldersTotal(subFolders)}
				</Typography>
			)}
		</Container>
	);
}

export default SubFolderDetail;
