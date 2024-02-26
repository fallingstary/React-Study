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

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/any',
    'name': '정유성',
    'birthday': '980213',
    'gender': '남성',
    'job': '개발자'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/1',
    'name': '홍길동',
    'birthday': '920213',
    'gender': '남성',
    'job': '의적'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/2',
    'name': '이순신',
    'birthday': '870213',
    'gender': '남성',
    'job': '장군'
  },
]

function App() {
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
            customers.map(c => {
              return (
                <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default App;
