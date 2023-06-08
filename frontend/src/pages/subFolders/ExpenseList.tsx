import { Container } from "@mui/material";
import React from "react";
import { SubFolder } from "./SubFolder";

interface ExpenseListProps {
	selectedRow: SubFolder | undefined;
}

function ExpenseList({ selectedRow }: ExpenseListProps) {
	return (
		<Container
			sx={{
				backgroundColor: "rgba(25, 118, 210, 0.08)",
				maxHeight: "100vh",
				overflow: "auto",
			}}
		></Container>
	);
}

export default ExpenseList;
