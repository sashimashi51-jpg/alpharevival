import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutEffect } from 'react';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import ClinicalStudy from './pages/ClinicalStudy';
import Navbar from './components/Navbar';
import FooterNew from './components/FooterNew';
import TimerBanner from './components/TimerBanner';

// Scroll to top wrapper
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
}

import CountdownBanner from './components/CountdownBanner';
import UspCarousel from './components/UspCarousel';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';


import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import Analytics from './components/Analytics';
import LiveChat from './components/LiveChat';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <TimerBanner />
      <UspCarousel />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/clinical-study" element={<ClinicalStudy />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/shipping" element={<LegalPage type="shipping" />} />
            <Route path="/return-refund" element={<LegalPage type="return-refund" />} />
            <Route path="/track" element={<LegalPage type="track" />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {/* Hide footer on checkout for cleaner flow? Or keep it. keeping for now */}
      <FooterNew />
      <CartDrawer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Wrapper>
          <Analytics />
          <LiveChat />
          <AppContent />
        </Wrapper>
      </BrowserRouter>
    </CartProvider>
  )
}


export default App
