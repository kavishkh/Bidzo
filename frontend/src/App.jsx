import React, { useState } from 'react';
import Hero from './components/Hero';
import AuctionsPage from './pages/AuctionsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SecurityPage from './pages/SecurityPage';
import ForSellersPage from './pages/ForSellersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

/**
 * App — client-side "routing" without react-router.
 * The Navbar calls onNavigate(page) to switch pages.
 * Pages: 'home' | 'auctions' | 'how-it-works' | 'security' | 'sellers' | 'login' | 'register'
 */
const App = () => {
  const [page, setPage] = useState('home');

  const navigate = (p) => setPage(p);

  return (
    <AuthProvider>
      <div
        className="h-screen w-full overflow-hidden bg-[#010101]"
        style={{ fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        {page === 'home'         && <Hero onNavigate={navigate} />}
        {page === 'auctions'     && <AuctionsPage onNavigate={navigate} />}
        {page === 'how-it-works' && <HowItWorksPage onNavigate={navigate} />}
        {page === 'security'     && <SecurityPage onNavigate={navigate} />}
        {page === 'sellers'      && <ForSellersPage onNavigate={navigate} />}
        {page === 'login'        && <LoginPage onNavigate={navigate} />}
        {page === 'register'     && <RegisterPage onNavigate={navigate} />}
      </div>
    </AuthProvider>
  );
};

export default App;
