import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { addUser } from '../service/userService';

const UserForm = ({setUsers}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER"
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
    try {
      const response = await addUser(data);
      if(response.status === 201) {
        toast.success("User added successfully");
        setUsers((prev) => [...prev, response.data]);
        setData({
          name: "",
          email: "",
          password: "",
          role: "ROLE_USER"
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save user");
      
    }finally{
      setLoading(false);
    }

  }

  return (
    <div>
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
      
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg  tracking-wide">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="User Name"
          className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
          onChange={onChangeHandler}
          value={data.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-lg  tracking-wide">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="User Email"
          className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
          onChange={onChangeHandler}
          value={data.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-lg  tracking-wide">
        Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="User Password"
          className=" p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
          onChange={onChangeHandler}
          value={data.password}
        />
      </div>
      
      <button disabled={loading} type="submit" className=" py-2 px-16 rounded-2xl bg-white text-gray-900 cursor-pointer hover:opacity-85 duration-300 transition-opacity">{loading ? "Loading" : "Save User"}</button>
    </form>
  </div>
  )
}

export default UserForm
