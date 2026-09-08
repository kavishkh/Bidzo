import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const EmailCTA = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
        className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-5 py-3 text-sm text-white/75"
        role="status"
        aria-live="polite"
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0"
          style={{ background: 'rgba(163,230,53,0.2)' }}
          aria-hidden="true"
        >
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5l2 2 5-5" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        You're on the list. We'll be in touch.
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EXPO_OUT, delay: 0.48 }}
      onSubmit={handleSubmit}
      aria-label="Get early access to Bidzo"
      noValidate
      /* Mobile: stacked; sm+: inline pill */
      className="flex flex-col gap-3 sm:inline-flex sm:flex-row sm:items-center sm:rounded-full sm:bg-white sm:p-1.5"
    >
      <label htmlFor="hero-email" className="sr-only">
        Email address
      </label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoComplete="email"
        required
        /* Mobile: white card; sm+: transparent inside the pill */
        className={[
          /* Mobile */
          'rounded-full bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none',
          /* sm+ override */
          'sm:w-64 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-2 sm:text-gray-800 sm:placeholder-gray-400',
          'focus:outline-none',
        ].join(' ')}
        aria-label="Email address"
      />
      <button
        type="submit"
        className={[
          'flex-shrink-0 rounded-full px-6 py-3 sm:py-2.5',
          'text-sm font-medium text-white',
          'transition-opacity duration-200 hover:opacity-88',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        ].join(' ')}
        style={{ background: 'linear-gradient(to bottom, #2b2b2b, #101010)' }}
      >
        Start Bidding
      </button>
    </motion.form>
  );
};

export default EmailCTA;
