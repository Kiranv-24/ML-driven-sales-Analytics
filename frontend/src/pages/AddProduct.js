import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Snackbar, 
  CardMedia 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate price
      const numericPrice = parseFloat(product.price);
      if (isNaN(numericPrice) || numericPrice <= 0 || numericPrice > 999999.99) {
        setError('Price must be between 0 and 999,999.99');
        return;
      }

      // Validate quantity
      const numericQuantity = parseInt(product.quantity);
      if (isNaN(numericQuantity) || numericQuantity < 0) {
        setError('Quantity must be 0 or greater');
        return;
      }

      const formData = new FormData();
      formData.append('name', String(product.name).trim());
      formData.append('description', String(product.description).trim());
      formData.append('price', numericPrice.toFixed(2));
      formData.append('quantity', numericQuantity);
      
      if (selectedFile) {
        formData.append('imageUrl', selectedFile);
      }

      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Product added successfully');
      setOpen(true);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.response?.data?.message || 'Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Add New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              inputProps: { min: 0 }
            }}
          />
          
          <Button
            component="label"
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            fullWidth
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          
          {previewImage && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Image Preview:
              </Typography>
              <CardMedia
                component="img"
                height="200"
                image={previewImage}
                alt="Product preview"
                sx={{ 
                  objectFit: 'cover',
                  borderRadius: 1,
                  border: '1px solid #ddd'
                }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </Container>
  );
};

export default AddProduct;
