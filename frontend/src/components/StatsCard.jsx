import React from 'react';
import { motion } from 'framer-motion';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const roles = [
  { name: 'Bidder',      desc: 'Browse, bid & track wins' },
  { name: 'Auctioneer',  desc: 'List, manage & settle' },
  { name: 'Super Admin', desc: 'Platform oversight' },
];

const StatsCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 28, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.85, ease: EXPO_OUT, delay: 0.52 }}
    className="flex-1 lg:flex-none lg:w-full rounded-2xl p-4 sm:p-5 flex flex-col"
    style={{
      background: 'rgba(255,255,255,0.07)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}
    role="region"
    aria-label="Platform role statistics"
  >
    {/* Big stat */}
    <div className="flex items-baseline gap-2 mb-1">
      <span
        className="text-[2.2rem] font-normal leading-none tracking-tighter text-white"
        style={{ fontFamily: "'Silkscreen', monospace" }}
        aria-label="3 roles"
      >
        3
      </span>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40 leading-none">Roles</p>
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25 leading-none mt-0.5">on platform</p>
      </div>
    </div>

    <p className="text-[11px] text-white/50 mb-3 leading-snug">
      Three role-based experiences with clearly defined permissions and workflows.
    </p>

    <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.08)' }} />

    <div className="space-y-2.5">
      {roles.map(({ name, desc }) => (
        <div key={name} className="flex items-start gap-2">
          <span className="mt-[4px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime-400/70" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold text-white leading-none">{name}</p>
            <p className="text-[10px] text-white/45 leading-snug mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-3 pt-2.5 border-t border-white/[0.07]">
      <span className="text-[9px] text-white/25">Powered by React · Node.js · MongoDB</span>
    </div>
  </motion.div>
);

export default StatsCard;
