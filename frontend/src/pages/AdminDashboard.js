import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Card,
  CardContent,
  Rating,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    products: [],
    recentReviews: []
  });

  const navigate = useNavigate();

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const fetchDashboardStats = useCallback(async () => {
    try {
      const productsResponse = await productService.getAllProducts();
      const products = productsResponse.data;

      const reviewsResponse = await fetch('http://localhost:5000/api/reviews', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const reviewsData = await reviewsResponse.json();

      const productsWithStats = products.map(product => {
        const productReviews = reviewsData.filter(review => review.product_id === product.id);
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;
        
        return {
          ...product,
          reviewCount: productReviews.length,
          averageRating
        };
      });

      setStats({
        totalProducts: products.length,
        totalReviews: reviewsData.length,
        products: productsWithStats,
        recentReviews: reviewsData.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        ).slice(0, 10)
      });

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h5">
                {stats.totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Reviews
              </Typography>
              <Typography variant="h5">
                {stats.totalReviews}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Products Table */}
      <Paper sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Product Statistics
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Number of Reviews</TableCell>
              <TableCell>Average Rating</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.reviewCount}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={product.averageRating} 
                      precision={0.1} 
                      readOnly 
                    />
                    <Typography sx={{ ml: 1 }}>
                      ({product.averageRating.toFixed(1)})
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    onClick={() => handleViewDetails(product.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Recent Reviews Table */}
      <Paper>
        <Typography variant="h6" sx={{ p: 2 }}>
          Recent Reviews
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.recentReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.product_name}</TableCell>
                <TableCell>
                  <Rating value={review.rating} readOnly />
                </TableCell>
                <TableCell>{review.feedback}</TableCell>
                <TableCell>
                  {new Date(review.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
