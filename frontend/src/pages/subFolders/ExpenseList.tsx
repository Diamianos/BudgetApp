import { Container } from "@mui/material";
import React from "react";
import { SubFolder } from "./SubFolder";

interface ExpenseListProps {
	selectedRow: SubFolder | undefined;
}

function ExpenseList({ selectedRow }: ExpenseListProps) {
	return (
		<Container sx={{ backgroundColor: "lightgreen", minHeight: "100vh" }}>
			Expense List for {selectedRow?.name}
		</Container>
	);
}

export default ExpenseList;
