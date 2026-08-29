import React from 'react';
import { motion } from 'framer-motion';
import SubpageLayout from '../components/SubpageLayout';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    icon: '🔐',
    title: 'KYC Verification',
    badge: 'Identity',
    color: '#a3e635',
    desc: 'Every auctioneer undergoes KYC verification reviewed by the Super Admin before they can list any item. Bidders are protected from unverified sellers.',
    points: ['Government ID check', 'Super Admin review & approval', 'Verified seller badge displayed', 'KYC status visible to all bidders'],
  },
  {
    icon: '💰',
    title: 'Wallet-Backed Bidding',
    badge: 'Financial',
    color: '#60a5fa',
    desc: 'All bids are backed by wallet funds held in the platform. You cannot bid more than your wallet balance, eliminating phantom bids.',
    points: ['Pre-funded wallet required', 'Funds reserved on bid placement', 'Instant bid validation', 'Automatic refund if outbid'],
  },
  {
    icon: '🔒',
    title: 'Escrow Settlement',
    badge: 'Transaction',
    color: '#f59e0b',
    desc: 'Winning bid funds are held in escrow until the buyer confirms delivery. Sellers receive payment only after successful delivery confirmation.',
    points: ['Funds held on auction close', 'Released on delivery confirmation', 'Dispute window protected', 'Automatic timeout release'],
  },
  {
    icon: '🛡️',
    title: 'JWT Authentication',
    badge: 'Auth',
    color: '#a78bfa',
    desc: 'Secure stateless authentication using JSON Web Tokens. Google Identity Services integration for OAuth 2.0 sign-in.',
    points: ['JWT access tokens', 'Google OAuth 2.0', 'Secure HTTP-only cookies', 'Token expiry & refresh'],
  },
  {
    icon: '⚖️',
    title: 'Dispute Workflow',
    badge: 'Resolution',
    color: '#f87171',
    desc: 'Structured dispute resolution managed by the Super Admin. Buyers and sellers can raise disputes within the protected window.',
    points: ['Raise dispute within 72 hours', 'Evidence upload supported', 'Super Admin arbitration', 'Escrow held during dispute'],
  },
  {
    icon: '📦',
    title: 'Fulfilment Tracking',
    badge: 'Delivery',
    color: '#34d399',
    desc: 'End-to-end shipment tracking from seller dispatch to buyer delivery confirmation. Every step recorded on the platform.',
    points: ['Seller uploads tracking number', 'Real-time shipment status', 'Buyer delivery confirmation', 'Automatic escrow release'],
  },
];

const SecurityPage = ({ onNavigate }) => {
  return (
    <SubpageLayout
      onNavigate={onNavigate}
      title="Security & Trust"
      subtitle="Protected by Design"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.2 }}
        className="max-w-2xl text-sm text-white/55 leading-relaxed mb-8"
      >
        Bidzo is built trust-first. Every financial interaction is protected by wallet verification,
        escrow settlement and identity checks — so you can bid and sell with full confidence.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.28 + i * 0.07 }}
            className="rounded-2xl p-5 group hover:border-white/20 transition-colors duration-300"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl" aria-hidden="true">{f.icon}</span>
              <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}25`, color: f.color }}
              >
                {f.badge}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">{f.desc}</p>
            <div className="space-y-1.5">
              {f.points.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: f.color }} aria-hidden="true" />
                  <span className="text-[11px] text-white/55">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SubpageLayout>
  );
};

export default SecurityPage;
