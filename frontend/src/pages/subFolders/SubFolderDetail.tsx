import React, { useEffect, useState } from "react";
import { SubFolder } from "../../components/SubFolder";
import {
	Box,
	Button,
	Container,
	Grid,
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
import ExpenseList from "../expenses/ExpenseList";
import { Expense } from "../../components/Expense";
import { ExpenseProcess } from "../../components/ExpenseProcess";

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

	useEffect(() => {
		setSubFolder(selectedSubFolder);
	}, [selectedSubFolder]);

	function calculateTagTotal() {
		let tagsTotal = 0;
		if (subFolder) {
			const tagValues = Object.values(subFolder.tags);
			tagValues.forEach((t) => {
				tagsTotal = tagsTotal + t;
			});
		}
		return tagsTotal;
	}

	const calculateFoldersTotal = (folders: SubFolder[]) => {
		let values = folders.map((f) => {
			return f.amount;
		});
		return values.reduce((partialSum, a) => partialSum + a, 0);
	};

	const handleClick = (event: any) => {
		event.stopPropagation();
	};

	const handleSave = () => {
		setModifyTags(false);
		if (subFolder) {
			const tagsTotal = calculateTagTotal();
			tagsTotal === subFolder.amount
				? (subFolder.tagsComplete = true)
				: (subFolder.tagsComplete = false);
			handleSubFolderUpdate(subFolder);
		} else {
			return;
		}
	};

	const handleDescriptionChange = (event: any) => {
		setShowDescriptionSaveButton(true);

		const { name, value } = event.target;

		let updatedValue = value;
		const change = {
			[name]: updatedValue,
		};

		console.log(subFolder);
		let updatedSubFolder: SubFolder = new SubFolder({
			...subFolder,
			...change,
		});
		console.log(updatedSubFolder);
		setSubFolder(updatedSubFolder);
	};

	const handleTagsChange = (event: any) => {
		setShowTagModifyButton(true);

		const { name, value } = event.target;

		let updatedValue = Number(value);
		const change = {
			[name]: updatedValue,
		};

		const tagValues = { ...subFolder?.tags, ...change };
		const tagChange = { ["tags"]: tagValues };

		let updatedSubFolder: SubFolder = new SubFolder({
			...subFolder,
			...tagChange,
		});
		setSubFolder(updatedSubFolder);
	};

	const handleModifyTags = () => {
		setModifyTags(true);
	};
	const handleModifyTagsModalClose = () => {
		setModifyTags(false);
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
			<Container sx={{ marginBottom: "2rem" }}>
				<Typography fontWeight="bold" variant="h6" align="center">
					Tags
				</Typography>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={6}>
						<List>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<AccountBalanceIcon />
									</ListItemIcon>
									<ListItemText primary={"Bill $" + subFolder?.tags.bill} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<AttachMoneyIcon />
									</ListItemIcon>
									<ListItemText
										primary={"Take Out $" + subFolder?.tags.takeOut}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<DraftsIcon />
									</ListItemIcon>
									<ListItemText primary={"Leave $" + subFolder?.tags.leave} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton>
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
							{calculateTagTotal()} / {subFolder?.amount}
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

			{/* Modal for updating the sub folder tags */}
			<Modal
				open={modifyTags}
				onClose={handleModifyTagsModalClose}
				aria-labelledby="modal-modal-title"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Modify Tags
					</Typography>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container marginTop={2}>
							<Grid xs={6} item={true} display="flex" alignItems="center">
								<Typography>Bill</Typography>
							</Grid>
							<Grid xs={6} item={true}>
								<TextField
									name="bill"
									type="number"
									value={subFolder?.tags.bill}
									size="small"
									onChange={handleTagsChange}
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
									value={subFolder?.tags.takeOut}
									size="small"
									onChange={handleTagsChange}
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
									value={subFolder?.tags.leave}
									size="small"
									onChange={handleTagsChange}
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
									value={subFolder?.tags.transfer}
									size="small"
									onChange={handleTagsChange}
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
