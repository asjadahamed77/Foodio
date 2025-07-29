import React from 'react';

const RecieptPopup = ({ orderDetails, onClose, onPrint }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-y-auto ">
     <div className="bg-white text-black rounded-md p-6 w-full max-w-md mx-4 my-8 shadow-lg " id="receipt-content">
        <h2 className="text-lg font-bold mb-4">Receipt</h2>
        <p>Order ID: <span>{orderDetails.orderId}</span></p>
        <p>Name: <span>{orderDetails.customerName}</span></p>
        <p>Phone: <span>{orderDetails.phoneNumber}</span></p>

        <h3 className="font-semibold mt-4 mb-2">Items Ordered</h3>
        <div className="mb-4">
          {
            orderDetails.items?.map((item, index) => (
              <div key={index} className="flex justify-between">
                <p>{item.name} x {item.quantity}</p>
                <p>Rs. {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          }
        </div>

        <div className="mb-2">
          <strong>Total Amount: </strong>
          <span>Rs. {orderDetails.totalAmount.toFixed(2)}</span>
        </div>

        <div className="mb-2">
          <strong>Payment Method: </strong>
          <span>{orderDetails.paymentMethod}</span>
        </div>

        {
          orderDetails.paymentMethod === "razorpay" && orderDetails.paymentDetails && (
            <div className="mb-2">
              <strong>Transaction ID: </strong>
              <span>{orderDetails.paymentDetails.razorpayPaymentId}</span>
            </div>
          )
        }

        <div className="grid grid-cols-2 gap-4 mt-4 no-print">
          <button onClick={onPrint} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Print Receipt
          </button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecieptPopup;
