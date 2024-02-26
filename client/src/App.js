import React, { useEffect, useState } from 'react';
import './App.css';
// import { Route, Link, Routes } from 'react-router-dom';
import Customer from './components/Customer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// table styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function App() {
  const [customersData, setData] = useState(null);

  useEffect(() => {
    customers();
  }, []);

  const customers = async () => {
    try {
      const response = await fetch('/api/customers');
      const body = await response.json();
      console.log(response, body);
      setData(body);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  // console.log(c, setData);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1080 }} aria-label='Customer Table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>번호</StyledTableCell>
            <StyledTableCell>이미지</StyledTableCell>
            <StyledTableCell>이름</StyledTableCell>
            <StyledTableCell>생년월일</StyledTableCell>
            <StyledTableCell>성별</StyledTableCell>
            <StyledTableCell>직업</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            customersData ? customersData.map(c => {
              return (
                <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
              )
            }) : ""
          }
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default App;
