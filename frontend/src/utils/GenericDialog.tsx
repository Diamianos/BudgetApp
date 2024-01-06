import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { DialogInformation } from "../interfaces/DialogInformation";

interface GenericDialogProps {
	dialogInformation: DialogInformation;
	setDialogInformation: (values: DialogInformation) => void;
	handleDialogYes: () => void;
	handleDialogNo: () => void;
}

function GenericDialog({
	dialogInformation,
	setDialogInformation,
	handleDialogYes,
	handleDialogNo,
}: GenericDialogProps) {
	const handleDialogClose = () => {
		const newDialogInformation = {
			open: false,
			message: "",
		};
		setDialogInformation(newDialogInformation);
	};

	return (
		<Dialog
			open={dialogInformation.open}
			onClose={handleDialogClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Notice"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{dialogInformation.message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="success" onClick={handleDialogYes}>
					Yes
				</Button>
				<Button variant="contained" color="error" onClick={handleDialogNo}>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default GenericDialog;
