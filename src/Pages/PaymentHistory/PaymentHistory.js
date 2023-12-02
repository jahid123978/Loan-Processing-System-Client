import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

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

export default function PaymentHistory() {
    const params = useParams();
    console.log("param: ", params.id)
    const [data, setData] = React.useState([]);
    React.useEffect(()=>{
        fetch(`http://localhost:5000/paymentHistory/${params.id}`)
        .then(res=>res.json())
        .then(result=>{
            console.log("data: ", result[0]?.paymentHistory)
            setData(result[0]?.paymentHistory);
        })
    }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, height: '450px',  }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Card Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{new Date(row?.paymentTime).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">{row?.email}</StyledTableCell>
              <StyledTableCell align="right">${row?.EMIAmount}</StyledTableCell>
              <StyledTableCell align="right" style={{color:"green"}}>Paid</StyledTableCell>
              <StyledTableCell align="right">{row?.token?.card?.brand}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}