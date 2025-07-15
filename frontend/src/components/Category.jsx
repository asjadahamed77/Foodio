import React from 'react'

const Category = ({categoryName, imageUrl, numberOfItems, bgColor, isSelected, onClick }) => {

    // Check if a hex color is dark
    const isColorDark = (hex) => {
      if (!hex || hex[0] !== "#" || hex.length !== 7) return false;
  
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
  
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
      return luminance < 0.5;
    };
  return (
    <div onClick={onClick}  style={{
      backgroundColor: bgColor,
      color: isColorDark(bgColor) ? "#ffffff" : "#000000",
    }} className={`flex gap-6 items-center justify-center p-4 px-8  shadow-lg w-fit hover:scale-110 duration-300 transition-all ${isSelected ? 'shadow-white shadow-[0px_4px_12px] border-2 mt-2  border-red-500' : 'rounded-lg'}`}>
      <div className='p-1 bg-white rounded-md'>
        <img src={imageUrl} alt={categoryName} className='w-12 h-12' />
      </div>
      <div>
        <h2 className=" font-bold">{categoryName}</h2>
        <p className="text-sm">{numberOfItems} Items</p>
      </div>
    </div>
  )
}

export default Category
