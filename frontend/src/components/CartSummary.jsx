import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import RecieptPopup from "./RecieptPopup";
import { createOrder, deleteOrder } from "../service/OrderService";
import toast from "react-hot-toast";
import { createRazorpayOrder, verifyPayment } from "../service/PaymentService";
import { appConstants } from "../utills/constants";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null)
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const loadRazorpayScript = ()=> {
    return new Promise((resolve, reject)=>{
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(new Error("Razorpay SDK failed to load"));
      };
      document.body.appendChild(script);
    })
  }

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId)
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  const completePayment = async (paymentMode) => {
    if(!customerName || !mobileNumber) {
      toast.error("Please enter customer details");
      return; 
    }
    if(cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      totalAmount,
      paymentMode: paymentMode.toUpperCase()
    }

    setIsProcessing(true);

    try {
     const response = await createOrder(orderData);

     const savedData = response.data

     if(response.status === 201 && paymentMode === "cash"){
      toast.success("Cash order placed successfully");
      setOrderDetails(savedData);
     }else if(response.status === 201 && paymentMode === "razorpay") {
      const razorpayLoaded = await loadRazorpayScript()
      if(!razorpayLoaded) {
        toast.error("Razorpay SDK failed to load");
        setIsProcessing(false);
        deleteOrderOnFailure(savedData.orderId)
        return;
      }
     const razorpayResponse = await createRazorpayOrder({amount: totalAmount, currency: "LKR"})
     const options = {
      key: appConstants.RAZOR_PAY_KEY_ID,
      amount: razorpayResponse.data.amount,
      currency: razorpayResponse.data.currency,
      order_id: razorpayResponse.data.id,
      name: "Foodio Restaurant",
      description: "Order Payment",
      handler: async function (response)  {
       await verifyPaymentHandler(response, savedData); 
     },
     prefill:{
      name: customerName,
      contact: mobileNumber
     },
     theme: {
      color: "#3399cc"
     },
     modal:{
      ondismiss: async ()=>{
        await deleteOrderOnFailure(savedData.orderId)
        toast.error("Payment Cancelled.");
      }
     }
    }

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", async (response)=>{
      await deleteOrderOnFailure(savedData.orderId)
        toast.error("Payment Cancelled.");
    })
    rzp.open();
  }
      
    } catch (error) {
      console.log(error);
      toast.error(error)
    }finally{
      setIsProcessing(false);
    }
  }

  const verifyPaymentHandler = async(response, savedOrder) => {
    const paymentData = {
      razorpayOrderId : response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId
    }

    try {
    const paymentResponse = await verifyPayment(paymentData);
    if(paymentResponse.status === 200) {
      toast.success("Payment Successful");
      setOrderDetails({
        ...savedOrder,
        paymentDetails: {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature
        }
      });
    } else {
      await deleteOrderOnFailure(savedOrder.orderId)
      toast.error("Payment Verification Failed");
    }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }

  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold">Total Amount:</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Rs. {totalAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-500 text-white py-2 font-semibold tracking-wider rounded-md cursor-pointer hover:bg-white hover:text-green-500 border duration-300 transition-colors ">
          Cash
        </button>
        <button className="bg-blue-500 text-white py-2 hover:bg-white hover:text-blue-500 font-semibold tracking-wider rounded-md border duration-300 transition-colors cursor-pointer ">
          Razor Pay
        </button>
      </div>
      <button className="py-2 rounded-md bg-yellow-400 text-black font-semibold tracking-wider hover:opacity-75 duration-300 transition-opacity cursor-pointer">Place Order</button>
    </div>
  );
};

export default CartSummary;
