import React from 'react';

const BidzoMark = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 17V9M9 12l3-3 3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="7" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BidzoLogo = ({ dark = false, onClick }) => {
  const color = dark ? 'text-[#010101]' : 'text-white';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 select-none bg-transparent border-0 cursor-pointer p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm ${color}`}
      aria-label="Bidzo — Home"
    >
      <BidzoMark className={color} />
      <span
        className={`text-lg font-semibold tracking-tight ${color}`}
        style={{ fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        bidzo
      </span>
    </button>
  );
};

export default BidzoLogo;
