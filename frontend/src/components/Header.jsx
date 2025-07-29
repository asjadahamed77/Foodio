import React, { useContext, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { RiMenu5Line } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const NavLinks = [
  { name: "Dashboard", link: "/" },
  { name: "Explore", link: "/explore" },
  { name: "Manage Items", link: "/manage-items" },
  { name: "Manage Categories", link: "/manage-categories" },
  { name: "Manage Users", link: "/manage-users" },
  { name: "Order History", link: "/order-history" },
];

const Header = () => {
  const location = useLocation();
  const {setAuthData} = useContext(AppContext)
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const toggleMobileLinks = () => setShowMobileLinks(!showMobileLinks);
  const navigate = useNavigate();

  const [mobileProfileClicked, setMobileProfileClicked] = useState(false);

  const toggleMobileProfile = () => {
    setMobileProfileClicked(!mobileProfileClicked);
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthData(null, null);  
    navigate("/login");
  }

  return (
    <div className="py-4 px-6 flex flex-col relative z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center box-border">
        {/* Logo */}
        <div className="text-center backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
          <h1 className="text-3xl font-bold tracking-wider uppercase">
            Foodio
          </h1>
        </div>

        {/* Desktop NavLinks */}
        <ul className="hidden lg:flex backdrop-blur-md rounded-4xl py-2 px-2 bg-white/5 border border-white/10 shadow-sm space-x-4">
        {NavLinks.map((link, index) => {
  const isActive = location.pathname === link.link;
  return (
    <li
      key={index}
      className={`inline-flex px-4 py-2 text-xs xl:text-base font-semibold tracking-wider uppercase rounded-full transition-colors duration-300 ${
        isActive ? "bg-white/15" : "hover:bg-white/10"
      }`}
    >
      <a href={link.link}>{link.name}</a>
    </li>
  );
})}

        </ul>

        {/* Mobile Menu Button */}
        <div
          onClick={toggleMobileLinks}
          className="block lg:hidden backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10"
        >
          <RiMenu5Line className="text-2xl" />
        </div>

        {/* User Icon */}
        <div className="group relative">
  <div onClick={toggleMobileProfile} className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-200  hover:bg-white/10">
    <FaCircleUser className="text-2xl" />
  </div>
 <div className={`absolute right-0 p-4 ${mobileProfileClicked ? "opacity-100": ""}   opacity-0 group-hover:opacity-100  pointer-events-none group-hover:pointer-events-auto`}>
 <ul className={`  w-48  rounded-xl shadow-lg  border border-white/35 backdrop-blur-[50px]`}>
    <li className="px-4 py-2 rounded-lg  cursor-pointer hover:bg-white/10">Settings</li>
    <li className="px-4 py-2  rounded-lg cursor-pointer hover:bg-white/10">Activity Log</li>
    <li
      onClick={logoutHandler}
      className="px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
    >
      Logout
    </li>
  </ul>
 </div>
</div>

      </div>

      {/* Background Overlay when Mobile Nav is open */}
      {showMobileLinks && (
        <div
          onClick={toggleMobileLinks}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
        ></div>
      )}

      {/* Mobile Navigation Links */}
      <ul
        className={`fixed left-0 right-0 bottom-0 z-40 
        bg-white/5 backdrop-blur-md border border-white/10 
        shadow-md rounded-3xl p-6 text-center transition-transform duration-300 ease-linear 
        ${
          showMobileLinks ? "translate-y-0 m-6" : "translate-y-full"
        } lg:hidden`}
      >
        {/* Close Icon */}
        <IoIosCloseCircle
          className="text-3xl absolute top-4 right-4 text-white cursor-pointer"
          onClick={toggleMobileLinks}
        />

        {/* Links */}
        {NavLinks.map((link, index) => (
          <li
            key={index}
            className="py-2 text-white font-semibold tracking-wider uppercase hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
