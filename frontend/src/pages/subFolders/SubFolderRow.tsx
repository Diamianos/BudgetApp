import { TableCell, TableRow, TextField } from "@mui/material";
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
	return (
		<TableRow
			onClick={() => setSelectedRow(subFolder)}
			selected={subFolder.id === selectedRow?.id ? true : false}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell align="center">{subFolder.name}</TableCell>
			<TableCell align="center">{subFolder.amount}</TableCell>
			<TableCell align="center">{subFolder.balance}</TableCell>
		</TableRow>
	);
}

export default SubFolderRow;
