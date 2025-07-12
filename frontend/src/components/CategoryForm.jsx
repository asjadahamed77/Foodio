import React from "react";
import addImage from "../assets/icons/add-image.png";

const CategoryForm = () => {
  return (
    <div className="overflow-x-hidden overflow-y-scroll">
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="image">
            <img
              src={addImage}
              alt="Add Category"
              className="w-24 h-24 cursor-pointer hover:scale-105 transform duration-200 transition-opacity"
            />
          </label>
          <input type="file" name="image" id="image" className="hidden" />
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
          />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="bgColor" className="text-lg tracking-wide">Background Colour</label>
            <input type="color" name="bgColor" id="bgColor" placeholder="#ffffff" className=" h-12 w-24"  />
        </div>
        <button type="submit" className=" py-2 px-16 rounded-2xl bg-white text-gray-900 cursor-pointer hover:opacity-85 duration-300 transition-opacity">Save Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
