import React from 'react'

const Category = ({categoryName, imageUrl, numberOfItems, bgColor }) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
      <div>
        <img src={imageUrl} alt={categoryName} />
      </div>
    </div>
  )
}

export default Category
