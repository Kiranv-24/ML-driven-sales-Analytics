import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Rating,
  Container,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductStatistics = () => {
  const [stats, setStats] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch products with their reviews
        const productsResponse = await axios.get('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const reviewsResponse = await axios.get('http://localhost:5000/api/reviews', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Process and combine the data
        const products = productsResponse.data.map(product => {
          const productReviews = reviewsResponse.data.filter(
            review => review.product_id === product.id
          );
          
          const reviewCount = productReviews.length;
          const averageRating = reviewCount > 0
            ? productReviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
            : 0;

          return {
            id: product.id,
            name: product.name,
            price: product.price,
            reviewCount,
            averageRating
          };
        });

        setStats({ products });
        setError(null);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load product statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8 flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="text-[#333333] font-bold mb-6">
        Product Statistics
      </Typography>
      
      {stats.products.length === 0 ? (
        <Alert severity="info">No products found</Alert>
      ) : (
        <div className="bg-white rounded-xl shadow-xl mb-8 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full table-auto">
              <TableHead className="bg-[#D3D3D3]">
                <TableRow>
                  <TableCell className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Product Name</TableCell>
                  <TableCell className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Reviews</TableCell>
                  <TableCell className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Rating</TableCell>
                  <TableCell className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Price</TableCell>
                  <TableCell className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y divide-gray-200">
                {stats.products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="px-6 py-4 text-sm text-[#333333]">{product.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{product.reviewCount}</TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Rating value={product.averageRating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" className="text-gray-600">
                          ({product.averageRating.toFixed(1)})
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">₹{product.price}</TableCell>
                    <TableCell className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(product.id)}
                        className="bg-white text-[#000000] hover:text-white hover:bg-[#5C7285] px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-300 border border-gray-200 hover:border-white/40 hover:scale-105"
                      >
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductStatistics; 