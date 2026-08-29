import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import BidzoLogo from './BidzoLogo';

const NAV_LINKS = [
  { label: 'Auctions',     page: 'auctions' },
  { label: 'How It Works', page: 'how-it-works', hasChevron: true },
  { label: 'Security',     page: 'security' },
  { label: 'For Sellers',  page: 'sellers' },
];

const EXPO_OUT = [0.16, 1, 0.3, 1];

const Navbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && mobileOpen) closeMobile(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, closeMobile]);

  const handleNav = (page) => {
    closeMobile();
    if (onNavigate) onNavigate(page);
  };

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: EXPO_OUT, delay: 0.05 }}
        className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12"
        role="navigation"
        aria-label="Main navigation"
      >
        <BidzoLogo onClick={() => handleNav('home')} />

        {/* Desktop glass pill */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="flex items-center gap-1 rounded-full px-1.5 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.page)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
                {link.hasChevron && (
                  <ChevronDown size={14} className="text-white/50" aria-hidden="true" />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => handleNav('auctions')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ opacity: 0.88 }}
            className="flex items-center self-stretch rounded-full px-5 text-sm font-medium text-white cursor-pointer"
            style={{ background: 'linear-gradient(to bottom, #2b2b2b, #101010)' }}
          >
            Start Bidding
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative flex md:hidden h-10 w-10 items-center justify-center rounded-full z-50"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <Menu size={17} className="absolute text-white" style={{ transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'rotate(90deg) scale(0)' : 'scale(1)' }} aria-hidden="true" />
          <X    size={17} className="absolute text-white" style={{ transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? 'scale(1)' : 'rotate(-90deg) scale(0)' }} aria-hidden="true" />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none', transition: 'opacity 300ms ease' }}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed right-0 top-0 z-40 h-full w-72 flex flex-col md:hidden"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderLeft: '1px solid rgba(255,255,255,0.06)', transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="flex flex-col px-6 pt-24 gap-2">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.page)}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200 text-left w-full"
              style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? 'translateX(0)' : 'translateX(24px)', transition: `opacity 400ms cubic-bezier(0.16,1,0.3,1) ${(i+1)*60}ms, transform 400ms cubic-bezier(0.16,1,0.3,1) ${(i+1)*60}ms` }}
            >
              {link.label}
              {link.hasChevron && <ChevronDown size={15} className="text-white/35" aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div className="mx-6 mt-6" style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        <div className="mt-auto px-6 pb-10" style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1) 300ms, transform 400ms cubic-bezier(0.16,1,0.3,1) 300ms' }}>
          <button
            onClick={() => handleNav('auctions')}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-white hover:opacity-85 transition-opacity"
            style={{ background: 'linear-gradient(to bottom, #2b2b2b, #101010)' }}
          >
            START BIDDING →
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
