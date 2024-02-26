import React from "react";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Customer(customer) {
    return (
        <StyledTableRow key={customer.id}>
            <StyledTableCell component="th" scope="row">{customer.id}</StyledTableCell>
            <StyledTableCell><img src={customer.image} alt="profile"></img></StyledTableCell>
            <StyledTableCell>{customer.name}</StyledTableCell>
            <StyledTableCell>{customer.birthday}</StyledTableCell>
            <StyledTableCell>{customer.gender}</StyledTableCell>
            <StyledTableCell>{customer.job}</StyledTableCell>
        </StyledTableRow>
    )
}

export default Customer;