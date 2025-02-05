import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableHead, TableRow, Rating, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import statisticsIcon from '../assets/icons/statistics.png';
import mostrecentIcon from '../assets/icons/most-recent.png';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    totalOrders: 0,
    products: [],
    recentReviews: []
  });

  const navigate = useNavigate();

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const fetchDashboardStats = useCallback(async () => {
    try {
      // Fetch products
      const productsResponse = await axios.get('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Fetch reviews
      const reviewsResponse = await axios.get('http://localhost:5000/api/reviews', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Fetch orders
      const ordersResponse = await axios.get('http://localhost:5000/api/orders/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setStats({
        totalProducts: productsResponse.data.length,
        totalReviews: reviewsResponse.data.length,
        totalOrders: ordersResponse.data.length,
        products: productsResponse.data,
        recentReviews: reviewsResponse.data
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8" style={{ backgroundColor: '#E8E8E8 ' }}>
      <div className="max-w-7xl mx-auto">
      <Typography 
        variant="h3" 
        className="text-[#000000] font-bold mb-8"
        sx={{
          fontFamily: '"Lugrasimo", serif',
          fontWeight: 400,
          fontStyle: 'normal'
        }}
      >
        Admin Dashboard
      </Typography>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Paper elevation={4} className="bg-gradient-to-br from-[#A7B49E] rounded-xl shadow-xl p-6 text-black hover:scale-105 transition-all duration-300">
            <Typography variant="body2" className="text-black font-semibold mb-2">Total Products</Typography>
            <Typography variant="h4" className="font-bold text-black">{stats.totalProducts}</Typography>
          </Paper>
          <Paper elevation={4} className="bg-gradient-to-br from-[#A7B49E] rounded-xl shadow-xl p-6 text-black hover:scale-105 transition-all duration-300">
            <Typography variant="body2" className="text-black font-semibold mb-2">Total Reviews</Typography>
            <Typography variant="h4" className="font-bold text-black">{stats.totalReviews}</Typography>
          </Paper>
          <Paper elevation={4} className="bg-gradient-to-br from-[#A7B49E] rounded-xl shadow-xl p-6 text-black hover:scale-105 transition-all duration-300">
            <Typography variant="body2" className="text-black font-semibold mb-2">Total Orders</Typography>
            <Typography variant="h4" className="font-bold text-black">{stats.totalOrders}</Typography>
          </Paper>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Product Statistics Card */}
          <Paper 
            elevation={4} 
            className="bg-white rounded-xl shadow-xl p-6 transition-all duration-300 cursor-default"
          >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 ml-auto mr-auto">
                <img
                src={statisticsIcon}
                alt="Review Analysis"
                className="h-8 w-8 object-contain mr-2"
            />
              </div>
            <Typography variant="h6" className="text-[#333333] font-semibold mb-2 text-center">
              Product Statistics
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4 text-center">
              View detailed statistics and performance metrics for all products
            </Typography>
            <div className="flex justify-center items-center">
            <button
              className="bg-white text-[#000000] hover:text-white hover:bg-[#5C7285] px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-gray-200 hover:border-white/40 hover:scale-105"
              onClick={() => navigate('/admin/product-statistics')}
            >
              View Statistics
            </button>
            </div>

          </Paper>

          {/* Recent Reviews Card */}
          <Paper 
            elevation={4} 
            className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            
          >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 ml-auto mr-auto">
                <img
                src={mostrecentIcon}
                alt="Review Analysis"
                className="h-8 w-8 object-contain"
            />
              </div>
            <Typography variant="h6" className="text-[#333333] font-semibold mb-2 text-center">
              Recent Reviews
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4 text-center">
              Monitor the latest customer reviews and feedback
            </Typography>
            <div className="flex justify-center items-center">
              <button
              className="bg-white text-[#000000] hover:text-white hover:bg-[#5C7285] px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-gray-200 hover:border-white/40 hover:scale-105"
              onClick={() => navigate('/admin/recent-reviews')}
              >
                  View Reviews
              </button>
            </div>
           
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
