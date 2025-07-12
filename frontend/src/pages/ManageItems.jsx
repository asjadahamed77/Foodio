import React from "react";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";

const ManageItems = () => {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-[25px] px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Category Form  */}
      <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
        <ItemForm />
      </div>
      {/*  List of Categories */}
      <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
        <ItemList />
      </div>
    </div>
  );
};

export default ManageItems;
