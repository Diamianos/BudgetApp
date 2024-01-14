import React, { useEffect, useState } from "react";
import { SubFolder } from "../../components/SubFolder";
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
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseList from "../expenses/ExpenseList";
import { Expense } from "../../components/Expense";
import { ExpenseProcess } from "../../components/ExpenseProcess";
import { Tags } from "../../components/Tags";

interface SubFolderDetailProps {
	selectedSubFolder: SubFolder | undefined;
	handleSubFolderUpdate: (subFolder: SubFolder) => void;
	showDescriptionSaveButton: boolean;
	setShowDescriptionSaveButton: (value: boolean) => void;
	handleExpenseUpdate: (expense: Expense, process: ExpenseProcess) => void;
	handleExpenseDelete: (expense: Expense) => void;
}

function SubFolderDetail(props: SubFolderDetailProps) {
	const {
		selectedSubFolder,
		handleSubFolderUpdate,
		showDescriptionSaveButton,
		setShowDescriptionSaveButton,
		handleExpenseUpdate,
		handleExpenseDelete,
	} = props;

	const [subFolder, setSubFolder] = useState<SubFolder | undefined>();
	const [modifyTags, setModifyTags] = useState(false);
	const [showTagModifyButton, setShowTagModifyButton] = useState(false);
	const [stateUpdate, setStateUpdate] = useState(0);
	const [tagValues, setTagValues] = useState<Tags>(
		subFolder ? subFolder.tags : new Tags()
	);
	const [modalError, setModalError] = useState({
		showError: false,
		message: "",
	});
	const [dialogOpen, setDialogOpen] = useState(false);
	const [subFolderAmount, setSubFolderAmount] = useState(subFolder?.amount);

	useEffect(() => {
		setSubFolder(selectedSubFolder);
		if (selectedSubFolder) {
			setTagValues(selectedSubFolder.tags);
			setSubFolderAmount(selectedSubFolder.amount);
		}
	}, [selectedSubFolder]);

	useEffect(() => {
		if (subFolder) {
			handleSave();
		}
	}, [stateUpdate]);

	function calculateTagTotal(tags: Tags | undefined) {
		let tagsTotal = 0;
		if (tags) {
			const tagValues = Object.values(tags);
			tagValues.forEach((t) => {
				tagsTotal = tagsTotal + t;
			});
		}
		return tagsTotal;
	}

	function verifyTagAmounts() {
		const tagTotal = calculateTagTotal(tagValues);
		if (subFolder) {
			if (tagTotal > subFolder.amount) return false;
			else return true;
		}
	}

	const handleClick = (event: any) => {
		event.stopPropagation();
	};

	const handleSave = () => {
		// make sure tag values are not greater than sub folder amount
		if (verifyTagAmounts()) {
			// updating the subfolder tag values
			const tagChange = { ["tags"]: tagValues };
			let updatedSubFolder: SubFolder = new SubFolder({
				...subFolder,
				...tagChange,
			});

			// Checking tags complete field
			const tagsTotal = calculateTagTotal(updatedSubFolder.tags);
			tagsTotal === updatedSubFolder.amount
				? (updatedSubFolder.tagsComplete = true)
				: (updatedSubFolder.tagsComplete = false);

			// setting the subfolder and executing the update
			setSubFolder(updatedSubFolder);
			handleSubFolderUpdate(updatedSubFolder);
			setModifyTags(false);
		} else {
			const newModalError = {
				showError: true,
				message: "Tag total cannot be greater than subfolder amount",
			};
			setModalError(newModalError);
		}
	};

	const handleDescriptionChange = (event: any) => {
		setShowDescriptionSaveButton(true);

		const { name, value } = event.target;

		let updatedValue = value;
		const change = {
			[name]: updatedValue,
		};

		let updatedSubFolder: SubFolder = new SubFolder({
			...subFolder,
			...change,
		});
		setSubFolder(updatedSubFolder);
	};

	const handleTagsChange = (event: any) => {
		setShowTagModifyButton(true);

		const { name, value } = event.target;

		let updatedValue = Number(value);
		const change = {
			[name]: updatedValue,
		};

		const newTagValues = { ...tagValues, ...change };
		if (newTagValues) {
			setTagValues(newTagValues);
		}
	};

	const handleModifyTags = () => {
		setModifyTags(true);
	};
	const handleModifyTagsModalClose = () => {
		if (subFolder) {
			setTagValues(subFolder.tags);
		}
		setModifyTags(false);
		setModalError({
			showError: false,
			message: "",
		});
	};

	const handleAllocation = (name: string) => {
		let newTags: Tags = new Tags();
		const change = {
			[name]: subFolder?.amount,
		};
		newTags = { ...newTags, ...change };
		setTagValues(newTags);
		setStateUpdate(stateUpdate + 1);
	};

	const handleKeyDownModal = (event: any) => {
		if (event.key === "Enter") {
			setStateUpdate(stateUpdate + 1);
		}
	};

	const handleEditButtonClick = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleDialogSubmit = () => {
		if (subFolderAmount && subFolder && subFolderAmount > 0) {
			if (subFolder.amount < subFolderAmount) {
				// if the original amount is less than the new amount, we know the balance also needs to increase
				subFolder.balance =
					subFolder.balance + (subFolderAmount - subFolder.amount);
			} else if (subFolder.amount > subFolderAmount) {
				// if the original amount is greater than the new amount, we know the balance needs to decrease
				subFolder.balance =
					subFolder.balance - (subFolder.amount - subFolderAmount);
			}
			subFolder.amount = subFolderAmount;
			setStateUpdate(stateUpdate + 1);
			setDialogOpen(false);
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
				backgroundColor: "white",
				maxHeight: "100vh",
				overflow: "auto",
			}}
			onClick={handleClick}
		>
			<Typography mt={1} variant="h4" align="center" gutterBottom>
				{subFolder?.name}
			</Typography>
			<Box display={"flex"} justifyContent={"right"}>
				<IconButton onClick={() => handleEditButtonClick()}>
					<EditIcon />
				</IconButton>
			</Box>
			<Typography mb={3} variant="h6" align="center" gutterBottom>
				{`Total: ${subFolder?.balance}/${subFolder?.amount}`}
			</Typography>
			<Container sx={{ marginBottom: "2rem" }}>
				<Typography fontWeight="bold" variant="h6" align="center">
					Tags
				</Typography>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={6}>
						<List>
							<ListItem disablePadding>
								<ListItemButton
									onClick={() => {
										handleAllocation("bill");
									}}
								>
									<ListItemIcon>
										<AccountBalanceIcon />
									</ListItemIcon>
									<ListItemText primary={"Bill $" + subFolder?.tags.bill} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton
									onClick={() => {
										handleAllocation("takeOut");
									}}
								>
									<ListItemIcon>
										<AttachMoneyIcon />
									</ListItemIcon>
									<ListItemText
										primary={"Take Out $" + subFolder?.tags.takeOut}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton
									onClick={() => {
										handleAllocation("leave");
									}}
								>
									<ListItemIcon>
										<DraftsIcon />
									</ListItemIcon>
									<ListItemText primary={"Leave $" + subFolder?.tags.leave} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton
									onClick={() => {
										handleAllocation("transfer");
									}}
								>
									<ListItemIcon>
										<CurrencyExchangeIcon />
									</ListItemIcon>
									<ListItemText
										primary={"Transfer $" + subFolder?.tags.transfer}
									/>
								</ListItemButton>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={6} textAlign={"center"}>
						<Typography variant="h5" mb={".5rem"}>
							Tag Allocation
						</Typography>
						<Typography variant="h5" mb={".5rem"}>
							{calculateTagTotal(subFolder?.tags)} / {subFolder?.amount}
						</Typography>
						<CheckCircleIcon
							style={
								subFolder?.tagsComplete
									? { color: "green", fontSize: "3rem" }
									: { fontSize: "3rem" }
							}
						/>
					</Grid>
				</Grid>
				<Button size="large" variant="contained" onClick={handleModifyTags}>
					Modify Tags
				</Button>
			</Container>
			<Container sx={{ marginBottom: "2rem" }}>
				<TextField
					id="outlined-basic"
					label="Notes"
					name="description"
					fullWidth
					multiline
					value={subFolder?.description || ""}
					variant="outlined"
					onChange={handleDescriptionChange}
				/>
				{showDescriptionSaveButton && (
					<Button
						size="large"
						variant="contained"
						sx={{ marginTop: ".5rem" }}
						onClick={handleSave}
					>
						Save
					</Button>
				)}
			</Container>
			<Container disableGutters>
				<ExpenseList
					subFolder={subFolder}
					handleExpenseUpdate={handleExpenseUpdate}
					handleExpenseDelete={handleExpenseDelete}
				></ExpenseList>
			</Container>

			{/* Dialog for editing subFolder amount */}
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>Sub Folder Update</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter the new amount for this folder
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="amount"
						name="amount"
						value={subFolderAmount === 0 ? "" : subFolderAmount}
						type="number"
						fullWidth
						variant="standard"
						onChange={(e) => setSubFolderAmount(Number(e.target.value))}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Cancel</Button>
					<Button type="submit" onClick={handleDialogSubmit}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>

			{/* Modal for updating the sub folder tags */}
			<Modal
				open={modifyTags}
				onClose={handleModifyTagsModalClose}
				aria-labelledby="modal-modal-title"
			>
				<Box sx={modalStyle}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						mb={".5rem"}
					>
						Modify Tags
					</Typography>
					<Typography
						fontWeight={"bold"}
					>{`Sub Folder Amount ${subFolder?.amount}`}</Typography>
					{modalError.showError ? (
						<Alert severity="error">{modalError.message}</Alert>
					) : null}
					<Box sx={{ flexGrow: 1 }}>
						<Grid container marginTop={2}>
							<Grid xs={6} item={true} display="flex" alignItems="center">
								<Typography>Bill</Typography>
							</Grid>
							<Grid xs={6} item={true}>
								<TextField
									name="bill"
									type="number"
									value={tagValues?.bill === 0 ? "" : tagValues.bill}
									size="small"
									onChange={handleTagsChange}
									onKeyDown={handleKeyDownModal}
								></TextField>
							</Grid>
							<Grid xs={6} item={true} display="flex" alignItems="center">
								<Typography sx={{ mt: 1 }}>Take Out</Typography>
							</Grid>
							<Grid xs={6} item={true}>
								<TextField
									sx={{ mt: 1 }}
									name="takeOut"
									type="number"
									value={tagValues?.takeOut === 0 ? "" : tagValues.takeOut}
									size="small"
									onChange={handleTagsChange}
									onKeyDown={handleKeyDownModal}
								></TextField>
							</Grid>
							<Grid xs={6} item={true} display="flex" alignItems="center">
								<Typography sx={{ mt: 1 }}>Leave</Typography>
							</Grid>
							<Grid xs={6} item={true}>
								<TextField
									sx={{ mt: 1 }}
									name="leave"
									type="number"
									value={tagValues?.leave === 0 ? "" : tagValues.leave}
									size="small"
									onChange={handleTagsChange}
									onKeyDown={handleKeyDownModal}
								></TextField>
							</Grid>

							<Grid xs={6} item={true} display="flex" alignItems="center">
								<Typography sx={{ mt: 1 }}>Transfer</Typography>
							</Grid>
							<Grid xs={6} item={true}>
								<TextField
									sx={{ mt: 1 }}
									name="transfer"
									type="number"
									value={tagValues?.transfer === 0 ? "" : tagValues.transfer}
									size="small"
									onChange={handleTagsChange}
									onKeyDown={handleKeyDownModal}
								></TextField>
							</Grid>
						</Grid>
					</Box>
					{showTagModifyButton ? (
						<Box display="flex" justifyContent="right">
							<Button
								sx={{ mt: 2 }}
								size="small"
								variant="contained"
								onClick={handleSave}
							>
								Save Tags
							</Button>
						</Box>
					) : null}
				</Box>
			</Modal>
		</Container>
	);
}

export default SubFolderDetail;
