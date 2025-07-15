import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Item from './Item'
import SearchBox from './SearchBox'

const DisplayItems = () => {
  const {itemsData} = useContext(AppContext)

  const [searchText, setSearchText] = useState('')

  const filteredItems = itemsData.filter(item =>{
    return item.name.toLowerCase().includes(searchText.toLowerCase())
  })
  
  return (
    <div>
      <div className='flex justify-end my-2'>
        <SearchBox onSearch={setSearchText} />
      </div>
      <div className='flex flex-wrap items-center gap-4'>
      {
        filteredItems.map((item, index) => (
          <div key={index}>
            <Item
            itemName={item.name}
            itemPrice={item.price}
            itemImage={item.imageUrl}
            itemId={item.itemId}
            />
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default DisplayItems
