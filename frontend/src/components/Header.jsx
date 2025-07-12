import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { RiMenu5Line } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";

const NavLinks = [
  { name: "Dashboard", link: "/" },
  { name: "Explore", link: "/explore" },
  { name: "Manage Items", link: "/manage-items" },
  { name: "Manage Categories", link: "/manage-categories" },
  { name: "Manage Users", link: "/manage-users" },
];

const Header = () => {
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const toggleMobileLinks = () => setShowMobileLinks(!showMobileLinks);

  return (
    <div className="py-4 px-6 flex flex-col relative z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center box-border">
        {/* Logo */}
        <div className="text-center backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
          <h1 className="text-3xl font-bold tracking-wider uppercase">Foodio</h1>
       
        </div>

        {/* Desktop NavLinks */}
        <ul className="hidden lg:flex backdrop-blur-md rounded-4xl py-2 px-2 bg-white/5 border border-white/10 shadow-sm space-x-4">
          {NavLinks.map((link, index) => (
            <li
              key={index}
              className="inline-flex px-4 py-2 text-xs xl:text-base font-semibold tracking-wider uppercase hover:bg-white/15 rounded-full transition-colors duration-300"
            >
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div
          onClick={toggleMobileLinks}
          className="block lg:hidden backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10"
        >
          <RiMenu5Line className="text-2xl" />
        </div>

        {/* User Icon */}
        <div className="backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
          <FaCircleUser className="text-2xl" />
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
        ${showMobileLinks ? "translate-y-0 m-6" : "translate-y-full"} lg:hidden`}
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
