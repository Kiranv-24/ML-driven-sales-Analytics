import React, { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // ... existing useEffect and fetchCartCount functions ...

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-700 to-blue-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 transform hover:scale-105 transition-all duration-300">
            <h1 
              className="text-white text-3xl font-extrabold cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Feedback System
              </span>
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            {token ? (
              <>
                {role === 'admin' ? (
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => navigate('/admin')}
                      className="text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => navigate('/admin/orders')}
                      className="text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      Orders
                    </button>
                    <button 
                      onClick={() => navigate('/products')}
                      className="text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      Products
                    </button>
                    <button 
                      onClick={() => navigate('/admin/add-product')}
                      className="text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      Add Product
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => navigate('/products')}
                      className="text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      Products
                    </button>
                    <button 
                      onClick={() => navigate('/cart')}
                      className="text-white hover:bg-white/10 p-3 rounded-full transition-all duration-300 relative group"
                    >
                      <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white animate-pulse">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                  </div>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-white/50"
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