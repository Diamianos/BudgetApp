import React, { useEffect, useState } from "react";
import { SubFolder } from "./SubFolder";
import {
	Box,
	Button,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
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
	const [tempSubFolder, setTempSubfolder] = useState(subFolder);

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
		{
			if (subFolder) {
				handleSubFolderUpdate(subFolder);
			} else {
				return;
			}
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
										<ListItemText
											primary={"Bill " + subFolder.tags.get("BILL")}
										/>
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<AttachMoneyIcon />
										</ListItemIcon>
										<ListItemText
											primary={"Take Out " + subFolder.tags.get("TAKE_OUT")}
										/>
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<DraftsIcon />
										</ListItemIcon>
										<ListItemText
											primary={"Leave " + subFolder.tags.get("LEAVE")}
										/>
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<CurrencyExchangeIcon />
										</ListItemIcon>
										<ListItemText
											primary={"Transfer " + subFolder.tags.get("TRANSFER")}
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
							<Button size="large" variant="contained">
								Modify Tags
							</Button>
						</Box>
					</Box>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						marginBottom="2rem"
					>
						<TextField
							id="outlined-basic"
							label="Description"
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
