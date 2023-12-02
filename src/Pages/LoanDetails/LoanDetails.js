import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from './../Context/useAuth';
import { useForm } from 'react-hook-form';
import './LoanDetails.css';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Auth, LoginCredentials} from "two-step-auth";
import axios from 'axios';
import toast from "react-hot-toast";

const LoanDetails = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState("");
    const [appliedLoan, setAppliedLoan] = useState([]);
    const [number, setNumber] = useState("");
    const {loanId} = useParams();
    const {loans, user} = useAuth();
    const navigate = useNavigate();
    const [submitData, setSubmitData] = useState({});
    const [otpCode, setOtpCode] = useState("");
    const { register, handleSubmit, reset } = useForm();
    useEffect(()=>{
        const findResult = loans.find(loan => loan._id == loanId);
        setAppliedLoan(findResult);
    }, [loans])
    // console.log(appliedLoan);


    const onSubmit = async(data) => {  
          setSubmitData(data);
         try {
          const response = await axios.post("http://localhost:5000/send-otp", {phoneNumber: data.phone});
          if (response.data.success) {
            toast.success(response.data.message);
            setOpen(true);     
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      
        
    }
    const verifyOTP = async()=>{
      const usersDetails = {status: "Processing", loanName: appliedLoan.name, image: appliedLoan.image, time: appliedLoan.time, price: appliedLoan.price, 
      description: appliedLoan.description, name: submitData.name, email: submitData.email, nidNum: submitData.number, address: submitData.address, reference: submitData.reference, phone: submitData.phone, nomini: submitData.nomini,
      years: submitData.years, amount: submitData.amount, rate: appliedLoan.rate};
      const maxMinYears = appliedLoan?.time.match(/\d+/g);
      try{
        const response = await axios.post("http://localhost:5000/verify-otp", {phoneNumber: submitData.phone, otp: otpCode});
        if (response.data.success) {
          toast.success(response.data.message);
          if(parseInt(submitData?.years)>=parseInt(maxMinYears[0]) && parseInt(submitData?.years)<=parseInt(maxMinYears[1]) && parseInt(submitData?.amount)<=parseInt(appliedLoan?.price)){
            fetch('http://localhost:5000/loanRequest', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(usersDetails)
            })
            .then(res => res.json())
            .then(result =>{
                alert("Details Successfully Submitted");
                // console.log(result)
                reset();
                setOpen(false);
                navigate('/users')
            })
            // navigate('/users')
            // setOpen(true);
        }
        else{
            alert("Check the amount or years which is cross the limit")
        }
        } else {
          toast.error(response.data.message);
        }
      }catch(error){

      }
    }
    const handleOpen = () => {
      setOpen(true);
    }
    const handleClose = () => {
     


        // LoginCredentials.mailID = "jahidhasan21cse@gmail.com";
        //   LoginCredentials.password = "Jahid@12345"
        //   LoginCredentials.use = true;
        //   login("jahidhasan21cse@gmail.com")
        // console.log("nid: ", number);
        // fetch(`http://localhost:5000/otpcode/:${number}`)
        // .then(res=>res.json())
        // .then(result=>{
        //     console.log("otp", result)
        //     if(result){
        //         console.log("otp1", result)
        //         if(result?.otpCode === value){
        //             setOpen(false);
        //             navigate('/users')
        //         }
        //         else {
        //             alert("You Entered Wrong OTP Code")
        //             setOpen(true);
        //         }
                
        //     }
        // })
       
      };
    return (
        <div className="container">
            {/* <h1>{appliedLoan.name}</h1> */}
            <Button onClick={handleOpen}>Open</Button>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={{md: '-8px'}} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} sm={12} md={6}>
                <img style={{width: '600px', height: '400px', marginTop: '20px'}} src={appliedLoan.image} alt="" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
           <div style={{margin: '10px 20px', textAlign: 'left'}}>
           <h1>Loan name: {appliedLoan.name}</h1>
            <h2>Years limit: {appliedLoan.time}</h2>
            <h2>Max loan: {appliedLoan.price}</h2>
            <h2>Interest Rate: {appliedLoan.rate}%</h2>
            <p>Description: {appliedLoan.description}</p>
           </div>
            </Grid>
            </Grid>
              <h1>Provide Your Details</h1>
            <Grid container spacing={{md: '-8px'}} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} sm={12} md={6}>
            <div style={{textAlign: 'left', marginLeft: '140px'}}>
            <div style={{marginTop:'10px', marginBottom: '1px'}}>
            <label className="name">Name: </label>
            <input style={{padding: '10px', borderRadius: '20px', marginLeft: '45px', width: '250px'}} defaultValue={user.displayName} readOnly {...register("name", { required: true, maxLength: 20 })} />
            </div>
             <br />
             <div style={{marginBottom: '1px'}}>
             <label className="phone">NID Number: </label>
             <input style={{padding: '10px', borderRadius: '20px', width: '250px'}} placeholder="NID Number" type="number" {...register("number", )} />
             </div>
              <br />
             <div>
             <label className="address" htmlFor="">Address: </label>
             <input style={{padding: '10px', borderRadius: '20px', marginLeft: '30px', width: '250px'}} placeholder="Address" {...register("address")} />
             </div>
             <div>
             <label className="address" htmlFor="">Reference: </label>
             <input style={{marginTop: '15px', padding: '10px', borderRadius: '20px', marginLeft: '20px', width: '250px'}} placeholder="Reference name" {...register("reference")} />
             </div>
             <div>
             <label className="address" htmlFor="">Nomini: </label>
             <input style={{marginTop: '15px', padding: '10px', borderRadius: '20px', marginLeft: '30px', width: '250px'}} placeholder="Nomini name" {...register("nomini")} />
             </div>
            </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
             <div style={{textAlign: 'left'}}>
             <div style={{marginTop: '10px', marginBottom: '1px'}}>
             <label className="email">Email: </label>
            <input style={{padding: '10px', borderRadius: '20px', marginLeft: '45px', width: '250px'}} readOnly defaultValue={user.email} {...register("email")} />
             </div>
              <br />
            <div>
            <label className="city" htmlFor="">Tenure years: </label>
             <input style={{padding: '10px', borderRadius: '20px', width: '250px'}} placeholder="Years" {...register("years")} />
            </div>
            <br />
            <label className="city" htmlFor="">Loan amount: </label>
             <input style={{padding: '10px', borderRadius: '20px', width: '250px'}} placeholder="Amount" {...register("amount")} />
             <br/>
             <div>
             <label className="city" htmlFor="">Phone Number: </label>
             <input style={{marginTop: '15px', padding: '10px', borderRadius: '20px', width: '250px'}} placeholder="e.g: 88017434727" {...register("phone")} />
             </div>
             <div>
             <label className="city" htmlFor="">Interest rate: </label>
             <input style={{marginTop: '15px', padding: '10px', borderRadius: '20px', width: '250px'}} defaultValue={appliedLoan?.rate} readOnly placeholder="Interest rate" {...register("rate")} />
             </div>
             </div>
            </Grid>
            </Grid>
           <br />
         <input className="submit-button" type="submit" value="Apply Loan"/>
            </form>
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Verify Your PhoneNumber</DialogTitle>
        <DialogContent>
          <DialogContentText>
          OTP code send your Phone 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP Code"
            type="code"
            fullWidth
            variant="standard"
            onChange={(e)=>setOtpCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={verifyOTP}>Verify</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
};

export default LoanDetails;