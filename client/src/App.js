import React, { useEffect, useState } from 'react';
import './App.css';
// import { Route, Link, Routes } from 'react-router-dom';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// table css
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
// progress(spinner) css
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function App() {
  const [customersData, setData] = useState(null);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      customers();
    }, 2000);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const stateRefresh = () => {
    customers();
  }

  const customers = async () => {
    try {
      const response = await fetch('/api/customers');
      const body = await response.json();
      setData(body);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  return (
    <div>
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
              <StyledTableCell>설정</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customersData ? customersData.map(c => {
                return (
                  <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} stateRefresh={stateRefresh} />
                )
              }) :
                <TableRow>
                  <StyledTableCell colSpan="6" align='center'>
                    <CircularProgressWithLabel value={progress} />
                  </StyledTableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
};

export default App;
