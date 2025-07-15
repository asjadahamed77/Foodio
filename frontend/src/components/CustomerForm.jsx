import React, { useState } from 'react'

const CustomerForm = ({customerName, setCustomerName, mobileNumber, setMobileNumber}) => {

 

  const onSubmitHandler = (e) => {
    e.preventDefault();
   
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col  gap-2">
      <div className="grid grid-cols-[1fr_1.5fr] ">
        <label htmlFor="customerName" className="  tracking-wide w-fit">
          Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          id="customerName"
          placeholder="Customer Name"
          className=" bg-white text-black  p-1.5 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
         
        />
      </div>
      <div className="grid grid-cols-[1fr_1.5fr]">
        <label htmlFor="mobileNumber" className=" tracking-wide">
          Mobile Number
        </label>
        <input
          type="number"
          name="mobileNumber"
          id="customerNmobileNumberame"
          placeholder="Mobile Number"
          className=" p-1.5 border bg-white text-black border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        
        />
      </div>
    </form>
  )
}

export default CustomerForm
