import React, { useEffect, useState } from "react";

import { MOCK_SUB_FOLDERS } from "./MockSubFolders";
import { SubFolder } from "./SubFolder";
import {
	Box,
	CircularProgress,
	Container,
	Grid,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import SubFolderList from "./SubFolderList";
import ExpenseList from "./ExpenseList";
import { subFolderAPI } from "../../apis/SubFolderAPI";

function SubFoldersPage() {
	const [subFolders, setSubFolders] = useState<SubFolder[]>([]);
	const [selectedRow, setSelectedRow] = useState<SubFolder>();
	const [monthPeriod, setMonthPeriod] = React.useState<string | null>(
		"first_half"
	);
	const [loading, setLoading] = useState(false);

	const handleMonthPeriodChange = (
		event: React.MouseEvent<HTMLElement>,
		newMonthPeriod: string | null
	) => {
		if (newMonthPeriod !== null) {
			setMonthPeriod(newMonthPeriod);
		}
	};

	useEffect(() => {
		async function loadFolders() {
			setLoading(true);
			try {
				const data = await subFolderAPI.get();
				setSubFolders(data);
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message);
				}
			} finally {
				setLoading(false);
			}
		}
		loadFolders();
	}, []);

	return (
		<div>
			<h2 className="table-header">Sub Folders</h2>
			<Container
				disableGutters
				sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
			>
				<ToggleButtonGroup
					size="large"
					color="primary"
					value={monthPeriod}
					exclusive={true}
					onChange={handleMonthPeriodChange}
					aria-label="Platform"
				>
					<ToggleButton value="first_half">Days 1-14</ToggleButton>
					<ToggleButton value="second_half">Days 15-30</ToggleButton>
				</ToggleButtonGroup>
			</Container>

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			) : (
				<Grid container spacing={2}>
					<Grid item md={7}>
						<SubFolderList
							subFolders={subFolders}
							monthPeriod={monthPeriod}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
						></SubFolderList>
					</Grid>
					<Grid item md={5}>
						<ExpenseList selectedRow={selectedRow}></ExpenseList>
					</Grid>
				</Grid>
			)}
		</div>
	);
}

export default SubFoldersPage;
