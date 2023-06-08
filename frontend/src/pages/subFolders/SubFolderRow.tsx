import { TableCell, TableRow, TextField, makeStyles } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SubFolder } from "./SubFolder";

interface SubFolderRowProps {
	subFolder: SubFolder;
	selectedRow: SubFolder | undefined;
	setSelectedRow: Dispatch<SetStateAction<SubFolder | undefined>>;
}

function SubFolderRow({
	subFolder,
	selectedRow,
	setSelectedRow,
}: SubFolderRowProps) {
	const handleOnRowClick = (event: any) => {
		event.stopPropagation();
		setSelectedRow(subFolder);
	};

	return (
		<TableRow
			onClick={handleOnRowClick}
			selected={subFolder.id === selectedRow?.id ? true : false}
			sx={{
				"&:last-child td, &:last-child th": { border: 0 },
			}}
		>
			<TableCell sx={{ fontSize: "17px" }} align="center">
				{subFolder.name}
			</TableCell>
			<TableCell sx={{ fontSize: "17px" }} align="center">
				{subFolder.amount}
			</TableCell>
			<TableCell sx={{ fontSize: "17px" }} align="center">
				{subFolder.balance}
			</TableCell>
		</TableRow>
	);
}

export default SubFolderRow;
