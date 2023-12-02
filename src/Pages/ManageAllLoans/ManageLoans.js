import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ManageLoans = ({loan}) => {
  const [age, setAge] = React.useState(loan?.status);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0)

  const handleChange = (event) => {
    const updateStatus = {
        status: event.target.value
    }
      fetch(`http://localhost:5000/allLoanRequest/${loan?._id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updateStatus),
      })
          .then((res) => res.json())
          .then((data) => {
              if (data.modifiedCount > 0) {
                  alert("Status Changed Successfully!");
                  setAge(event.target.value);
              }
          });

  };
  // const amount = parseInt(loan.amount);
  //   const period = parseInt(loan.years);
  //   const interestRate = 8.9/100;
  //   const EMI = (amount*interestRate*Math.pow((1+interestRate), period))/Math.pow((1+interestRate), period-1);
  //   const EMIAmount = parseInt(EMI)
  //   const totalInterest = amount*interestRate*period;
  //   const totalInterestAmount = parseInt(totalInterest);
  //   const totalAmount = amount + totalInterest;
  //   const total = parseInt(totalAmount);
  

  const amount = parseInt(loan?.amount);
  const period = parseInt(loan?.years);
  const interestRate = parseFloat(loan?.rate)/100;
  const totalInterest = amount*interestRate;
  const totalInterestAmount = parseInt(totalInterest);
  const totalAmount = amount + totalInterest;
  const total = parseInt(totalAmount);
  const EMIAmount = parseInt(total/(period*12))
  const paymentHistory = loan?.paymentHistory;
  useEffect(()=>{
    let totlaPaid = 0;
    if(paymentHistory !== undefined){
      paymentHistory?.map(item=>{
        totlaPaid += parseInt(item?.EMIAmount);
        })
    }
    setTotalPaidAmount(totlaPaid);
  },[])
    return (
        <div>
           <Grid item xs={12} sm={12} md={6}>
                    <Card sx={{width: '450px', margin: '10px 65px', textAlign: 'left'}}>
             <CardContent>
               <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
               Name: {loan.name}
               </Typography>
               <Typography variant="h6" component="div">
               Email: {loan.email}
               </Typography>
               <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Your address: {loan.address}
               </Typography>
               <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Years: {loan.years}
               </Typography>
               <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Interest Rate: {loan?.rate}
               </Typography>
               <Typography variant="h6">
               Loans amount: ${loan.amount}
               </Typography>
               <Typography variant="h6">
               Monthly EMI: ${EMIAmount}
               </Typography>
               <Typography variant="h6">
               Total interest: ${totalInterestAmount}
               </Typography>
               <Typography variant="h6">
               Total amount: ${total}
               </Typography>
               <Typography variant="h6">
               Total Paid Amount: ${totalPaidAmount}
               </Typography>
               {/* <input defaultValue={loan.status} type="text" /> */}
             </CardContent>
             <CardActions>
             <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={'Processing'}>Processing</MenuItem>
          <MenuItem value={'Awaiting'}>Awaiting</MenuItem>
          <MenuItem value={'Accepted'}>Accepted</MenuItem>
          <MenuItem value={'Rejected'}>Rejected</MenuItem>
        </Select>
      </FormControl>
    </Box>
               <Button style={{marginLeft: '10px'}} variant="contained"><Link style={{textDecoration: 'none', color: 'white'}} to={`/paymentHistory/${loan._id}`}>Payment History</Link></Button>
             </CardActions>
            </Card>
                   </Grid> 
        </div>
    );
};

export default ManageLoans;