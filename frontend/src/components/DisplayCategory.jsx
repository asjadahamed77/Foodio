import React from 'react'
import Category from './Category'

const DisplayCategory = ({categories}) => {
  return (
    <div>
      {
        categories.map((category) => (
          <div key={category.categoryId} className="">
            <Category
              categoryName = {category.name} 
              imageUrl = {category.imageUrl}
              numberOfItems = {category.items}
              bgColor = {category.bgColor}
            />
          </div>
        )) 
      }
    </div>
  )
}

export default DisplayCategory
