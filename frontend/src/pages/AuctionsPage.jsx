import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SubpageLayout from '../components/SubpageLayout';
import { apiFetch } from '../utils/api';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const AUCTIONS = [
  { id: 1, title: 'Sony Alpha A7 IV', category: 'Electronics', currentBid: 124500, bids: 23, timeLeft: '01:42:18', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80', status: 'live' },
  { id: 2, title: 'Apple MacBook Pro 16"', category: 'Laptops', currentBid: 189000, bids: 41, timeLeft: '03:15:44', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80', status: 'live' },
  { id: 3, title: 'Vintage Rolex Submariner', category: 'Watches', currentBid: 645000, bids: 87, timeLeft: '00:28:09', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', status: 'ending' },
  { id: 4, title: 'Gibson Les Paul Standard', category: 'Instruments', currentBid: 78000, bids: 12, timeLeft: '05:00:00', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80', status: 'live' },
  { id: 5, title: 'Canon EOS R5 Body', category: 'Electronics', currentBid: 214000, bids: 34, timeLeft: '02:11:33', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80', status: 'live' },
  { id: 6, title: 'DJI Mavic 3 Pro Drone', category: 'Electronics', currentBid: 98500, bids: 19, timeLeft: '00:45:22', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80', status: 'ending' },
];

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const FILTERS = ['All', 'Electronics', 'Watches', 'Laptops', 'Instruments', 'General'];

const calculateTimeLeft = (endTime) => {
  const difference = new Date(endTime) - new Date();
  if (difference <= 0) return '00:00:00';
  
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const AuctionsPage = ({ onNavigate }) => {
  const [filter, setFilter] = useState('All');
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await apiFetch('/auctions');
        if (response.success) {
          const mappedAuctions = response.data.map(a => ({
            id: a._id,
            title: a.title,
            category: 'General', // Backend has no category yet
            currentBid: a.currentPrice,
            bids: 0, // Backend doesn't return bid count here
            timeLeft: calculateTimeLeft(a.endTime),
            image: a.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
            status: a.status === 'active' && new Date(a.endTime) - new Date() < 3600000 ? 'ending' : a.status
          }));
          setAuctions(mappedAuctions);
        }
      } catch (error) {
        console.error('Failed to fetch auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const visible = filter === 'All' ? auctions : auctions.filter((a) => a.category === filter);

  return (
    <SubpageLayout
      onNavigate={onNavigate}
      title="Live Auctions"
      subtitle="● Bidding Now"
    >
      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
            style={
              filter === f
                ? { background: 'rgba(163,230,53,0.15)', border: '1px solid rgba(163,230,53,0.3)', color: '#a3e635' }
                : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }
            }
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && visible.length === 0 && (
        <div className="text-center py-20 text-white/50">
          No auctions found for this category.
        </div>
      )}

      {/* Auction grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {visible.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.25 + i * 0.07 }}
            className="rounded-2xl overflow-hidden group cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Status badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
                style={item.status === 'ending'
                  ? { background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)' }
                  : { background: 'rgba(163,230,53,0.15)', border: '1px solid rgba(163,230,53,0.25)' }
                }
              >
                <span className="h-1.5 w-1.5 rounded-full"
                  style={{ background: item.status === 'ending' ? '#ef4444' : '#a3e635', animation: 'pulse-dot 1.4s ease-in-out infinite' }}
                  aria-hidden="true"
                />
                <span className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: item.status === 'ending' ? '#ef4444' : '#a3e635' }}
                >
                  {item.status === 'ending' ? 'Ending Soon' : 'Live'}
                </span>
              </div>
              {/* Time left */}
              <div className="absolute top-3 right-3 rounded-full px-2 py-0.5" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                <span className="font-mono text-[10px] text-white/70">{item.timeLeft}</span>
              </div>
            </div>

            {/* Card body */}
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">{item.category}</p>
              <p className="text-sm font-semibold text-white mb-3 truncate">{item.title}</p>

              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/35 mb-0.5">Current Bid</p>
                  <p className="text-base font-bold text-white">{formatINR(item.currentBid)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-white/35 mb-0.5">Bids</p>
                  <p className="text-sm font-semibold text-white/70">{item.bids}</p>
                </div>
              </div>

              <button
                className="w-full rounded-xl py-2.5 text-xs font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                style={{ background: 'linear-gradient(to bottom, #2b2b2b, #101010)' }}
              >
                Place Bid
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </SubpageLayout>
  );
};

export default AuctionsPage;
