import React from "react";
import { SubFolder } from "./SubFolder";
import SubFolderRow from "./SubFolderRow";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";

interface SubFolderListProps {
	subFolders: SubFolder[];
	monthPeriod: string | null;
}

function SubFolderList({ subFolders, monthPeriod }: SubFolderListProps) {
	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontSize: 16, fontWeight: "bold" }} align="center">
							Name
						</TableCell>
						<TableCell sx={{ fontSize: 16, fontWeight: "bold" }} align="center">
							Amount
						</TableCell>
						<TableCell sx={{ fontSize: 16, fontWeight: "bold" }} align="center">
							Balance
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{subFolders.map((subFolder) => (
						<React.Fragment key={subFolder.id}>
							{monthPeriod?.toUpperCase() === subFolder.month_period ? (
								<SubFolderRow subFolder={subFolder} />
							) : null}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default SubFolderList;
