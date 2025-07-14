import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { deleteUser } from '../service/userService';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

const UserList = ({users, setUsers}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterUsers = users.filter((user) =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByUserId = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.status == 204) {
        setUsers((prev) =>
          prev.filter(
            (user) => user.UserId !== id
          )
          
        );
        toast.success("User deleted successfully!");
      }else{
        toast.error("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };



  return (
    <div  className="max-h-[calc(100vh-180px)] ">
      {/* Search */}
      <div className="flex items-center border border-white/80 rounded-xl ">
        <input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search users"
          className=" w-full p-2   rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0 placeholder:text-white backdrop-blur-[400px] "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="p-2">
          <FiSearch className="text-2xl text-white cursor-pointer hover:text-gray-300" />
        </span>
      </div>
       {/* List Users */}
       <div className="mt-6 flex flex-col gap-6 overflow-y-scroll h-[500px]">
        {filterUsers.map((user, index) => (
          <div key={index} className="rounded-xl p-2 sm:p-4 border border-white/10 flex justify-between items-center gap-4 sm:gap-6 hover:bg-black/50 duration-300 transition-opacity">
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className=" ">{user.email}</p>
              <p className="">{user.role}</p>
            </div>
            <div>
              <button
                onClick={() => deleteByUserId(user.userId)}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                <MdDelete className="text-2xl" />
              </button>
            </div>

          </div>
           
        
        ))}
      </div>
    </div>
  )
}

export default UserList
