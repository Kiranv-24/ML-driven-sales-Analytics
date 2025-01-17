import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge,
  Box 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchCartCount();
      // Listen for cart updates
      window.addEventListener('cart-updated', fetchCartCount);
      return () => {
        window.removeEventListener('cart-updated', fetchCartCount);
      };
    }
  }, [token]);

  const fetchCartCount = async () => {
    try {
      const response = await cartService.getCart();
      setCartItemCount(response.data.length);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Feedback System
        </Typography>
        
        {token ? (
          <>
            {role === 'admin' ? (
              <>
                <Button color="inherit" onClick={() => navigate('/admin')}>Dashboard</Button>
                <Button color="inherit" onClick={() => navigate('/admin/orders')}>Orders</Button>
                <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
                <Button color="inherit" onClick={() => navigate('/admin/add-product')}>Add Product</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
                <IconButton 
                  color="inherit" 
                  onClick={() => navigate('/cart')}
                  sx={{ mr: 2 }}
                >
                  <Badge badgeContent={cartItemCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
