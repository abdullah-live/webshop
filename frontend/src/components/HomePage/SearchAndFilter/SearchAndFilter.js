import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Slider, Button, Typography, Grid } from '@mui/material';

const SearchAndFilter = ({ categories, onSearch, onFilter, setSortOption,sortOption }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilter = () => {
    onFilter({ category: selectedCategory, priceRange, sortOption });
  };

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Grid container justifyContent={"space-around"}>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            boxShadow: 3,
            marginBottom: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Search and Filter
          </Typography>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
              Search
            </Button>
            <Button variant="contained" color="secondary" onClick={handleFilter} fullWidth>
              Filter
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="sort-options-label">Sort By</InputLabel>
            <Select
              labelId="sort-options-label"
              id="sort-options"
              value={sortOption}
              label="Sort By"
              onChange={handleChange}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
              <MenuItem value="lowToHigh">Lowest Price to Highest</MenuItem>
              <MenuItem value="highToLow">Highest Price to Lowest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchAndFilter;
