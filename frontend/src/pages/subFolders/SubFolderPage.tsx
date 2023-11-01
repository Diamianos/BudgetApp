import React, { useEffect, useState } from "react";

import { SubFolder } from "../../components/SubFolder";
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
import { Expense } from "../../components/Expense";

function SubFoldersPage() {
	const [subFolders, setSubFolders] = useState<SubFolder[]>([]);
	const [selectedSubFolder, setSelectedSubFolder] = useState<
		SubFolder | undefined
	>(undefined);
	const [monthPeriod, setMonthPeriod] = React.useState<string | null>(
		"first_half"
	);
	const [loading, setLoading] = useState(false);
	const [showDescriptionSaveButton, setShowDescriptionSaveButton] =
		useState(false);

	const handleSelectedSubFolderChange = (subFolder: SubFolder) => {
		setSelectedSubFolder(subFolder);
	};

	const handleMonthPeriodChange = (
		event: React.MouseEvent<HTMLElement>,
		newMonthPeriod: string | null
	) => {
		if (newMonthPeriod !== null) {
			setMonthPeriod(newMonthPeriod);
		}
		setSelectedSubFolder(undefined);
	};

	const handleClickOnContainer = (event: any) => {
		setShowDescriptionSaveButton(false);
	};

	const handleSubFolderUpdate = async (subFolder: SubFolder) => {
		let updatedSubFolders: SubFolder[] = [];
		const updatedSubFolder: SubFolder = await subFolderAPI.patch(subFolder);
		console.log(updatedSubFolder);
		updatedSubFolders = subFolders.map((sf: SubFolder) => {
			return sf.id == updatedSubFolder.id ? updatedSubFolder : sf;
		});
		setSubFolders(() => [...updatedSubFolders]);
		setShowDescriptionSaveButton(false);
	};

	const handleExpenseUpdate = (expense: Expense) => {
		// Update the current folder
		let newSelectedSubFolder: SubFolder = new SubFolder({
			...selectedSubFolder,
		});
		newSelectedSubFolder.expenses?.push(expense);
		newSelectedSubFolder.balance =
			newSelectedSubFolder.balance - expense.amount;

		setSelectedSubFolder(newSelectedSubFolder);
	};

	const handleExpenseDelete = (expense: Expense) => {
		let newSelectedSubFolder: SubFolder = new SubFolder({
			...selectedSubFolder,
		});
		console.log(expense);
		const newExpenses = newSelectedSubFolder.expenses?.filter((e) => {
			return e.id !== expense.id;
		});
		newSelectedSubFolder.expenses = newExpenses;
		console.log(newSelectedSubFolder);
		newSelectedSubFolder.balance =
			newSelectedSubFolder.balance + expense.amount;
		setSelectedSubFolder(newSelectedSubFolder);
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
	}, [selectedSubFolder]);

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

			{selectedSubFolder ? (
				<Grid container spacing={2}>
					<Grid item md={5}>
						<SubFolderList
							subFolders={subFolders}
							monthPeriod={monthPeriod}
							selectedSubFolder={selectedSubFolder}
							handleSelectedSubFolderChange={handleSelectedSubFolderChange}
							setShowDescriptionSaveButton={setShowDescriptionSaveButton}
						></SubFolderList>
					</Grid>
					<Grid item md={7}>
						<SubFolderDetail
							selectedSubFolder={selectedSubFolder}
							handleSubFolderUpdate={handleSubFolderUpdate}
							showDescriptionSaveButton={showDescriptionSaveButton}
							setShowDescriptionSaveButton={setShowDescriptionSaveButton}
							handleExpenseUpdate={handleExpenseUpdate}
							handleExpenseDelete={handleExpenseDelete}
						></SubFolderDetail>
					</Grid>
				</Grid>
			) : (
				<SubFolderList
					subFolders={subFolders}
					monthPeriod={monthPeriod}
					selectedSubFolder={selectedSubFolder}
					handleSelectedSubFolderChange={handleSelectedSubFolderChange}
					setShowDescriptionSaveButton={setShowDescriptionSaveButton}
				></SubFolderList>
			)}
		</Container>
	);
}

export default SubFoldersPage;
