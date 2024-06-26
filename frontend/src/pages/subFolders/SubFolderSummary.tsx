import {
	Container,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	makeStyles,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import React, { useState } from "react";
import { SubFolder } from "../../components/SubFolder";
import { TagDialogInterface } from "../../interfaces/TagDialogInterface";

interface SubFolderSummaryProps {
	subFolders: SubFolder[];
	monthPeriod: string | null;
}

function SubFolderSummary({ subFolders, monthPeriod }: SubFolderSummaryProps) {
	const [dialog, setDialog] = useState<TagDialogInterface>({
		open: false,
		name: "",
		text: [],
	});

	const tagTotals = determineTotalSubFolderTags();
	const tagDescriptions = calculateSubFolderTagDescriptions();

	function calculateSubFolderTagDescriptions() {
		let billList: string[] = [];
		let takeOutList: string[] = [];
		let leaveList: string[] = [];
		let transferList: string[] = [];

		subFolders.forEach((f) => {
			if (f.monthPeriod.toLowerCase() === monthPeriod?.toLowerCase()) {
				const folderName = f.name;
				let k: keyof typeof f.tags;
				for (k in f.tags) {
					const keyValue = f.tags[k];
					switch (k) {
						case "bill":
							if (keyValue !== 0) {
								billList.push(`${folderName} $${keyValue}`);
							}
							break;
						case "takeOut":
							if (keyValue !== 0) {
								takeOutList.push(`${folderName} $${keyValue}`);
							}
							break;
						case "leave":
							if (keyValue !== 0) {
								leaveList.push(`${folderName} $${keyValue}`);
							}
							break;
						case "transfer":
							if (keyValue !== 0) {
								transferList.push(`${folderName} $${keyValue}`);
							}
							break;
						default:
							break;
					}
				}
			}
		});

		return {
			bill: billList,
			takeOut: takeOutList,
			leave: leaveList,
			transfer: transferList,
		};
	}

	function determineTotalSubFolderTags() {
		let tagTotals = {
			bill: 0,
			takeOut: 0,
			leave: 0,
			transfer: 0,
		};

		subFolders.forEach((f) => {
			if (f.monthPeriod.toLowerCase() === monthPeriod?.toLowerCase()) {
				let k: keyof typeof f.tags;
				for (k in f.tags) {
					const keyValue = f.tags[k];
					tagTotals[k] = tagTotals[k] + keyValue;
				}
			}
		});

		return tagTotals;
	}

	function determineSubFolderTotal() {
		let total = 0;

		subFolders.forEach((sf) => {
			if (sf.monthPeriod.toLowerCase() === monthPeriod?.toLowerCase()) {
				total += sf.amount;
			}
		});

		return total;
	}

	const handleTagButtonClick = (value: keyof typeof tagDescriptions) => {
		const tagText = tagDescriptions[value];
		let tagTexString = "";
		tagText.forEach((t) => {
			tagTexString = tagTexString + `${t}, `;
		});
		setDialog({
			open: true,
			name: value[0].toUpperCase() + value.slice(1),
			text: tagText,
		});
		console.log(value);
	};

	const handleDialogClose = () => {
		setDialog({
			open: false,
			name: "",
			text: [],
		});
	};

	const boldText = {
		fontWeight: "bold",
	};

	const generateTagDescriptions = (key: string) => {
		let generatedString = "";
		switch (key) {
			case "bill":
				tagDescriptions.bill.forEach((v) => {
					generatedString += v + ", ";
				});
				break;
			case "takeOut":
				tagDescriptions.takeOut.forEach((v) => {
					generatedString += v + ", ";
				});
				break;
			case "leave":
				tagDescriptions.leave.forEach((v) => {
					generatedString += v + ", ";
				});
				break;
			case "transfer":
				tagDescriptions.transfer.forEach((v) => {
					generatedString += v + ", ";
				});
				break;
			default:
				break;
		}
		return generatedString.substring(0, generatedString.length - 2);
	};

	return (
		<Container
			sx={{
				backgroundColor: "white",
				maxHeight: "100vh",
				overflow: "auto",
			}}
		>
			<Typography
				mt={1}
				variant="h5"
				align="center"
				fontWeight={"bold"}
				gutterBottom
			>
				Subfolder Summary
			</Typography>
			<Typography mt={3} mb={3} variant="h6" align="center" gutterBottom>
				{"Total: " + determineSubFolderTotal()}
			</Typography>
			<Typography
				mt={1}
				variant="h5"
				align="center"
				fontWeight={"bold"}
				gutterBottom
			>
				Tags
			</Typography>
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleTagButtonClick("bill")}>
						<ListItemIcon>
							<AccountBalanceIcon />
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ style: boldText }}
							primary={"Bill $" + tagTotals.bill}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem sx={{ marginLeft: "3.5rem" }}>
					{generateTagDescriptions("bill")}
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleTagButtonClick("takeOut")}>
						<ListItemIcon>
							<AttachMoneyIcon />
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ style: boldText }}
							primary={"Take Out $" + tagTotals.takeOut}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem sx={{ marginLeft: "3.5rem" }}>
					{generateTagDescriptions("takeOut")}
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleTagButtonClick("leave")}>
						<ListItemIcon>
							<DraftsIcon />
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ style: boldText }}
							primary={"Leave $" + tagTotals.leave}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem sx={{ marginLeft: "3.5rem" }}>
					{generateTagDescriptions("leave")}
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleTagButtonClick("transfer")}>
						<ListItemIcon>
							<CurrencyExchangeIcon />
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ style: boldText }}
							primary={"Transfer $" + tagTotals.transfer}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem sx={{ marginLeft: "3.5rem" }}>
					{generateTagDescriptions("transfer")}
				</ListItem>
			</List>

			{/* Dialog of tag information */}
			<Dialog open={dialog.open} onClose={handleDialogClose}>
				<DialogTitle>{`Tag Information for "${dialog.name}"`}</DialogTitle>
				<List>
					{dialog.text.map((text) => (
						<ListItem key={text}>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Dialog>
		</Container>
	);
}

export default SubFolderSummary;
