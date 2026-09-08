import React from 'react';
import { motion } from 'framer-motion';
import SubpageLayout from '../components/SubpageLayout';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    step: '01',
    role: 'Bidder',
    color: '#a3e635',
    title: 'Register & Verify',
    desc: 'Create your account and complete identity verification. Load your wallet with funds to enable wallet-backed bidding.',
    actions: ['Sign up with email or Google', 'Complete KYC verification', 'Add funds to wallet'],
  },
  {
    step: '02',
    role: 'Bidder',
    color: '#a3e635',
    title: 'Discover & Watch',
    desc: 'Browse live and upcoming auctions. Filter by category, price range or seller rating. Add items to your watchlist.',
    actions: ['Search & filter auctions', 'Add to watchlist', 'Set bid alerts'],
  },
  {
    step: '03',
    role: 'Bidder',
    color: '#a3e635',
    title: 'Bid in Real Time',
    desc: 'Place manual bids or set automatic bid limits. Watch live bid synchronisation as other bidders compete.',
    actions: ['Manual or auto bidding', 'Live bid sync', 'Outbid notifications'],
  },
  {
    step: '01',
    role: 'Auctioneer',
    color: '#60a5fa',
    title: 'List Your Item',
    desc: 'Use the AI-powered listing assistant to create detailed product descriptions. Upload images via Cloudinary.',
    actions: ['AI listing assistant', 'Cloudinary image upload', 'Set reserve price'],
  },
  {
    step: '02',
    role: 'Auctioneer',
    color: '#60a5fa',
    title: 'Manage Auction',
    desc: 'Monitor live bidding activity, manage auction duration, and communicate with registered bidders.',
    actions: ['Live bid dashboard', 'Auction controls', 'Bidder communication'],
  },
  {
    step: '03',
    role: 'Auctioneer',
    color: '#60a5fa',
    title: 'Settle & Fulfil',
    desc: 'When auction closes, escrow-style settlement is triggered. Ship item with tracking and confirm delivery.',
    actions: ['Escrow settlement', 'Shipment tracking', 'Delivery confirmation'],
  },
];

const HowItWorksPage = ({ onNavigate }) => {
  return (
    <SubpageLayout
      onNavigate={onNavigate}
      title="How It Works"
      subtitle="Platform Workflow"
    >
      {/* Role legend */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.2 }}
        className="flex gap-4 mb-8"
      >
        {[['#a3e635', 'Bidder'], ['#60a5fa', 'Auctioneer']].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: color }} aria-hidden="true" />
            <span className="text-xs font-medium text-white/60">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {STEPS.map((s, i) => (
          <motion.div
            key={`${s.role}-${s.step}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.25 + i * 0.07 }}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "'Silkscreen',monospace", color: s.color, opacity: 0.6 }}>
                {s.step}
              </span>
              <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30`, color: s.color }}
              >
                {s.role}
              </span>
            </div>

            <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
            <p className="text-xs text-white/55 leading-relaxed mb-4">{s.desc}</p>

            <div className="space-y-1.5">
              {s.actions.map((a) => (
                <div key={a} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: s.color }} aria-hidden="true" />
                  <span className="text-[11px] text-white/60">{a}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="rounded-2xl p-5 mb-8"
        style={{ background: 'rgba(163,230,53,0.06)', border: '1px solid rgba(163,230,53,0.12)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-lime-400/70 mb-1">Super Admin</p>
        <p className="text-sm text-white/60 leading-relaxed">
          The Super Admin oversees KYC review and approval, resolves disputes raised by bidders or auctioneers,
          and has full platform analytics and user management access.
        </p>
      </motion.div>
    </SubpageLayout>
  );
};

export default HowItWorksPage;
