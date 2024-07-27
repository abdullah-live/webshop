import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';

const heroImages = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected items",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcwMjR8MHwxfGFsbHwxfHx8fHx8fHwxNjI3NzgyNzcy&ixlib=rb-1.2.1&q=80&w=1080"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Check out our latest collection",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcwMjR8MHwxfGFsbHwxfHx8fHx8fHwxNjI3NzgyODAw&ixlib=rb-1.2.1&q=80&w=1080"
  },
  {
    id: 3,
    title: "Limited Offer",
    subtitle: "Get a free gift with every purchase",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcwMjR8MHwxfGFsbHwxfHx8fHx8fHwxNjI3NzgyODQx&ixlib=rb-1.2.1&q=80&w=1080"
  }
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <Slider {...settings}>
        {heroImages.map((item) => (
          <Box key={item.id} sx={{ position: 'relative', height: '400px' }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '10px'
              }}
            >
              <Typography variant="h3">{item.title}</Typography>
              <Typography variant="h6">{item.subtitle}</Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Hero;
