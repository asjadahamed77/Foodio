import React from 'react'

const Item = ({itemName, itemPrice, itemImage, itemId }) => {
  return (
    <div className='backdrop-blur-[400px] flex items-center gap-4 p-4 rounded-[12px] hover:scale-105 duration-300 transition-all'>
      <div className='bg-white p-1.5 rounded-[8px]'>
        <img src={itemImage} alt={itemName} className='w-16 h-16 '  />
      </div>
      <div>
        <h3 className='font-semibold tracking-wide'>{itemName}</h3>
        <p className='italic'>Rs. {itemPrice}</p>
      </div>
      <div className='bg-white text-black p-2 px-4 rounded-[8px] hover:bg-black hover:text-white transition-all duration-300'>
        <p>+</p>
      </div>
    </div>
  )
}

export default Item
