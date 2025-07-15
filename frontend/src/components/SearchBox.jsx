import React, { useState } from 'react'

const SearchBox = ({onSearch}) => {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
    onSearch(inputValue); 
    }

  return (
    <div>
      <input type="text"  placeholder='Search Items...' className="min-w-[300px] w-full p-2 shadow-white shadow-[0px_4px_12px]  rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0 placeholder:text-white backdrop-blur-[400px]  mb-4 border" value={searchText} onChange={handleInputChange} />
    </div>
  )
}

export default SearchBox
