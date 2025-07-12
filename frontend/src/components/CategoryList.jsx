import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MdDelete } from "react-icons/md";

const CategoryList = () => {
  const { categories } = useContext(AppContext);

  // Check if a hex color is dark
  const isColorDark = (hex) => {
    if (!hex || hex[0] !== "#" || hex.length !== 7) return false;

    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance < 0.5; // dark if less than 0.5
  };

  return (
    <div>
      {/* Search */}
      <div>Seacrh Bar</div>
      {/* List Categories */}
      <div className="mt-6 flex flex-col gap-6">
        {categories.map((category, index) => (
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
