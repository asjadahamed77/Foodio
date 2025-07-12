import React, { useContext, useState } from "react";
import addImage from "../assets/icons/add-image.png";
import toast from "react-hot-toast";
import { addCategory } from "../service/categoryService";
import { AppContext } from "../context/AppContext";

const CategoryForm = () => {
  const { categories ,setCategories} = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [data, setData]= useState({
    "name": "",
    "description": "",
    "bgColor": "#ffffff"
  })

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!image){
      toast.error("Please select an image for the category.");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
  formData.append("file", image);
  try {
    const response = await addCategory(formData);
    if (response.status === 201) {
      setCategories([...categories,response.data])
      toast.success("Category created successfully!");
      setLoading(false);
      setData({
        "name": "",
        "description": "",
        "bgColor": "#ffffff"
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
    <div className="overflow-x-hidden overflow-y-scroll max-h-fit">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 max-h-fit">
        <div>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : addImage}
              alt="Add Category"
              className="w-24 h-24 cursor-pointer hover:scale-105 transform duration-200 transition-opacity"
            />
          </label>
          <input type="file" name="image" id="image" className="hidden" onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg  tracking-wide">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Category Name"
            className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
            onChange={onChangeHandler}
            value={data.name}
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
            onChange={onChangeHandler}
            value={data.description}
          />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="bgColor" className="text-lg tracking-wide">Background Colour</label>
            <input type="color" name="bgColor" id="bgColor" placeholder="#ffffff" className=" h-12 w-24" 
               onChange={onChangeHandler}
               value={data.bgColor}
            />
        </div>
        <button type="submit" disabled={loading} className=" py-2 px-16 rounded-2xl bg-white text-gray-900 cursor-pointer hover:opacity-85 duration-300 transition-opacity">{loading? "Loading": "Save Category"}</button>
      </form>
    </div>
  );
};

export default CategoryForm;
