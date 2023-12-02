import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const CheckoutForm = ({appliedLoan, EMIAmount}) => {
  const publishableKey = "pk_test_51HUEyCDOfBXcEuEsVmMIMEMQrIYISOFotjKzya4LE7mX7P7XxeZjO2wxwK0JTCKhRnMI4xqq4BsTi7Ywalju0Hmz00ockhzAbW";
   
  const onToken = token => {
    // const body = {
    //   amount: 999,
    //   token: token
    // };
    console.log("token: ", token);
    appliedLoan.token = token
    appliedLoan.EMIAmount = EMIAmount
    appliedLoan.paymentTime = new Date();
    appliedLoan.paymentStatus = 'paid';

    axios
      .post("http://localhost:5000/payment", appliedLoan)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log("Payment Error: ", error);
      });
  };

  return (
    <StripeCheckout
      label="Payment EMI" //Component button text
      name="Business LLC" //Modal Header
      description="Monthly your EMI payment."
      panelLabel="Go payment" //Submit button in modal
      amount={EMIAmount*100} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
    />
  );
};

export default CheckoutForm;