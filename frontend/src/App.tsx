import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';

import FoldersPage from './folders/FolderPage';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <FoldersPage />
      </Container>
    </React.Fragment>
  );
}

export default App;
