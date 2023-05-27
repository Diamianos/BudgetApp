import React, { useState } from 'react'

import { MOCK_SUB_FOLDERS } from '../MockSubFolders'
import { SubFolder } from './SubFolder'
import { Container, ToggleButton, ToggleButtonGroup } from '@mui/material'

function SubFoldersPage() {

  const [subFolders, setSubFolders] = useState<SubFolder[]>(MOCK_SUB_FOLDERS)

  const [monthPeriod, setMonthPeriod] = React.useState<string | null>('first_half');

  const handleMonthPeriodChange = (
    event: React.MouseEvent<HTMLElement>,
    newMonthPeriod: string | null,) => {
      if (newMonthPeriod !== null) {
        setMonthPeriod(newMonthPeriod);
      }
  };

  return (
    <div>
      <h2 className='table-header'>Sub Folders</h2>
      <Container
      disableGutters
      sx={{display:'flex', justifyContent:'center'}}>
        <ToggleButtonGroup
        size='large'
        color="primary"
        value={monthPeriod}
        exclusive={true}
        onChange={handleMonthPeriodChange}
        aria-label="Platform">
          <ToggleButton value="first_half">Days 1-14</ToggleButton>
          <ToggleButton value="second_half">Days 15-30</ToggleButton>
        </ToggleButtonGroup>
      </Container>

      {subFolders.map((folder, index) => {
        return <div key={index}>{JSON.stringify(folder)}</div>
      })}
    </div>
  )
}

export default SubFoldersPage