import React from 'react';
import { motion } from 'framer-motion';

const EXPO_OUT = [0.16, 1, 0.3, 1];

/**
 * Subtle floating status chips that float around the right cards.
 * They communicate Bidzo's core product features without becoming extra cards.
 */
const chips = [
  { label: 'KYC VERIFIED ✓', delay: 0.9, x: -30, y: -14, accent: false },
  { label: '● AUCTION LIVE', delay: 1.05, x: 20, y: 8, accent: true },
  { label: 'ESCROW PROTECTED', delay: 1.18, x: -20, y: 26, accent: false },
];

const FloatingChips = () => {
  return (
    <div className="absolute right-4 bottom-[34%] hidden lg:block pointer-events-none" aria-hidden="true">
      {chips.map((chip) => (
        <motion.div
          key={chip.label}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.6, ease: EXPO_OUT, delay: chip.delay }}
          style={{ transform: `translate(${chip.x}px, ${chip.y}px)` }}
          className={[
            'inline-flex mb-1.5 items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest',
            chip.accent
              ? 'bg-lime-400/15 text-lime-300 border border-lime-400/20'
              : 'bg-white/8 text-white/60 border border-white/10',
          ].join(' ')}
        >
          {chip.label}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingChips;
