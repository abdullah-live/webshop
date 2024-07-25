import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ bannerVisible }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cartItemsCount = useSelector(state => state.cart.totalQuantity);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {['Home', 'Products', 'About', 'Contact'].map((text) => (
          <ListItem button key={text} component={Link} to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#3f51b5', top: bannerVisible ? '40px' : '0' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography component={Link} to="/" variant="h6" style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
            Webshop
          </Typography>
          {!isMobile && (
            <Box display="flex" alignItems="center">
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/">
                Products
              </Button>
              <a href="#footer">
                <Button sx={{ color: 'white', textDecoration: 'none' }} color="inherit">
                  About
                </Button>
              </a>
              <a href="#contact" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">
                  Contact
                </Button>
              </a>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartItemsCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Box>
          )}
          {isMobile && (
            <>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartItemsCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
      {bannerVisible && <div style={{ height: '40px' }} />} {/* Spacer for Banner */}
    </>
  );
};

export default Header;
