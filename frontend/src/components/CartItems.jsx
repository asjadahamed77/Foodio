import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { MdDelete } from "react-icons/md";

const CartItems = () => {
  const { cartItems } = useContext(AppContext);
 
  
  return (
    <div>
      {
        cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className='flex flex-col gap-4'>
            {
              cartItems.map((item, index) => (
                <div key={index} className='flex flex-col p-4  rounded-lg shadow-md backdrop-blur-[800px] bg-black/30'>
                <div className='flex items-center justify-between'>
                  <h3 className='font-semibold'>{item.name}</h3>
                  <p>Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>
               <div className='flex items-center justify-between mt-4'>
               <div className='flex items-center gap-2 '>

<button disabled={item.quantity ===1} className='bg-white text-black font-bold px-3 py-1 rounded-md hover:bg-black hover:text-white duration-300 transition-colors' >
  -
</button>
<button className='px-3 py-1 border border-white/40' >{item.quantity}</button>

<button className='bg-white text-black font-bold px-3 py-1 rounded-md hover:bg-black hover:text-white duration-300 transition-colors' >
  +
</button>

</div>
                <div className='cursor-pointer bg-white p-2 rounded-md' >
                  <MdDelete className='text-xl text-red-500 hover:text-red-700' />
                </div>
               </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default CartItems
