import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container } from '@mui/system';

import FoldersPage from './folder/FolderPage';
import SubFoldersPage from './folder/subFolder/SubFoldersPage'
import Navbar from './components/Navbar';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<FoldersPage />}></Route>
            <Route path="/subfolders" element={<SubFoldersPage />}></Route>
          </Routes>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
