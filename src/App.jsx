import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import FooterNew from './components/FooterNew';
import TimerBanner from './components/TimerBanner';

// Eager load critical pages
import LandingPage from './pages/LandingPage';

// Lazy load other pages
const ProductPage = lazy(() => import('./pages/ProductPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ClinicalStudy = lazy(() => import('./pages/ClinicalStudy'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const JournalTemplate = lazy(() => import('./pages/JournalTemplate'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const TrackingPage = lazy(() => import('./pages/TrackingPage'));
const LiveChat = lazy(() => import('./components/LiveChat'));

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
import Analytics from './components/Analytics';

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-orange-600 rounded-full animate-spin"></div>
  </div>
);

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
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
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
          <Suspense fallback={null}>
            <LiveChat />
          </Suspense>
          <AppContent />
        </Wrapper>
      </BrowserRouter>
    </CartProvider>
  )
}


export default App
