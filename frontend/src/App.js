import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Header from './components/HomePage/Header/Header';
import Banner from './components/HomePage/Banner/Banner';
import Footer from './components/HomePage/Footer/Footer';
import ProductDetails from './components/HomePage/ProductDetails/ProductDetails';
import ContactForm from './components/Contact/Contact';
import Cart from './components/Cart/Cart'; // Import the Cart component
import Payment from './components/Payment/Payment'; // Import the Payment component
import PaymentSuccess from './components/Payment/paymentSuccess';

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const handleBannerClose = () => {
    setBannerVisible(false);
  };

  return (
    <Router>
      {bannerVisible && (
        <Banner message="Free shipping on orders over $50!" onClose={handleBannerClose} />
      )}
      <Header bannerVisible={bannerVisible} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* Add the Cart route */}
        <Route path="/payment" element={<Payment />} /> {/* Add the Payment route */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <ContactForm />
      <Footer />
    </Router>
  );
}

export default App;
