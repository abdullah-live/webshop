import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero/Hero';
import SearchAndFilter from './SearchAndFilter/SearchAndFilter';
import { fetchProducts } from '../../redux/slices/productSlice';
import { fetchCategories } from '../../redux/slices/categorySlice'; // Import the category thunk

const truncateText = (text, length) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status, error } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
    dispatch(fetchCategories()); // Fetch categories when the component mounts
  }, [status, dispatch]);

  useEffect(() => {
    handleFilter({ category: '', priceRange: [0, 1000], sortOption });
  }, [products, sortOption]);

  const handleSearch = (searchTerm) => {
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleFilter = (filters) => {
    const { category, priceRange, sortOption } = filters;
    let filtered = products.filter(product => {
      return (category === '' || product.category === category) &&
             (product.price >= priceRange[0] && product.price <= priceRange[1]);
    });

    if (sortOption) {
      filtered = filtered.sort((a, b) => {
        if (sortOption === 'asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortOption === 'desc') {
          return b.name.localeCompare(a.name);
        }
        if (sortOption === 'lowToHigh') {
          return a.price - b.price;
        }
        if (sortOption === 'highToLow') {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Container style={{ marginTop: '100px' }}>
      <Hero />
      <Box sx={{ width: "100%" }}>
        <SearchAndFilter
          categories={categories} // Pass the categories array to the component
          onSearch={handleSearch}
          onFilter={handleFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </Box>
      <Grid container spacing={4}>
        {filteredProducts.length === 0 ? (
          <Typography variant="h6">No products available</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Paper elevation={3} style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <img
                  src={product.images[0]} // Display the first image
                  alt={product.name}
                  style={{ width: '100%', marginBottom: '15px' }}
                />
                <Typography variant="h6">{product.name}</Typography>
                <Box sx={{ 
                  padding: '10px', 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '5px', 
                  display: 'inline-block', 
                  marginBottom: '15px',
                  width:"200px"
                }}>
                  <Typography variant="h6" component="span" color="primary">${product.price.toFixed(2)}</Typography>
                </Box>
                <Typography variant="body2" dangerouslySetInnerHTML={{ __html: truncateText(product.description, 150) }}></Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate(`/product/${product._id}`)}
                  style={{ marginTop: '15px' }}
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
