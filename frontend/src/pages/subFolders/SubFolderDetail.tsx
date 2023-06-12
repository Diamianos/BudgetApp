import React from "react";
import { SubFolder } from "./SubFolder";
import { Container, TextField, Typography } from "@mui/material";

interface SubFolderDetailProps {
	selectedRow: SubFolder | undefined;
	subFolders: SubFolder[];
}

function SubFolderDetail({ selectedRow, subFolders }: SubFolderDetailProps) {
	const calculateFoldersTotal = (folders: SubFolder[]) => {
		let values = folders.map((f) => {
			return f.amount;
		});
		return values.reduce((partialSum, a) => partialSum + a, 0);
	};

	const handleOnRowClick = (event: any) => {
		event.stopPropagation();
	};

	return (
		<Container
			sx={{
				backgroundColor: "white",
				maxHeight: "100vh",
				overflow: "auto",
			}}
			onClick={handleOnRowClick}
		>
			{selectedRow ? (
				<>
					<Typography variant="h4" align="center" gutterBottom>
						{selectedRow.name}
					</Typography>
					<Typography variant="h6" align="center" gutterBottom>
						{selectedRow.balance} remaning
					</Typography>
					<TextField
						id="outlined-basic"
						label="Add a description"
						variant="outlined"
					/>
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
