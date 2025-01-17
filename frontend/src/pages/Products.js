import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Snackbar,
  IconButton
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import ProductReview from '../components/ProductReview';
import { productService } from '../services/api';
import { cartService } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartService.addToCart({
        productId,
        quantity: 1
      });
      // Force navbar to update cart count
      window.dispatchEvent(new CustomEvent('cart-updated'));
      // Show success message
      setMessage('Product added to cart');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Error adding to cart');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {role === 'admin' && (
        <Button
          component={Link}
          to="/admin/add-product"
          variant="contained"
          sx={{ mb: 3 }}
        >
          Add New Product
        </Button>
      )}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image_url || 'https://via.placeholder.com/140'}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {product.quantity}
                </Typography>

                {role === 'admin' ? (
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ mr: 1 }}
                      component={Link}
                      to={`/admin/edit-product/${product.id}`}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => setSelectedProduct(product.id)}
                    >
                      Add Review
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.quantity === 0}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                )}

                {selectedProduct === product.id && role === 'customer' && (
                  <ProductReview 
                    productId={product.id} 
                    onReviewSubmitted={() => setSelectedProduct(null)}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={message}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            ×
          </IconButton>
        }
      />
    </Box>
  );
};

export default Products; 