import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import React,{useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import CheckoutForm from '../CheckoutForm';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
// import PaymentHistory from './PaymentHistory';

const UserInformation = ({accepted, handleWithdraw}) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [duration, setDuration] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const { chapters, dispatch } = useChapterContext();
  // const { user } = useAuthContext();
  const [buttonPopup, setButtonPopup] = useState(false);

    const amount = parseInt(accepted.amount);
    const period = parseInt(accepted.years);
    const interestRate = parseFloat(accepted?.rate)/100;
    // const EMI = 
    // const EMI = (amount*interestRate*Math.pow((1+interestRate), period))/Math.pow((1+interestRate), period-1);
    // const EMIAmount = parseInt(EMI)
    const totalInterest = amount*interestRate;
    const totalInterestAmount = parseInt(totalInterest);
    const totalAmount = amount + totalInterest;
    const total = parseInt(totalAmount);
    const EMIAmount = parseInt(total/(period*12))
    const paymentHistory = accepted?.paymentHistory;
    useEffect(()=>{
      let totalPaidPayment = 0;
      if(paymentHistory !== undefined){
        paymentHistory.map(item=>{
          totalPaidPayment += parseInt(item?.EMIAmount);
          // console.log(item.EMIAmount);
        })
      }   
      setTotalPaid(totalPaidPayment)
    },[accepted])
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
  
      // if (!user) {
      //   setError("you must be logged in");
      //   return;
      // }
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("duration", duration);
      formData.append("description", description);
      formData.append("teacher", teacher);
      formData.append("img", file);
  
      const response = await fetch("http://localhost:4000/api/chapters/", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      if (response.ok) {
        setTitle("");
        setFile("");
        setButtonPopup(false);
        setError(null);
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Course Added successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        console.log("new chapter added", json);
        // dispatch({ type: "CREATE_CHAPTERS", payload: json });
      }
    };
    const handlePaymentHistory = (id)=>{
      navigate(`/paymentHistory/${id}`)
    }
    return (
        <div>
            <Grid item xs={12} sm={12} md={6}>
             <Card sx={{width: '450px', margin: '10px 65px', textAlign: 'left'}}>
      <CardContent>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
        Name: {accepted.name}
        </Typography>
        <Typography variant="h6" component="div">
        Email: {accepted.email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Your address: {accepted.address}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Years: {accepted.years}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Max loan: ${accepted.price}
        </Typography>
        <Typography variant="h6">
        Loans amount: ${accepted.amount}
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
        Total Paid Amount: ${totalPaid}
        </Typography>
        <input defaultValue={accepted.status} type="text" />
       {/* {paymentHistory.map(item=>{
        console.log("item: ", item);
        <Typography style={{color: 'black'}}>{item.status}</Typography>
      })} */}
      </CardContent>
      <CardActions>
        <Button style={{marginLeft: '10px'}} onClick={()=>handleWithdraw(accepted._id)} variant="contained">Withdraw</Button>
        {accepted?.status === "Accepted" && <Button style={{marginLeft: '10px'}} onClick={()=>handlePaymentHistory(accepted._id)} variant="contained">Payment History</Button>}
        {accepted?.status === "Accepted" && <Button style={{marginLeft: '10px'}}>
          <CheckoutForm
          appliedLoan = {accepted}
          EMIAmount = {EMIAmount}
          ></CheckoutForm>
        </Button>}
       
        {/* {
      accepted?.paymentHistory.map((payment)=>{
        <h1>HI</h1>
      //  <PaymentHistory
      //  key = {payment._id}
      //  payment={payment}
      //  ></PaymentHistory>
      })
    } */}
      </CardActions>
   
   
     {accepted?.status === "Awaiting" && <form
      className="flex flex-col"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 style={{marginLeft: '10px'}} className="mx-auto text-xl font-black">Add Documents</h2>
      <TextField
        style={{marginLeft: '10px'}}
        label="Document Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 w-80"
        variant="outlined"
        placeholder="Enter Document Name"
      />
      <br/>
      <Typography style={{margin:'5px', marginLeft: '10px', fontWeight: '500'}}>Uplod file</Typography>
      <div className="flex items-center justify-center bg-grey-lighter">
        <label className="w-80 flex items-center px-16 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          {/* <span style={{fontFamily: 'sans-serif'}} className="text-base leading-normal">Select a file</span> */}
          <input
            className="hidden"
            style={{fontFamily: 'sans-serif', margin:'5px', marginLeft: '10px'}}
            type="file"
            name="profileImage"
            accept="image/png, image/jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>

     <Button
        type="submit"
        className="mt-6"
        variant="contained"
        style={{margin:'10px'}}
        color="primary"
      >
        Add Document
      </Button>

      {/* {error && <div>{error}</div>} */}
    </form>}
   
    </Card>
            </Grid>
        </div>
    );
};

export default UserInformation;