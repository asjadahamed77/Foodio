import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { deleteItem } from '../service/itemService';
import toast from 'react-hot-toast';
import { FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


const ItemList = () => {

  const { itemsData, setItemsData } = useContext(AppContext)

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = itemsData.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByItemId = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status == 204) {
        setItemsData((prevCategories) =>
          prevCategories.filter(
            (item) => item.categoryId !== itemId
          )
        );
        toast.success("Item deleted successfully!");
      }else{
        toast.error("Failed to delete item. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="max-h-[calc(100vh-180px)] ">
      {/* Search */}
      <div className="flex items-center border border-white/80 rounded-xl ">
        <input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search Items"
          className=" w-full p-2   rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0 placeholder:text-white backdrop-blur-[400px] "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="p-2">
          <FiSearch className="text-2xl text-white cursor-pointer hover:text-gray-300" />
        </span>
      </div>
      {/* List Categories */}
      <div className="mt-6 flex flex-col gap-6 overflow-y-scroll h-[500px]">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className={` rounded-xl p-2 sm:p-4  border border-white/20 flex justify-between items-center gap-4 sm:gap-6 hover:bg-black/40 duration-300 transition-opacity `}
           
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-[60px] h-[60px] p-2 border rounded-lg"
               
              />
              <div>
                <p className='font-semibold tracking-wide'>{item.name}</p>
                <p>Category: {item.categoryName}</p>
              <p className='p-1 rounded-full bg-white text-black font-medium w-fit mt-1 px-2'>Rs. {item.price}</p>
              </div>
            </div>

            <p
              onClick={() => deleteByItemId(item.itemId)}
              className="bg-white rounded-lg p-2 border "
             
            >
              <MdDelete className="text-2xl text-red-500 cursor-pointer hover:text-red-700 " />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList
