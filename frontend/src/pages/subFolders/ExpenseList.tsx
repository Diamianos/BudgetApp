import {
	Alert,
	Box,
	Button,
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
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
import { SubFolder } from "./SubFolder";
import { Expense } from "./Expense";
import { Dayjs } from "dayjs";
import { expenseAPI } from "../../apis/ExpenseAPI";
import { DeleteForever } from "@mui/icons-material";

interface ExpenseListProps {
	subFolder: SubFolder | undefined;
}

function ExpenseList({ subFolder }: ExpenseListProps) {
	const [expenseModalOpen, setExpenseModalOpen] = useState(false);
	const [expenseModalInformation, setExpenseModalInformation] = useState({
		dateOfTransaction: "",
		merchant: "",
		amount: "",
		description: "",
	});
	const [datePicker, setDatePicker] = useState<Dayjs | null>(null);
	const [modalError, setModalError] = useState({
		showError: false,
		errorMsg: "",
	});

	const handleAddExpenseButton = () => {
		setExpenseModalOpen(true);
	};

	const handleExpenseModalClose = () => {
		const newModalError = {
			showError: false,
			errorMsg: "",
		};
		setModalError(newModalError);
		setExpenseModalOpen(false);
	};

	const handleExpenseButtonClick = async () => {
		console.log(JSON.stringify(expenseModalInformation));
		const newExpense = new Expense(expenseModalInformation);
		try {
			const response = await expenseAPI.post(subFolder?.id, newExpense);
			console.log(response);
		} catch (Error) {
			const newModalError = {
				showError: true,
				errorMsg:
					"An error occured, please try again or forward this error to your administrator.",
			};
			setModalError(newModalError);
		}
		setExpenseModalOpen(false);
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
									<IconButton
										onClick={(event) => console.log("info icon clicked")}
									>
										<InfoIcon />
									</IconButton>
									<IconButton>
										<EditIcon />
									</IconButton>
									<IconButton>
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
				</Table>
			</TableContainer>
		</Container>
	);
}

export default ExpenseList;
