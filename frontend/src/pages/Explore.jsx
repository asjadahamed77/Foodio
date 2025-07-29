import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import DisplayCategory from "../components/DisplayCategory";
import DisplayItems from "../components/DisplayItems";
import CustomerForm from "../components/CustomerForm";
import CartItems from "../components/CartItems";
import CartSummary from "../components/CartSummary";
import RecieptPopup from "../components/RecieptPopup";

const Explore = () => {
  const { categories } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState("");

  // Popup and order data
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Customer input
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <>
      {!showPopup ? (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-[25px] px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-hidden overflow-y-scroll">
          {/* Left Section */}
          <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 flex flex-col gap-6">
            {/* Categories */}
            <div className="p-2 sm:p-4 bg-white/15 h-[30%] rounded-2xl border border-white/20 overflow-y-scroll">
              <DisplayCategory
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            {/* Items */}
            <div className="p-2 sm:p-4 bg-white/15 rounded-2xl h-[70%] border border-white/20">
              <DisplayItems selectedCategory={selectedCategory} />
            </div>
          </div>

          {/* Right Section */}
          <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 h-[calc(100vh-120px)] space-y-4 overflow-y-scroll">
            {/* Customer Form */}
            <div className="p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[18%] overflow-y-scroll">
              <CustomerForm
                customerName={customerName}
                setCustomerName={setCustomerName}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
              />
            </div>

            {/* Cart Items */}
            <div className="p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[50%] overflow-x-hidden overflow-y-scroll">
              <CartItems />
            </div>

            {/* Cart Summary with payment options */}
            <div className="p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[27%] overflow-y-scroll">
              <CartSummary
                customerName={customerName}
                setCustomerName={setCustomerName}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                setOrderDetails={setOrderDetails}
                setShowPopup={setShowPopup}
              />
            </div>
          </div>
        </div>
      ) : (
        // Receipt Popup
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-y-auto">
          <RecieptPopup
            orderDetails={orderDetails}
            onClose={() => setShowPopup(false)}
            onPrint={handlePrintReceipt}
          />
        </div>
      )}
    </>
  );
};

export default Explore;
