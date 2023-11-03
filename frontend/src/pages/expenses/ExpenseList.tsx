import {
	Alert,
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	Modal,
	OutlinedInput,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { SubFolder } from "../../components/SubFolder";
import { Expense } from "../../components/Expense";
import dayjs, { Dayjs } from "dayjs";
import { expenseAPI } from "../../apis/ExpenseAPI";
import { ExpenseInterface } from "../../interfaces/ExpenseInterface";
import { BlankExpenseDisplayInformation } from "../../static_data/BlankExpenseDisplayInformation";
import { ExpenseProcess } from "../../components/ExpenseProcess";

interface ExpenseListProps {
	subFolder: SubFolder | undefined;
	handleExpenseUpdate: (expense: Expense, process: ExpenseProcess) => void;
	handleExpenseDelete: (expense: Expense) => void;
}

function ExpenseList({
	subFolder,
	handleExpenseUpdate,
	handleExpenseDelete,
}: ExpenseListProps) {
	const [expenseModalOpen, setExpenseModalOpen] = useState(false);
	const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
	const [expenseModalInformation, setExpenseModalInformation] =
		useState<ExpenseInterface>(BlankExpenseDisplayInformation);
	const [expenseDialogInformation, setExpenseDialogInformation] =
		useState<ExpenseInterface>(BlankExpenseDisplayInformation);
	const [datePicker, setDatePicker] = useState<Dayjs | null>(null);
	const [modalError, setModalError] = useState({
		showError: false,
		errorMsg: "",
	});
	// This state is for describing if we are doing a post or patch to reuse the handleExpenseUpdate function
	const [expenseProcess, setExpenseProcess] = useState<ExpenseProcess | null>(
		null
	);

	const handleAddExpenseButton = () => {
		setExpenseProcess(ExpenseProcess.Post);
		setExpenseModalOpen(true);
	};

	const handleExpenseModalClose = () => {
		const newModalError = {
			showError: false,
			errorMsg: "",
		};
		setModalError(newModalError);
		setExpenseModalInformation(BlankExpenseDisplayInformation);
		setDatePicker(null);
		setExpenseModalOpen(false);
		setExpenseProcess(null);
	};

	const handleDialogOpen = () => {
		setExpenseDialogOpen(true);
	};

	const handleDialogClose = () => {
		setExpenseDialogOpen(false);
	};

	// Handles updating the modal values when a value is changed
	const handleModalChange = (event: any) => {
		const { id, value } = event.target;

		let updatedValue = value;

		// Regex to validate input is a number
		const re = /^[0-9\b]+$/;

		let change = {};
		if (id === "amount" && (updatedValue === "" || re.test(updatedValue))) {
			change = {
				[id]: updatedValue,
			};
		} else if (id !== "amount") {
			change = {
				[id]: updatedValue,
			};
		}

		let updateModalQueueInformation = {
			...expenseModalInformation,
			...change,
		};
		setExpenseModalInformation(updateModalQueueInformation);
	};

	const handleDateChange = (date: Dayjs | null) => {
		setDatePicker(date);
		if (date) {
			const updatedValue = date.format("MM-DD-YYYY");
			const change = {
				["dateOfTransaction"]: updatedValue,
			};

			let updatedModalQueueInformation = {
				...expenseModalInformation,
				...change,
			};
			setExpenseModalInformation(updatedModalQueueInformation);
		}
	};

	const handleExpenseButtonClick = async () => {
		const expense = new Expense(expenseModalInformation);
		try {
			let newExpense: Expense;
			if (expenseProcess === ExpenseProcess.Post) {
				newExpense = await expenseAPI.post(subFolder?.id, expense);
				console.log("New Expense");
				console.log(newExpense);
				handleExpenseUpdate(newExpense, expenseProcess);
			} else if (expenseProcess === ExpenseProcess.Patch) {
				newExpense = await expenseAPI.patch(
					subFolder?.id,
					expense.id,
					JSON.stringify(expenseModalInformation)
				);
				console.log("New Expense");
				console.log(newExpense);
				handleExpenseUpdate(newExpense, expenseProcess);
			}
			handleExpenseModalClose();
		} catch (error: any) {
			const jsonError = JSON.parse(error.message);
			const newModalError = {
				showError: true,
				errorMsg: jsonError.message,
			};
			setModalError(newModalError);
		}
	};

	const handleInfoButtonClick = (expense: Expense) => {
		const newExpenseDialogInformation = {
			id: undefined,
			dateOfTransaction: expense.dateOfTransaction,
			merchant: expense.merchant,
			amount: expense.amount.toString(),
			description: expense.description,
		};
		setExpenseDialogInformation(newExpenseDialogInformation);
		handleDialogOpen();
	};

	const handleEditButtonClick = async (expense: Expense) => {
		const newExpenseModalInfo: ExpenseInterface = {
			id: expense.id,
			dateOfTransaction: expense.dateOfTransaction,
			amount: expense.amount.toString(),
			merchant: expense.merchant,
			description: expense.description,
		};
		setExpenseModalInformation(newExpenseModalInfo);
		setDatePicker(dayjs(expense.dateOfTransaction));
		setExpenseProcess(ExpenseProcess.Patch);
		setExpenseModalOpen(true);
	};

	const handleDeleteButtonClick = async (expense: Expense) => {
		try {
			await expenseAPI.delete(expense);
			handleExpenseDelete(expense);
		} catch (error: any) {
			console.log(error);
			const newModalError = {
				showError: true,
				errorMsg:
					"An error occured deleting the expense, please consult the administrator",
			};
			setModalError(newModalError);
		}
	};

	const modalStyle = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	return (
		<Container
			sx={{
				backgroundColor: "rgba(25, 118, 210, 0.08)",
				maxHeight: "100vh",
				minHeight: "100px",
				overflow: "auto",
				mb: 2,
				pb: 5,
			}}
		>
			<Typography fontWeight="bold" variant="h6" align="center">
				Expenses
			</Typography>
			<Box width={"100%"} textAlign={"right"} marginBottom={"1rem"}>
				<Button
					size="small"
					variant="contained"
					onClick={handleAddExpenseButton}
				>
					Add Expense
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Merchant</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{subFolder?.expenses?.map((expense) => (
							<TableRow
								key={expense.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{expense.merchant}
								</TableCell>
								<TableCell>{expense?.dateOfTransaction?.toString()}</TableCell>
								<TableCell>{expense.amount}</TableCell>
								<TableCell
									sx={{ display: "flex", justifyContent: "space-evenly" }}
								>
									<IconButton onClick={() => handleInfoButtonClick(expense)}>
										<InfoIcon />
									</IconButton>
									<IconButton onClick={() => handleEditButtonClick(expense)}>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDeleteButtonClick(expense)}>
										<DeleteForeverIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>

					{/* Modal for adding an expense */}
					<Modal
						open={expenseModalOpen}
						onClose={handleExpenseModalClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={modalStyle}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Add an expense
							</Typography>
							{modalError.showError ? (
								<Alert severity="error">{modalError.errorMsg}</Alert>
							) : null}

							<TextField
								id="merchant"
								label="Merchant"
								variant="outlined"
								size="small"
								sx={{ margin: ".5rem 0 .5rem 0", width: "100%" }}
								multiline
								onChange={handleModalChange}
								value={expenseModalInformation["merchant"]}
							/>
							<FormControl size="small" sx={{ marginBottom: ".5rem" }}>
								<InputLabel htmlFor="amount">Amount</InputLabel>
								<OutlinedInput
									id="amount"
									startAdornment={
										<InputAdornment position="start">$</InputAdornment>
									}
									label="Amount"
									onChange={handleModalChange}
									value={expenseModalInformation["amount"]}
								/>
							</FormControl>
							<TextField
								id="description"
								label="Description"
								variant="outlined"
								size="small"
								sx={{ marginBottom: ".5rem", width: "100%" }}
								multiline
								onChange={handleModalChange}
								value={expenseModalInformation["description"]}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									value={datePicker}
									onChange={(newDate) => handleDateChange(newDate)}
									label="Date"
									slotProps={{ textField: { size: "small" } }}
								/>
							</LocalizationProvider>
							<Box mt={".5rem"}>
								<Button
									variant="contained"
									size="small"
									onClick={handleExpenseButtonClick}
								>
									Submit
								</Button>
							</Box>
						</Box>
					</Modal>

					{/* Dialog for displaying expense information */}
					<Dialog
						open={expenseDialogOpen}
						onClose={handleDialogClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{"Expense Information"}
						</DialogTitle>
						<DialogContent>
							<List>
								<ListItem>
									<ListItemText>
										<Box component="span" fontWeight="bold">
											{"Merchant: "}
										</Box>
										{expenseDialogInformation.merchant}
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemText>
										<Box component="span" fontWeight="bold">
											{"Amount: "}
										</Box>
										{expenseDialogInformation.amount}
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemText>
										<Box component="span" fontWeight="bold">
											{"Date: "}
										</Box>
										{expenseDialogInformation.dateOfTransaction}
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemText>
										<Box component="span" fontWeight="bold">
											{"Description: "}
										</Box>
										{expenseDialogInformation.description}
									</ListItemText>
								</ListItem>
							</List>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleDialogClose} autoFocus>
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default ExpenseList;
