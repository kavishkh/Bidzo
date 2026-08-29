import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const EXPO_OUT = [0.16, 1, 0.3, 1];

/**
 * Shared layout for all subpages.
 * Same video background, same navbar — just different content.
 */
const SubpageLayout = ({ onNavigate, children, title, subtitle }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#010101]">
      {/* Background video — same as hero */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay loop muted playsInline
          style={{ opacity: 0.45 }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
            type="video/mp4"
          />
        </video>
        {/* Stronger overlay for readability on subpages */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(1,1,1,0.65) 0%, rgba(1,1,1,0.75) 100%)' }} />
      </div>

      <div className="relative z-10 flex h-full flex-col overflow-y-auto">
        <Navbar onNavigate={onNavigate} />

        {/* Page heading */}
        <div className="px-5 pt-6 pb-8 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.1 }}
          >
            {subtitle && (
              <p className="text-xs font-semibold uppercase tracking-widest text-lime-400/80 mb-2">{subtitle}</p>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              {title}
            </h2>
          </motion.div>
        </div>

        {/* Page content */}
        <div className="flex-1 px-5 pb-12 sm:px-8 lg:px-12 overflow-y-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SubpageLayout;
