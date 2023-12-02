// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   TextField,
//   Grid,
//   Paper,
// } from '@mui/material';
// import OtpInput from 'react-otp-input';
// import PhoneInput from 'react-phone-input-2';
// import { BsTelephoneFill, BsFillShieldLockFill } from 'react-icons/bs';
// import { CgSpinner } from 'react-icons/cg';
// import { toast, Toaster } from "react-hot-toast";
// // import { auth } from "./firebase.config";      
// import { RecaptchaVerifier, signInWithPhoneNumber, getAuth} from "firebase/auth";
// import initializeAuthentication from '../Firebase/Firebase.init';
// initializeAuthentication();
// const OtpVerify = () => {
//   const [otp, setOtp] = useState('');
//   const [ph, setPh] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);
//   const auth = getAuth();
//   const handleRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//         console.log("I am here")
//         window.recaptchaVerifier = new RecaptchaVerifier(auth,
//           "recaptcha-container",
//           {
//             size: "invisible",
//             callback: (response) => {
//               onSignup();
//             },
//             "expired-callback": () => {},
//           }      
//         );
//       }
//   };

//   const onSignup = () => {
//     setLoading(true);
//     handleRecaptcha();
//     const appVerifier = window.recaptchaVerifier;
//     const formatPh = "+" + ph;
//     console.log("form: ", formatPh, auth, window);
//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         console.log("confirm: ", confirmationResult);
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sended successfully!");
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log("errror: ", error);
//         setLoading(false);
//       });
     
//   };

//   const onOTPVerify = () => {
//     setLoading(true);
//     window.confirmationResult
//     .confirm(otp)
//     .then(async (res) => {
//       console.log(res);
//       setUser(res.user);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.log(err);
//       setLoading(false);
//     });
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container" />
//         {user ? (
//           <Typography variant="h4" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
//             👍Login Success
//           </Typography>
//         ) : (
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12}>
//               <Typography variant="h4" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
//                 Welcome to <br /> CODE A PROGRAM
//               </Typography>
//             </Grid>
//             {showOTP ? (
//               <>
//                 <Grid item xs={12}>
//                   <Paper
//                     style={{
//                       background: 'white',
//                       borderRadius: '50%',
//                       padding: '1.5rem',
//                       margin: 'auto',
//                     }}
//                   >
//                     <BsFillShieldLockFill style={{ fontSize: '1.5rem', color: 'emerald' }} />
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="h6" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
//                     Enter your OTP
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <OtpInput
//                     value={otp}
//                     onChange={setOtp}
//                     numInputs={6}
//                     separator={<span>-</span>}
//                     isInputNum
//                     shouldAutoFocus
//                     inputStyle={{ width: '3rem', height: '3rem' }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     onClick={onOTPVerify}
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                   >
//                     {loading && <CircularProgress size={20} style={{ marginRight: '1rem' }} />}
//                     Verify OTP
//                   </Button>
//                 </Grid>
//               </>
//             ) : (
//               <>
//                 <Grid item xs={12}>
//                   <Paper
//                     style={{
//                       background: 'white',
//                       borderRadius: '50%',
//                       padding: '1.5rem',
//                       margin: 'auto',
//                     }}
//                   >
//                     <BsTelephoneFill style={{ fontSize: '1.5rem', color: 'emerald' }} />
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="h6" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
//                     Verify your phone number
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <PhoneInput
//                     country={'in'}
//                     value={ph}
//                     onChange={setPh}
//                     inputStyle={{ width: '100%' }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     onClick={onSignup}
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                   >
//                     {loading && <CircularProgress size={20} style={{ marginRight: '1rem' }} />}
//                     Send code via SMS
//                   </Button>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default OtpVerify;
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { auth } from "./firebase.config";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import initializeAuthentication from "../Firebase/Firebase.init";
initializeAuthentication();
const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        console.log("confirm", confirmationResult)
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtpVerify;