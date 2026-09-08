import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SubpageLayout from '../components/SubpageLayout';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const BENEFITS = [
  {
    icon: '🤖',
    title: 'AI Listing Assistant',
    desc: 'Powered by Google Gemini API. Describe your item and the AI generates a detailed, optimised auction listing — title, description, category and suggested reserve price.',
    tag: 'AI Powered',
    color: '#a3e635',
  },
  {
    icon: '📸',
    title: 'Easy Image Upload',
    desc: 'Upload multiple high-quality product images via Cloudinary. Images are optimised and hosted securely with CDN delivery for fast loading.',
    tag: 'Cloudinary CDN',
    color: '#60a5fa',
  },
  {
    icon: '📊',
    title: 'Live Bid Dashboard',
    desc: 'Watch your auction in real time. See every bid as it lands, track your reserve price progress, and monitor time remaining with live synchronisation.',
    tag: 'Real-Time',
    color: '#f59e0b',
  },
  {
    icon: '🔒',
    title: 'Guaranteed Payment',
    desc: 'Winning bids are backed by verified wallets. Funds are held in escrow and released to you automatically on delivery confirmation — zero payment risk.',
    tag: 'Escrow Protected',
    color: '#34d399',
  },
  {
    icon: '🚚',
    title: 'Fulfilment Tracking',
    desc: 'Upload your shipment tracking number directly on the platform. Buyers track delivery in real time. Escrow releases automatically on confirmed delivery.',
    tag: 'Logistics',
    color: '#a78bfa',
  },
  {
    icon: '⭐',
    title: 'Seller Reputation',
    desc: 'Build your seller profile with each successful auction. KYC verification and a history of successful transactions build buyer confidence.',
    tag: 'Trust Score',
    color: '#f87171',
  },
];

const STEPS = [
  { n: '01', label: 'Apply for KYC', desc: 'Submit identity documents. Super Admin reviews and approves your seller account.' },
  { n: '02', label: 'Create a Listing', desc: 'Use the AI assistant or manual form. Upload images, set reserve price and auction duration.' },
  { n: '03', label: 'Go Live', desc: 'Your auction is published. Verified bidders with wallet-backed funds compete in real time.' },
  { n: '04', label: 'Collect Payment', desc: 'Escrow releases funds to your account when the buyer confirms delivery. Zero risk.' },
];

const ForSellersPage = ({ onNavigate }) => {
  return (
    <SubpageLayout
      onNavigate={onNavigate}
      title="Sell on Bidzo"
      subtitle="For Auctioneers"
    >
      {/* Hero tagline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.2 }}
        className="max-w-xl text-sm text-white/55 leading-relaxed mb-8"
      >
        Reach a network of verified, wallet-backed bidders. List in minutes with AI assistance.
        Get paid securely through escrow-style settlement.
      </motion.p>

      {/* 4-step process */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EXPO_OUT, delay: 0.28 }}
        className="rounded-2xl p-5 mb-6"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">How to Get Started</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex flex-col">
              <span className="text-2xl font-normal text-white/20 mb-2 leading-none" style={{ fontFamily: "'Silkscreen',monospace" }}>{s.n}</span>
              <p className="text-xs font-semibold text-white mb-1">{s.label}</p>
              <p className="text-[11px] text-white/45 leading-snug">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute" style={{ top: '50%', right: '-10px' }} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.35 + i * 0.07 }}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xl" aria-hidden="true">{b.icon}</span>
              <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                style={{ background: `${b.color}15`, border: `1px solid ${b.color}25`, color: b.color }}
              >
                {b.tag}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">{b.title}</h3>
            <p className="text-xs text-white/50 leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.9 }}
        className="rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: 'rgba(163,230,53,0.07)', border: '1px solid rgba(163,230,53,0.15)' }}
      >
        <div>
          <p className="text-sm font-semibold text-white mb-1">Ready to start selling?</p>
          <p className="text-xs text-white/50">Apply for KYC verification and list your first auction today.</p>
        </div>
        <button
          className="flex-shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold text-white hover:opacity-85 transition-opacity"
          style={{ background: 'linear-gradient(to bottom, #2b2b2b, #101010)' }}
        >
          Apply as Seller →
        </button>
      </motion.div>
    </SubpageLayout>
  );
};

export default ForSellersPage;
