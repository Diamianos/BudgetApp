import React, { useEffect, useState } from "react";
import { Folder } from "../../components/Folder";
import FolderList from "./FolderList";
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { folderAPI } from "../../apis/FolderAPI";

function FoldersPage() {
	const [folders, setFolders] = useState<Folder[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [originalFolders, setOriginalFolders] = useState<Folder[]>([]);
	const [existingFolders, setExistingFolders] = useState(false);
	const [monthlyIncome, setMonthlyIncome] = useState(0);

	// URI params from react router
	const { monthYearPeriod } = useParams();
	let month = "";
	let year = "";
	parseMonthYearPeriodString();

	useEffect(() => {
		async function loadFolders() {
			try {
				const data = await folderAPI.getByMonthYearPeriod(monthYearPeriod);
				if (data.length > 0) {
					setFolders(data);
					setOriginalFolders(data);
					setExistingFolders(true);
				}
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message);
				}
			}
		}
		loadFolders();
	}, []);

	function parseMonthYearPeriodString() {
		var customParseFormat = require("dayjs/plugin/customParseFormat");
		dayjs.extend(customParseFormat);
		const dateObject = dayjs(monthYearPeriod, "YYYY-MM-DD");
		month = dateObject.format("MMMM");
		year = dateObject.format("YYYY");
	}

	const handleSave = (folder: Folder, newFolder: boolean) => {
		folder.monthYearPeriod = monthYearPeriod!;

		let updatedFolders: React.SetStateAction<Folder[]> = [];
		if (newFolder) {
			if (checkForDuplicateFolderName(folder, folders)) {
				setOpenDialog(true);
				return;
			}
			updatedFolders = [...folders];
			updatedFolders.push(folder);
			updatedFolders.sort((a, b) => a.name.localeCompare(b.name)); // Sorting alphabetically by name
		} else {
			updatedFolders = folders.map((f: Folder) => {
				return f.id === folder.id ? folder : f;
			});
		}
		setFolders(updatedFolders);
	};
	const handleDelete = (folder: Folder) => {
		let updatedFolders = folders.filter((f) => folder.name !== f.name);
		setFolders(updatedFolders);
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const calculateFoldersTotal = (folders: Folder[]) => {
		let values = folders.map((f) => {
			return f.amount;
		});
		return values.reduce((partialSum, a) => partialSum + a, 0);
	};

	const determineRemainingColor = () => {
		if (monthlyIncome - calculateFoldersTotal(folders) < 0) {
			return "red";
		} else if (monthlyIncome - calculateFoldersTotal(folders) === 0) {
			return "green";
		} else {
			return undefined;
		}
	};

	const determineMonthlyValueMessage = () => {
		if (monthlyIncome - calculateFoldersTotal(folders) === 0) {
			return "Budget Balanced!";
		} else {
			return `Remaining: ${monthlyIncome - calculateFoldersTotal(folders)}`;
		}
	};

	return (
		<>
			<Container sx={{ marginBottom: "2rem" }}>
				<Typography variant="h4" textAlign="center" mt="1rem" mb="3rem">
					{month + " " + year}
				</Typography>
				<Box
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					mt={"1rem"}
					mb={"1rem"}
				>
					<Typography variant="h5" mr={"1rem"}>
						Monthly Income
					</Typography>
					<TextField
						size="small"
						value={monthlyIncome === 0 ? "" : monthlyIncome}
						type="number"
						onChange={(e) => setMonthlyIncome(Number(e.target.value))}
					></TextField>
				</Box>
				<Box
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					mt={"2rem"}
				>
					<Typography variant="h5" color={determineRemainingColor}>
						{determineMonthlyValueMessage()}
					</Typography>
				</Box>
				<FolderList
					folders={folders}
					onSave={handleSave}
					onDelete={handleDelete}
					monthYearPeriod={monthYearPeriod!}
					originalFolders={originalFolders}
					existingFolders={existingFolders}
				/>

				<Dialog
					open={openDialog}
					onClose={handleDialogClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Duplicate Folder Name Found"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Unable to save new folder. Please choose a different name.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose}>Okay</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</>
	);
}

function checkForDuplicateFolderName(folder: Folder, folders: Folder[]) {
	let duplicate = false;

	folders.forEach((f) => {
		if (f.name.toLowerCase().trim() === folder.name.toLowerCase().trim()) {
			duplicate = true;
		}
	});

	return duplicate;
}

export default FoldersPage;
