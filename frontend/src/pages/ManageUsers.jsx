import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import toast from "react-hot-toast";
import { fetchUsers } from "../service/userService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users");
        
      }finally{
        setLoading(false);
      }
    }
    fetchAllUsers();
  },[]);

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-[25px] px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Category Form  */}
      <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
        <UserForm users={users} setUsers={setUsers} />
      </div>
      {/*  List of Categories */}
      <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
        <UserList users={users} setUsers={setUsers}  />
      </div>
    </div>
  );
};

export default ManageUsers;
