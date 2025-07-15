import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import DisplayCategory from "../components/DisplayCategory";
import DisplayItems from "../components/DisplayItems";
import CustomerForm from "../components/CustomerForm";
import CartItems from "../components/CartItems";
import CartSummary from "../components/CartSummary";

const Explore = () => {
  const { categories } = useContext(AppContext);

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-[25px] px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-hidden overflow-y-scroll">
      {/* Category Form  */}
      <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 flex flex-col   gap-6">
        {/* Show Categories */}
        <div className="p-2 sm:p-4 bg-white/15 h-[30%] rounded-2xl border border-white/20">
          <DisplayCategory categories={categories} />
        </div>

        {/* Show Items */}
        <div className="p-2 sm:p-4 bg-white/15 rounded-2xl h-[70%] border border-white/20">
          <DisplayItems />
        </div>
      </div>
      {/*  List of Categories */}
      <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 h-[calc(100vh-120px)] space-y-4 overflow-y-scroll">
        {/*  Customer Information Form */}
        <div className="p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[18%] overflow-y-scroll">
          <CustomerForm />
        </div>
        {/*  Cart Items */}
        <div className="p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[47%] overflow-y-scroll">
          <CartItems />
        </div>
        {/*  Cart Summary */}
        <div className="p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[30%] overflow-y-scroll">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Explore;
