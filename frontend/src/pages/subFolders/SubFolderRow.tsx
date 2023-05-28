import { TableCell, TableRow, TextField } from "@mui/material";
import React from "react";
import { SubFolder } from "./SubFolder";

interface SubFolderRowProps {
	subFolder: SubFolder;
}

function SubFolderRow({ subFolder }: SubFolderRowProps) {
	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell align="center">
				<TextField
					size="small"
					InputProps={{ readOnly: true }}
					value={subFolder.name}
				/>
			</TableCell>
			<TableCell align="center">
				<TextField
					size="small"
					InputProps={{ readOnly: true }}
					value={subFolder.amount}
				/>
			</TableCell>
			<TableCell align="center">
				<TextField
					size="small"
					InputProps={{ readOnly: true }}
					value={subFolder.balance}
				/>
			</TableCell>
		</TableRow>
	);
}

export default SubFolderRow;
