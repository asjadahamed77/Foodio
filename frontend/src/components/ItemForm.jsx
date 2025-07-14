import React, { useContext, useState } from 'react'
import addImage from '../assets/icons/add-image.png'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { addItem } from '../service/itemService';

const ItemForm = () => {
  const {categories, setCategories ,  itemsData,
    setItemsData} = useContext(AppContext)
  const [loading, setLoading] = useState(false);
  const [image,setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    categoryId: '',
    price: '',
    description: '',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!image){
      toast.error("Please select an image for the category.");
      setLoading(false);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('item', JSON.stringify(data));
    formData.append('file', image);
    try {
      const response = await addItem(formData);
      if (response.status === 201) {
        setItemsData([...itemsData,response.data])
        toast.success("Item created successfully!");
         setCategories((prevCategories) => prevCategories.map(category => category.categoryId === data.categoryId ? { ...category, items: category.items + 1 } : category ))
       
        setData({
          "name": "",
          "categoryId": "",
          "price": "" , 
          "description" : ""    
        });
        setImage(null);
      }else{
        toast.error("Failed to create category. Please try again.");
        console.error("Error creating category:", response.data);
      }
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
      console.error("Error creating category:", error);
    }finally{
      setLoading(false);
    }

    
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        <div>
          <label htmlFor="image">
            <img
              src={image? URL.createObjectURL(image) : addImage}
              alt="Add Item"
              className="w-24 h-24 cursor-pointer hover:scale-105 transform duration-200 transition-opacity"
            />
          </label>
          <input type="file" name="image" id="image" className="hidden" onChange={(e)=> setImage(e.target.files[0])} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg  tracking-wide">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Item Name"
            className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
            value={data.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-lg  tracking-wide">
            Category
          </label>
          <select name="categoryId" id="category"   className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0" 
          value= {data.categoryId}
          onChange={onChangeHandler} > 
          <option value="">-- SELECT CATEGORY --</option>
            {
              categories.map((category,index) => (
                <option key={index} value={category.categoryId}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-lg  tracking-wide">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Item Price"
            className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
            value= {data.price}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg tracking-wide">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Write content here..."
            className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0 h-24 resize-none"
            value= {data.description}
            onChange={onChangeHandler}
          />
        </div>
       
        <button type="submit" disabled={loading} className=" py-2 px-16 rounded-2xl bg-white text-gray-900 cursor-pointer hover:opacity-85 duration-300 transition-opacity">{loading ? "Loading...": "Save Item"}</button>
      </form>
    </div> 
  )
}

export default ItemForm
