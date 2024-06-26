import React, { Dispatch, SetStateAction, useState } from "react";
import { SubFolder } from "../../components/SubFolder";
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
	selectedSubFolder: SubFolder | undefined;
	handleSelectedSubFolderChange: (subFolder: SubFolder) => void;
	setShowDescriptionSaveButton: (value: boolean) => void;
}

function SubFolderList({
	subFolders,
	selectedSubFolder,
	monthPeriod,
	handleSelectedSubFolderChange,
	setShowDescriptionSaveButton,
}: SubFolderListProps) {
	return (
		<div data-value="subFolderList">
			<TableContainer sx={{ backgroundColor: "white" }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontSize: 17, fontWeight: "bold" }}>
								Name
							</TableCell>
							<TableCell sx={{ fontSize: 17, fontWeight: "bold" }}>
								Balance
							</TableCell>
							<TableCell sx={{ fontSize: 17, fontWeight: "bold" }}>
								Allocated
							</TableCell>
							<TableCell sx={{ fontSize: 17, fontWeight: "bold" }}>
								Note
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{subFolders.map((subFolder) => (
							<React.Fragment key={subFolder.id}>
								{monthPeriod?.toUpperCase() === subFolder.monthPeriod ? (
									<SubFolderRow
										handleSelectedSubFolderChange={
											handleSelectedSubFolderChange
										}
										subFolder={subFolder}
										selectedSubFolder={selectedSubFolder}
										setShowDescriptionSaveButton={setShowDescriptionSaveButton}
									/>
								) : null}
							</React.Fragment>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default SubFolderList;
