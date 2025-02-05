import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { cartService } from "../services/api";
import techIcon from '../assets/icons/tech.png';
import dashboardIcon from '../assets/icons/dashboard.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const adminMenuItems = [
    { 
      label: "Dashboard", 
      path: "/admin",
      icon: <img src={dashboardIcon} alt="Dashboard" className="w-4 h-4 object-contain" />
    },
    { label: "Orders", path: "/admin/orders" },
    { label: "Products", path: "/products" },
    { label: "Add Product", path: "/admin/add-product" },
    { 
      label: "Logout", 
      path: null, 
      action: handleLogout,
      icon: <LogoutIcon className="w-4 h-4" />,
      className: "text-red-600 hover:bg-red-50"
    }
  ];

  return (
    <nav className="bg-[#5C7285] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2 flex-shrink-0 transform hover:scale-105 transition-all duration-300">
            <img 
              src={techIcon} 
              alt="Tech Icon" 
              className="h-10 w-10 object-contain"
            />
            <h1
              className="text-white text-3xl font-extrabold cursor-pointer font-[IBM Plex Mono]"
              onClick={() => navigate("/")}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 hover:italic transition-all duration-300">
                TechMart
              </span>
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            {token ? (
              <>
                {role === "admin" ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                      className="bg-white text-[#5C7285] hover:text-white hover:bg-[#4A5B69] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border border-gray-200 hover:border-white/40 hover:scale-105 flex items-center space-x-2"
                    >
     
                      <span>Admin Menu</span>
                      {isAdminMenuOpen ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {isAdminMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1">
                          {adminMenuItems.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => {
                                if (item.action) {
                                  item.action();
                                } else {
                                  navigate(item.path);
                                }
                                setIsAdminMenuOpen(false);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#5C7285] transition-all duration-300 flex items-center space-x-2 ${item.className || ''}`}
                            >
                              {item.icon && <span>{item.icon}</span>}
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => navigate("/products")}
                      className="bg-white/10 text-white hover:bg-white hover:text-[#5C7285] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border border-white/30 hover:border-white"
                    >
                      Products
                    </button>
                    <button
                      onClick={() => navigate("/cart")}
                      className="text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 relative group"
                    >
                      <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white animate-pulse">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-white text-[#5C7285] hover:bg-red-600 hover:text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white/10 text-white hover:bg-white hover:text-[#5C7285] px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border border-white/30 hover:border-white"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-white text-[#5C7285] hover:bg-gray-100 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-white/30"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
