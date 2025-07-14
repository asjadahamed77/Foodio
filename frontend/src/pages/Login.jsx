import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { login } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const Login = () => {

    const navigate = useNavigate()

    const {setAuthData} = useContext(AppContext)

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
    email: "",
    password: ""
    })

    const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value
    }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
           const response = await login(data);
            if (response.status === 200) {
                toast.success("Login successful!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role);
              
                navigate("/"); 
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="flex items-center justify-center h-screen ">
      <form onSubmit={onSubmitHandler} className="w-[340px] sm:w-[450px] backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
        <h1 className="font-bold text-4xl tracking-wide">Sign in</h1>
        <p className="mt-2 font-light">Sign in below to access your account</p>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className="p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
                onChange={onChangeHandler}
                value={data.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
              className="p-2 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/70 focus:outline-0"
                onChange={onChangeHandler}
                value={data.password}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" py-2 px-16 rounded-xl bg-white mt-2 text-gray-900 cursor-pointer hover:opacity-85 duration-300 transition-opacity"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
