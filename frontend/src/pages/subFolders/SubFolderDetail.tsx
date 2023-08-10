import React, { useEffect, useState } from "react";
import { SubFolder } from "./SubFolder";
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

interface SubFolderDetailProps {
	subFolders: SubFolder[];
	selectedSubFolder: SubFolder | undefined;
	handleSubFolderUpdate: (subFolder: SubFolder) => void;
	showDescriptionSaveButton: boolean;
	setShowDescriptionSaveButton: (value: boolean) => void;
}

function SubFolderDetail(props: SubFolderDetailProps) {
	const {
		subFolders,
		selectedSubFolder,
		handleSubFolderUpdate,
		showDescriptionSaveButton,
		setShowDescriptionSaveButton,
	} = props;

	const [subFolder, setSubFolder] = useState<SubFolder | undefined>();
	const [modifyTags, setModifyTags] = useState(false);

	useEffect(() => {
		setSubFolder(selectedSubFolder);
	}, [selectedSubFolder]);

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
		if (subFolder) {
			handleSubFolderUpdate(subFolder);
		} else {
			return;
		}
	};

	const handleChange = (event: any) => {
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
			{subFolder ? (
				<>
					<Typography variant="h4" align="center" gutterBottom>
						{subFolder.name}
					</Typography>
					<Box sx={{ marginBottom: "2rem" }}>
						<Typography fontWeight="bold" variant="h6" align="center">
							Tags
						</Typography>
						<Box
							sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
						>
							<List>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<AccountBalanceIcon />
										</ListItemIcon>
										<ListItemText primary={"Bill " + subFolder.tags.bill} />
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<AttachMoneyIcon />
										</ListItemIcon>
										<ListItemText
											primary={"Take Out " + subFolder.tags.takeOut}
										/>
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<DraftsIcon />
										</ListItemIcon>
										<ListItemText primary={"Leave " + subFolder.tags.leave} />
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<CurrencyExchangeIcon />
										</ListItemIcon>
										<ListItemText
											primary={"Transfer " + subFolder.tags.transfer}
										/>
									</ListItemButton>
								</ListItem>
							</List>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Button
								size="large"
								variant="contained"
								onClick={handleModifyTags}
							>
								Modify Tags
							</Button>
						</Box>
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
										<Grid xs={6} display="flex" alignItems="center">
											<Typography>Bill</Typography>
										</Grid>
										<Grid xs={6}>
											<TextField
												name="bill"
												type="number"
												value={subFolder.tags.bill}
												size="small"
											></TextField>
										</Grid>
										<Grid xs={6} display="flex" alignItems="center">
											<Typography sx={{ mt: 1 }}>Take Out</Typography>
										</Grid>
										<Grid xs={6}>
											<TextField
												sx={{ mt: 1 }}
												name="takeOut"
												type="number"
												value={subFolder.tags.takeOut}
												size="small"
											></TextField>
										</Grid>
										<Grid xs={6} display="flex" alignItems="center">
											<Typography sx={{ mt: 1 }}>Leave</Typography>
										</Grid>
										<Grid xs={6}>
											<TextField
												sx={{ mt: 1 }}
												name="leave"
												type="number"
												value={subFolder.tags.leave}
												size="small"
											></TextField>
										</Grid>

										<Grid xs={6} display="flex" alignItems="center">
											<Typography sx={{ mt: 1 }}>Transfer</Typography>
										</Grid>
										<Grid xs={6}>
											<TextField
												sx={{ mt: 1 }}
												name="transfer"
												type="number"
												value={subFolder.tags.transfer}
												size="small"
											></TextField>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Modal>
					</Box>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						marginBottom="2rem"
					>
						<TextField
							id="outlined-basic"
							label="Notes"
							name="description"
							multiline
							value={subFolder.description}
							variant="outlined"
							onChange={handleChange}
						/>
						{showDescriptionSaveButton && (
							<Button
								size="large"
								variant="contained"
								sx={{ marginLeft: ".5rem" }}
								onClick={handleSave}
							>
								Save
							</Button>
						)}
					</Box>
				</>
			) : (
				<Typography variant="h6" align="center" gutterBottom>
					Income: {calculateFoldersTotal(subFolders)}
				</Typography>
			)}
		</Container>
	);
}

export default SubFolderDetail;
