import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(true);
    const isMobile = window.innerWidth <= 768;

    // Skip preloader if URL has a hash (e.g., navigated from blog to #skills)
    const hasHash = window.location.hash.length > 0;

    useEffect(() => {
        if (hasHash) {
            setIsVisible(false);
            setIsMounted(false);
            return;
        }

        // Simulate loading progress over ~3 seconds
        const duration = 3000;
        const interval = 30;
        const step = 100 / (duration / interval);
        let current = 0;

        const timer = setInterval(() => {
            current += step + Math.random() * 0.5;
            if (current >= 100) {
                current = 100;
                clearInterval(timer);
                // Start fade-out after reaching 100%
                setTimeout(() => {
                    setIsVisible(false);
                    // Unmount after fade-out animation completes
                    setTimeout(() => setIsMounted(false), 600);
                }, 400);
            }
            setProgress(Math.min(Math.round(current), 100));
        }, interval);

        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        return () => {
            clearInterval(timer);
            document.body.style.overflow = '';
        };
    }, [hasHash]);

    // Re-enable scrolling when preloader hides
    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = '';
        }
    }, [isVisible]);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0a0a0f',
                        overflow: 'hidden',
                    }}
                >
                    {/* Ambient glow effects */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '30%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: isMobile ? '250px' : '500px',
                            height: isMobile ? '250px' : '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '10%',
                            right: '20%',
                            width: isMobile ? '150px' : '300px',
                            height: isMobile ? '150px' : '300px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Spinning ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                        style={{
                            width: isMobile ? '36px' : '48px',
                            height: isMobile ? '36px' : '48px',
                            borderRadius: '50%',
                            border: '2px solid rgba(139, 92, 246, 0.15)',
                            borderTopColor: '#8b5cf6',
                            marginBottom: isMobile ? '1.5rem' : '2.5rem',
                        }}
                    />

                    {/* Main quote */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 400,
                            letterSpacing: '0.02em',
                            marginBottom: '0.75rem',
                            textAlign: 'center',
                            padding: '0 1.5rem',
                        }}
                    >
                        "WELCOME TO MY PORTFOLIO"
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: isMobile ? '0.65rem' : '1.2rem',
                            color: 'rgba(255, 255, 255, 0.4)',
                            letterSpacing: isMobile ? '0.08em' : '0.15em',
                            textTransform: 'lowercase',
                            marginBottom: isMobile ? '2rem' : '3rem',
                            textAlign: 'center',
                            padding: '0 1.5rem',
                        }}
                    >
                        Certain features can be experienced on desktop only
                    </motion.p>

                    {/* Progress bar section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        style={{
                            width: 'min(320px, 80vw)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                        }}
                    >
                        {/* Label row */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '0.65rem',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Loading Portfolio
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '0.65rem',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                {progress}%
                            </span>
                        </div>

                        {/* Progress track */}
                        <div
                            style={{
                                width: '100%',
                                height: '2px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                            }}
                        >
                            <motion.div
                                style={{
                                    height: '100%',
                                    borderRadius: '4px',
                                    background: 'linear-gradient(90deg, #8b5cf6, #6366f1, #ec4899)',
                                    width: `${progress}%`,
                                }}
                                transition={{ duration: 0.1, ease: 'linear' }}
                            />
                        </div>
                    </motion.div>

                    {/* Welcome text at bottom */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: progress > 60 ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            position: 'absolute',
                            bottom: '2rem',
                            fontFamily: "'Courier New', monospace",
                            fontSize: '0.6rem',
                            color: 'rgba(255, 255, 255, 0.3)',
                            letterSpacing: '0.35em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Welcome
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
