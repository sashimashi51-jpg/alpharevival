import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutEffect } from 'react';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import ClinicalStudy from './pages/ClinicalStudy';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import AdvertorialBfcm from './pages/AdvertorialBfcm';
import TeeestPage from './pages/TeeestPage';
import JournalTemplate from './pages/JournalTemplate';
import Navbar from './components/Navbar';
import FooterNew from './components/FooterNew';
import RealSaleBanner from './components/RealSaleBanner';


// Scroll to top wrapper
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
}


import UspCarousel from './components/UspCarousel';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';


import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import TrackingPage from './pages/TrackingPage';
import Analytics from './components/Analytics';
import LiveChat from './components/LiveChat';

function AppContent() {
  const location = useLocation();

  // Check if we're on an advertorial page (no main layout)
  const isAdvertorialPage = location.pathname === '/bfcm-high-ticket-presell' || location.pathname === '/teeest';

  // For advertorial pages, render without main site navigation
  if (isAdvertorialPage) {
    return (
      <>
        <Routes location={location} key={location.pathname}>
          <Route path="/bfcm-high-ticket-presell" element={<AdvertorialBfcm />} />
          <Route path="/teeest" element={<TeeestPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <RealSaleBanner />
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
            <Route path="/journal" element={<BlogIndex />} />
            <Route path="/journal/microneedling-hair-regrowth-protocol" element={<JournalTemplate />} />
            <Route path="/journal/:slug" element={<BlogPost />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/shipping" element={<LegalPage type="shipping" />} />
            <Route path="/return-refund" element={<LegalPage type="return-refund" />} />
            <Route path="/track" element={<TrackingPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {location.pathname !== '/checkout' && <FooterNew />}
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
