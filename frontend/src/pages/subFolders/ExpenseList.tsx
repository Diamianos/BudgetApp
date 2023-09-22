import { Container, Typography } from "@mui/material";
import React from "react";
import { SubFolder } from "./SubFolder";

interface ExpenseListProps {
	subFolder: SubFolder | undefined;
}

function ExpenseList({ subFolder }: ExpenseListProps) {
	return (
		<Container
			sx={{
				backgroundColor: "rgba(25, 118, 210, 0.08)",
				maxHeight: "100vh",
				minHeight: "100px",
				overflow: "auto",
				mb: 2,
			}}
		>
			<Typography fontWeight="bold" variant="h6" align="center">
				Expenses
			</Typography>
		</Container>
	);
}

export default ExpenseList;
