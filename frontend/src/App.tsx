import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/system";

import FoldersPage from "./pages/folders/FolderPage";
import SubFoldersPage from "./pages/subFolders/SubFolderPage";
import Navbar from "./components/Navbar";
import CreateSubFoldersPage from "./pages/subFolders/CreateSubFoldersPage";

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Router>
				<Navbar />
				<Container>
					<Routes>
						<Route path="/" element={<FoldersPage />}></Route>
						<Route
							path="/create_subfolders/:date"
							element={<CreateSubFoldersPage />}
						></Route>
						<Route path="/subfolders" element={<SubFoldersPage />}></Route>
					</Routes>
				</Container>
			</Router>
		</React.Fragment>
	);
}

export default App;
