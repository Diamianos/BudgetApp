import { AppBar, Box, Container, Link, Toolbar } from "@mui/material";
import React from "react";

function Navbar() {
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
						<Link
							href="/"
							variant="button"
							sx={{ color: "white", display: "block" }}
						>
							Home
						</Link>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
