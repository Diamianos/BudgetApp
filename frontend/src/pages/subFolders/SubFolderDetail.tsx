import React from "react";
import { SubFolder } from "./SubFolder";
import { Container, Typography } from "@mui/material";

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

	return (
		<Container
			sx={{
				backgroundColor: "white",
				maxHeight: "100vh",
				overflow: "auto",
			}}
		>
			{selectedRow ? (
				<>
					<Typography variant="h4" align="center" gutterBottom>
						{selectedRow.name}
					</Typography>
					<Typography variant="h6" align="center" gutterBottom>
						{selectedRow.balance} remaning
					</Typography>
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
