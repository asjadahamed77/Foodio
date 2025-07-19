import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import RecieptPopup from "./RecieptPopup";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems } = useContext(AppContext);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
