import React, { useEffect, useState } from "react";

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
import { subFolderAPI } from "../../apis/SubFolderAPI";
import SubFolderDetail from "./SubFolderDetail";

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
		setSelectedRow(undefined);
	};

	const handleClickOnContainer = (event: any) => {
		setSelectedRow(undefined);
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
		<Container
			sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
			onClick={handleClickOnContainer}
		>
			<h2 className="table-header">Budget</h2>
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
					sx={{ backgroundColor: "white" }}
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
				<Grid container spacing={7}>
					<Grid item md={7}>
						<SubFolderList
							subFolders={subFolders}
							monthPeriod={monthPeriod}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
						></SubFolderList>
					</Grid>
					<Grid item md={5}>
						<SubFolderDetail
							selectedRow={selectedRow}
							subFolders={subFolders}
						></SubFolderDetail>
					</Grid>
				</Grid>
			)}
		</Container>
	);
}

export default SubFoldersPage;
