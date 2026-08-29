import React from 'react';
import { motion } from 'framer-motion';
import EmailCTA from './EmailCTA';
import StatsCard from './StatsCard';
import TrustCard from './TrustCard';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const entrance = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EXPO_OUT, delay },
});

const HeroContent = () => {
  return (
    /*
      mt-auto pins to bottom.
      On lg: side-by-side, items-end so both columns share the same baseline.
    */
    <main
      className="mt-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-6 px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16"
      aria-label="Hero content"
    >
      {/* ── LEFT ────────────────────────────────────────────────── */}
      <div className="flex flex-col max-w-xl">

        {/* Eyebrow */}
        <motion.div {...entrance(0.18, 16)}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime-400" style={{ animation: 'pulse-dot 1.4s ease-in-out infinite' }} aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/70">Live Auctions</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/50">Real-Time Bidding</span>
          </div>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <div aria-label="Bid. Watch. Win.">
          {['BID.', 'WATCH.', 'WIN.'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.22 + i * 0.09 }}
            >
              <h1
                className="block font-semibold leading-[1.0] tracking-tight text-[#010101] lg:text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
              >
                {word}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Supporting copy */}
        <motion.p
          {...entrance(0.5, 20)}
          className="mt-5 max-w-sm text-sm sm:text-base leading-relaxed text-white/70"
        >
          A secure, transparent auction marketplace built for real-time
          bidding, verified sellers and protected transactions.
        </motion.p>

        {/* Email CTA */}
        <div className="mt-6 sm:mt-7">
          <EmailCTA />
        </div>

        {/* Micro trust signals */}
        <motion.div {...entrance(0.65, 12)} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {['No credit card required', 'Wallet-backed bidding', 'Escrow settlement'].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-xs text-white/35">
              <span className="text-lime-400/60" aria-hidden="true">✓</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT — glass cards ────────────────────────────────── */}
      {/*
        On mobile/sm: row (side by side).
        On lg: column (stacked), each card fixed width.
        Cards sit at the bottom-right corner on desktop because
        the parent is items-end.
      */}
      <div
        className="flex flex-row gap-4 sm:gap-4 lg:flex-col lg:gap-4 lg:w-[17rem] flex-shrink-0"
        role="complementary"
        aria-label="Platform highlights"
      >
        <StatsCard />
        <TrustCard />
      </div>
    </main>
  );
};

export default HeroContent;
