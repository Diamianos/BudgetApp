import {
	Box,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import React from "react";
import { SubFolder } from "../../components/SubFolder";

interface SubFolderSummaryProps {
	subFolders: SubFolder[];
}

function SubFolderSummary({ subFolders }: SubFolderSummaryProps) {
	const tagTotals = determineTotalSubFolderTags();

	function determineTotalSubFolderTags() {
		let tagTotals = {
			bill: 0,
			takeOut: 0,
			leave: 0,
			transfer: 0,
		};

		subFolders.forEach((f) => {
			let k: keyof typeof f.tags;
			for (k in f.tags) {
				const keyValue = f.tags[k];
				tagTotals[k] = tagTotals[k] + keyValue;
			}
		});

		return tagTotals;
	}

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
			<List>
				<ListItem>
					<ListItemText>
						<Box component="span" fontWeight="bold" fontSize={17}>
							{"Bill: "}
						</Box>
						{tagTotals.bill}
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Box component="span" fontWeight="bold" fontSize={17}>
							{"Take Out: "}
						</Box>
						{tagTotals.takeOut}
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Box component="span" fontWeight="bold" fontSize={17}>
							{"Leave: "}
						</Box>
						{tagTotals.leave}
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Box component="span" fontWeight="bold" fontSize={17}>
							{"Transfer: "}
						</Box>
						{tagTotals.transfer}
					</ListItemText>
				</ListItem>
			</List>
		</Container>
	);
}

export default SubFolderSummary;
