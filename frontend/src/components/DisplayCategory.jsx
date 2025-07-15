import React from 'react'
import Category from './Category'

const DisplayCategory = ({categories, selectedCategory, setSelectedCategory}) => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {
        categories.map((category) => (
          <div key={category.categoryId} >
            <Category
              categoryName = {category.name} 
              imageUrl = {category.imageUrl}
              numberOfItems = {category.items}
              bgColor = {category.bgColor}
              isSelected = {selectedCategory === category.categoryId}
              onClick = {() => setSelectedCategory(category.categoryId)}
            />
          </div>
        )) 
      }
    </div>
  )
}

export default DisplayCategory
