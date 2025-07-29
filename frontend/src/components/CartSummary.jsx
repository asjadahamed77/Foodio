import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { createOrder, deleteOrder } from "../service/OrderService";
import toast from "react-hot-toast";
import { createRazorpayOrder, verifyPayment } from "../service/PaymentService";
import { appConstants } from "../utills/constants";
import RecieptPopup from "./RecieptPopup";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
  setOrderDetails,
  setShowPopup,
}) => {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
 

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Order deletion failed");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer details");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      totalAmount,
      paymentMethod: paymentMode,
    };

    setIsProcessing(true);

    try {
      const response = await createOrder(orderData);
    
      const savedData = response.data;

      if (response.status === 201 && paymentMode === "CASH") {
        toast.success("Cash order placed successfully");
        setOrderDetails({ ...savedData, items: cartItems });
        setShowPopup(true); 
        clearAll();
      } else if (response.status === 201 && paymentMode === "razorpay") {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          toast.error("Razorpay SDK failed to load");
          setIsProcessing(false);
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        const razorpayResponse = await createRazorpayOrder({
          amount: totalAmount,
          currency: "LKR",
        });

        const options = {
          key: appConstants.RAZOR_PAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: "Foodio Restaurant",
          description: "Order Payment",
          handler: async function (response) {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment Cancelled.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async () => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment Failed.");
        });
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Order processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const paymentResponse = await verifyPayment(paymentData);
      if (paymentResponse.status === 200) {
        toast.success("Payment Successful");
        setOrderDetails({
          ...savedOrder,
          items: cartItems,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        

        });
        setShowPopup(true);
      } else {
        await deleteOrderOnFailure(savedOrder.orderId);
        toast.error("Payment Verification Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Payment Verification Failed");
    }
  };

  const placeOrder = () => {
   
      toast.error("Please complete payment before placing the order.");
      return;
  
  ;
    
  };

 

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">Total Amount:</p>
        <p className="text-lg font-semibold">Rs. {totalAmount.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => completePayment("CASH")}
          disabled={isProcessing}
          className="bg-green-500 text-white py-2 font-semibold tracking-wider rounded-md cursor-pointer hover:bg-white hover:text-green-500 border duration-300 transition-colors"
        >
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button
          onClick={() => completePayment("razorpay")}
          disabled={isProcessing}
          className="bg-blue-500 text-white py-2 hover:bg-white hover:text-blue-500 font-semibold tracking-wider rounded-md border duration-300 transition-colors cursor-pointer"
        >
          {isProcessing ? "Processing..." : "Razorpay"}
        </button>
      </div>

      <button
        onClick={placeOrder}
        disabled={isProcessing}
        className="py-2 rounded-md bg-yellow-400 text-black font-semibold tracking-wider hover:opacity-75 duration-300 transition-opacity cursor-pointer"
      >
        Place Order
      </button>

      
    </div>
  );
};

export default CartSummary;