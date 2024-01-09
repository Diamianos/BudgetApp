import { TableCell, TableRow, TextField, makeStyles } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SubFolder } from "../../components/SubFolder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SubFolderRowProps {
	subFolder: SubFolder;
	selectedSubFolder: SubFolder | undefined;
	handleSelectedSubFolderChange: (subFolder: SubFolder) => void;
	setShowDescriptionSaveButton: (value: boolean) => void;
}

function SubFolderRow({
	subFolder,
	selectedSubFolder,
	handleSelectedSubFolderChange,
	setShowDescriptionSaveButton,
}: SubFolderRowProps) {
	const handleOnRowClick = (event: any) => {
		handleSelectedSubFolderChange(subFolder);
		setShowDescriptionSaveButton(false);
		event.stopPropagation();
	};

	return (
		<TableRow
			onClick={handleOnRowClick}
			selected={subFolder.id === selectedSubFolder?.id ? true : false}
			sx={{
				"&:last-child td, &:last-child th": { border: 0 },
			}}
		>
			<TableCell sx={{ fontSize: "17px" }}>{subFolder.name}</TableCell>
			<TableCell sx={{ fontSize: "17px" }}>{subFolder.balance}</TableCell>
			<TableCell>
				<CheckCircleIcon
					style={subFolder.tagsComplete ? { color: "green" } : {}}
				/>
			</TableCell>
		</TableRow>
	);
}

export default SubFolderRow;
