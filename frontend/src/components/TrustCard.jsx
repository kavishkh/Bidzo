import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const useCountdown = (initial) => {
  const [secs, setSecs] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : initial)), 1000);
    return () => clearInterval(id);
  }, [initial]);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return `00:${mm}:${ss}`;
};

const useLiveBid = (start = 124500) => {
  const [bid, setBid] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setBid((b) => b + Math.floor(Math.random() * 2200 + 300)), 4100);
    return () => clearInterval(id);
  }, []);
  return bid;
};

const Badge = ({ label }) => (
  <div className="flex items-center gap-2">
    <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(163,230,53,0.15)' }} aria-hidden="true">
      <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
        <path d="M1 2.5l1.5 1.5L6 1" stroke="#a3e635" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75">{label}</span>
  </div>
);

const TrustCard = () => {
  const timer = useCountdown(107);
  const liveBid = useLiveBid(124500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.66 }}
      className="flex-1 lg:flex-none lg:w-full rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      role="region"
      aria-label="Bidzo trust and security"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-[4px] flex-shrink-0" style={{ background: 'linear-gradient(135deg,#2a2a2a,#0e0e0e)' }} aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <rect x="1" y="1" width="9" height="9" rx="2" stroke="white" strokeWidth="1"/>
            <path d="M5.5 7.5V4M4 5.5l1.5-1.5L7 5.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xs font-semibold tracking-tight text-white">BIDZO</span>
        <div className="ml-auto flex items-center gap-1 rounded-full px-1.5 py-0.5" style={{ background: 'rgba(163,230,53,0.08)', border: '1px solid rgba(163,230,53,0.15)' }}>
          <span className="h-1 w-1 rounded-full bg-lime-400" style={{ animation: 'pulse-dot 1.4s ease-in-out infinite' }} aria-hidden="true" />
          <span className="text-[8px] font-bold uppercase tracking-widest text-lime-400">Trust</span>
        </div>
      </div>

      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Badges */}
      <div className="space-y-2">
        <Badge label="KYC Verified" />
        <Badge label="Wallet-Backed Bids" />
        <Badge label="Escrow Protected" />
      </div>

      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Live auction mini-UI */}
      <div
        className="rounded-xl p-3"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        role="status"
        aria-live="polite"
        aria-label="Live auction"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" style={{ animation: 'pulse-dot 1.2s ease-in-out infinite' }} aria-hidden="true" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-lime-400">Live</span>
          </div>
          <span className="font-mono text-[9px] tabular-nums text-white/35">{timer}</span>
        </div>
        <p className="text-[11px] font-medium text-white/65 mb-2">Sony Alpha A7 IV</p>
        <div className="flex items-end justify-between mb-2.5">
          <div>
            <p className="text-[8px] uppercase tracking-widest text-white/35 mb-0.5">Current Bid</p>
            <motion.p
              key={liveBid}
              initial={{ y: 4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="font-semibold text-white tabular-nums"
              style={{ fontFamily: "'Silkscreen',monospace", fontSize: '0.7rem' }}
            >
              {formatINR(liveBid)}
            </motion.p>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-widest text-white/35 mb-0.5">Bids</p>
            <p className="text-[11px] font-semibold text-white/60">23</p>
          </div>
        </div>
        <button
          className="w-full rounded-lg py-1.5 text-[9px] font-bold uppercase tracking-widest text-white/70 hover:opacity-75 transition-opacity"
          style={{ background: 'linear-gradient(to bottom,#252525,#0d0d0d)' }}
          aria-label="Place bid"
        >
          Place Bid
        </button>
      </div>

      <p className="text-[10px] leading-relaxed text-white/40">
        Verified sellers, wallet-backed bidding and escrow-style settlement protect all participants.
      </p>
    </motion.div>
  );
};

export default TrustCard;
