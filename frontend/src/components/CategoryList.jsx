import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { MdDelete } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { deleteCategory } from "../service/categoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByCategoryId = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.status == 204) {
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.categoryId !== categoryId
          )
        );
        toast.success("Category deleted successfully!");
      }else{
        toast.error("Failed to delete category. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
    }
  };

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
    <div>
      {/* Search */}
      <div className="flex items-center border border-white/80 rounded-xl">
        <input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search categories"
          className=" w-full p-2   rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0 placeholder:text-white backdrop-blur-[400px] "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="p-2">
          <FiSearch className="text-2xl text-white cursor-pointer hover:text-gray-300" />
        </span>
      </div>
      {/* List Categories */}
      <div className="mt-6 flex flex-col gap-6">
        {filteredCategories.map((category, index) => (
          <div
            key={index}
            className={` rounded-xl p-2 sm:p-4  border border-white/20 flex justify-between items-center gap-4 sm:gap-6 hover:opacity-85 duration-300 transition-opacity `}
            style={{
              backgroundColor: category.bgColor,
              color: isColorDark(category.bgColor) ? "#ffffff" : "#000000",
            }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-[60px] h-[60px] p-2 border rounded-lg"
                style={{
                  borderColor: isColorDark(category.bgColor)
                    ? "#ffffff"
                    : "#000000",
                }}
              />
              <div>
                <p>{category.name}</p>
                <span>{category.items} Items</span>
              </div>
            </div>

            <p
              onClick={() => deleteByCategoryId(category.categoryId)}
              className="bg-white rounded-lg p-2 border "
              style={{
                borderColor: isColorDark(category.bgColor)
                  ? "#ffffff"
                  : "#000000",
              }}
            >
              <MdDelete className="text-2xl text-red-500 cursor-pointer hover:text-red-700 " />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
