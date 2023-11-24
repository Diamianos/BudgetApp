import React, { useEffect, useState } from "react";

import { SubFolder } from "../../components/SubFolder";
import {
	Button,
	Container,
	Grid,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import SubFolderList from "./SubFolderList";
import { subFolderAPI } from "../../apis/SubFolderAPI";
import SubFolderDetail from "./SubFolderDetail";
import { Expense } from "../../components/Expense";
import { ExpenseProcess } from "../../components/ExpenseProcess";
import SubFolderSummary from "./SubFolderSummary";
import { Link } from "react-router-dom";
import MonthYearDropDown from "../../components/MonthYearDropDown";
import dayjs from "dayjs";

function SubFoldersPage() {
	const [subFolders, setSubFolders] = useState<SubFolder[]>([]);
	const [selectedSubFolder, setSelectedSubFolder] = useState<
		SubFolder | undefined
	>(undefined);
	const [monthPeriod, setMonthPeriod] = React.useState<string | null>(
		"first_half"
	);
	const [showDescriptionSaveButton, setShowDescriptionSaveButton] =
		useState(false);
	const [month, setMonth] = useState(dayjs().format("MMMM"));
	const [year, setYear] = useState(dayjs().format("YYYY"));

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
		setSelectedSubFolder(undefined);
	};

	const handleSubFolderUpdate = async (subFolder: SubFolder) => {
		let updatedSubFolders: SubFolder[] = [];
		const updatedSubFolder: SubFolder = await subFolderAPI.patch(subFolder);
		console.log(updatedSubFolder);
		updatedSubFolders = subFolders.map((sf: SubFolder) => {
			return sf.id === updatedSubFolder.id ? updatedSubFolder : sf;
		});
		setSubFolders(() => [...updatedSubFolders]);
		setShowDescriptionSaveButton(false);
	};

	const handleExpenseUpdate = (expense: Expense, process: ExpenseProcess) => {
		// Create new Subfolder for original for the update process
		let newSelectedSubFolder: SubFolder = new SubFolder({
			...selectedSubFolder,
		});
		if (process === ExpenseProcess.Post) {
			newSelectedSubFolder.expenses?.push(expense);
			newSelectedSubFolder.balance =
				newSelectedSubFolder.balance - expense.amount;
		} else if (process === ExpenseProcess.Patch) {
			let originalExpenseAmount = 0;
			const newExpenses = newSelectedSubFolder.expenses?.map((e) => {
				if (e.id === expense.id) {
					originalExpenseAmount = e.amount;
					return expense;
				} else {
					return e;
				}
			});
			newSelectedSubFolder.expenses = newExpenses;
			// Adding back the original expense amount that was updated
			newSelectedSubFolder.balance =
				newSelectedSubFolder.balance + originalExpenseAmount;
			// Minusing the new expense amount after patch
			newSelectedSubFolder.balance =
				newSelectedSubFolder.balance - expense.amount;
		}
		setSelectedSubFolder(newSelectedSubFolder);
		handleMonthYearButtonClick();
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
		handleMonthYearButtonClick();
	};

	const handleMonthYearButtonClick = async () => {
		if (year === "" || month === "") {
			return;
		} else if (year.toString().length !== 4) {
			return;
		} else {
			const data = await subFolderAPI.getByMonthYearPeriod(
				getFormattedDate(month, year)
			);
			setSubFolders(data);
		}
	};

	function getFormattedDate(month: String, year: String) {
		return dayjs(`${year} ${month} 01`, "YYYY MMMM DD").format("YYYY-MM-DD");
	}

	useEffect(() => {
		async function loadFolders() {
			try {
				const formattedDate = `${dayjs().format("YYYY")}-${dayjs().format(
					"MM"
				)}-01`;
				const data = await subFolderAPI.getByMonthYearPeriod(formattedDate);
				setSubFolders(data);
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message);
				}
			}
		}
		loadFolders();
	}, []);

	useEffect(() => {
		setSubFolders([]);
	}, [year, month]);

	return (
		<Container
			sx={{
				backgroundColor: "#f5f5f5",
				minHeight: "100vh",
				paddingTop: "1rem",
				marginTop: ".5rem",
			}}
			onClick={handleClickOnContainer}
		>
			<Typography textAlign={"center"} variant="h4" mt={".5rem"} mb="1rem">
				Budget
			</Typography>

			<Grid container alignItems="center">
				<Grid>
					<MonthYearDropDown
						month={month}
						setMonth={setMonth}
						year={year}
						setYear={setYear}
						handleMonthYearButtonClick={handleMonthYearButtonClick}
					/>
				</Grid>
				<Grid sx={{ marginLeft: "auto" }}>
					<Link to={`/folders`}>
						<Button size="large" variant="contained">
							Create New Budget
						</Button>
					</Link>
				</Grid>
			</Grid>

			<Container
				disableGutters
				sx={{
					display: "flex",
					justifyContent: "center",
					marginBottom: "2rem",
					marginTop: "2rem",
				}}
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
						<SubFolderSummary subFolders={subFolders}></SubFolderSummary>
					</Grid>
				</Grid>
			)}
		</Container>
	);
}

export default SubFoldersPage;
