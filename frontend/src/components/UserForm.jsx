import React from 'react'

const UserForm = () => {
  return (
    <div>
    <form className="flex flex-col gap-4">
      
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
        />
      </div>
      
      <button type="submit" className=" py-2 px-16 rounded-2xl bg-white text-gray-900 cursor-pointer hover:opacity-85 duration-300 transition-opacity">Save User</button>
    </form>
  </div>
  )
}

export default UserForm
