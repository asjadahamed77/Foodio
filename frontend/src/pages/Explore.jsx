import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Explore = () => {
  const {categories} = useContext(AppContext);
  

  
  return (
    <div className='grid lg:grid-cols-[2fr_1fr] gap-[25px] px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-hidden overflow-y-scroll'> 
    {/* Category Form  */}
      <div className='backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 grid lg:grid-cols-2 gap-8' >
      {/* Show Categories */}
      <div className='p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20'>
Show Categories
      </div>

      {/* Show Items */}
      <div className='p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20'>
Show Items
      </div>
    
      </div>
      {/*  List of Categories */}
      <div className='backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 h-[calc(100vh-120px)] space-y-8 overflow-y-scroll'> 
       {/*  Customer Information Form */}
       <div className='p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[15%] overflow-y-scroll'>
       Customer Information Form
      </div>
       {/*  Cart Items */}
       <div className='p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[45%] overflow-y-scroll'>
       Cart Items
      </div>
      {/*  Cart Summary */}
      <div className='p-2 sm:p-4 bg-white/15 rounded-2xl border border-white/20 h-[30%] overflow-y-scroll'>
       Cart Summary
      </div>
      </div>
    </div>
  )
}

export default Explore
