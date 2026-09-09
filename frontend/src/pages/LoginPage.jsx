import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SubpageLayout from '../components/SubpageLayout';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      onNavigate('home');
    } else {
      setError(result.error || 'Failed to log in');
    }
    
    setLoading(false);
  };

  return (
    <SubpageLayout
      onNavigate={onNavigate}
      title="Welcome Back"
      subtitle="● Login to Bidzo"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="max-w-md mx-auto w-full rounded-2xl overflow-hidden p-8"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#a3e635]/50 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#a3e635]/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl py-3.5 text-sm font-semibold text-black transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
            style={{ background: '#a3e635' }}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/50">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-[#a3e635] hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </SubpageLayout>
  );
};

export default LoginPage;
