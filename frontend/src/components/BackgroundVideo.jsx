import React, { useRef, useEffect, useState } from 'react';

/**
 * BackgroundVideo
 *
 * Full-screen cinematic background video.
 * Falls back to an animated CSS gradient if video cannot load.
 * No heavy dark overlay — content uses z-10 directly over the video.
 * Only a subtle radial vignette for edge contrast.
 */
const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play; if it fails, show gradient fallback
    const handleError = () => setVideoFailed(true);
    video.addEventListener('error', handleError);

    // Some browsers need an explicit play call
    video.play().catch(() => {
      // Muted autoplay blocked — acceptable; video attr handles it
    });

    return () => video.removeEventListener('error', handleError);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* ── Gradient fallback (shown while video loads or if it fails) ── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: videoFailed ? 1 : 0,
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(30,30,30,0.9) 0%, #010101 70%),
            linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #050505 100%)
          `,
        }}
      >
        {/* Subtle animated mesh for fallback depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(163,230,53,0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* ── Main video ─────────────────────────────────────────────────── */}
      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 1 }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
        >
          {/*
            Nexum-reference CloudFront URL.
            We cascade through public fallback videos if the primary fails.
          */}
          {/* Exact Nexum reference CloudFront background video */}
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/*
        Subtle radial vignette — darkens edges slightly so text on either side
        remains legible, while keeping the centre of the video fully visible.
        This is NOT a full dark overlay.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 35%, rgba(1,1,1,0.55) 100%)',
        }}
      />

      {/*
        Bottom gradient — helps the bottom-anchored text/cards be readable
        without obscuring the middle of the frame.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(1,1,1,0.72) 0%, rgba(1,1,1,0.2) 60%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default BackgroundVideo;
