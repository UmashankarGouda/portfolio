import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import HeroLight from './HeroLight';
import HeroDark from './HeroDark';

export default function Hero() {
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const [svgLoaded, setSvgLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth spring config for buttery animations
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Phase 1: Hero fades out (0% - 25%)
    const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.95]);
    const heroBlur = useTransform(smoothProgress, [0, 0.25], [0, 8]);
    const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

    // Phase 2: Signature appears and stays until end (18% - 85%)
    const signatureOpacity = useTransform(smoothProgress, [0.18, 0.28, 0.8, 0.9], [0, 1, 1, 0]);
    const signatureScale = useTransform(smoothProgress, [0.18, 0.35], [0.7, 1.15]);
    const signatureY = useTransform(smoothProgress, [0.18, 0.35], [60, 0]);
    const signatureRotate = useTransform(smoothProgress, [0.18, 0.35], [-2, 0]);

    // Entire fixed container fades out at end
    const containerOpacity = useTransform(smoothProgress, [0.85, 1], [1, 0]);

    // Check if SVG exists
    useEffect(() => {
        fetch('/assets/signature.svg')
            .then(res => {
                if (res.ok) setSvgLoaded(true);
            })
            .catch(() => setSvgLoaded(false));
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: isMobile ? '150vh' : '250vh' }}
        >
            {/* Fixed Hero Container */}
            <motion.div
                className="fixed inset-0 w-full h-screen overflow-hidden"
                style={{ opacity: containerOpacity }}
            >
                {/* Conditional Hero based on theme */}
                <motion.div
                    style={{
                        opacity: heroOpacity,
                        scale: heroScale,
                        filter: heroFilter
                    }}
                    className="w-full h-full origin-center"
                >
                    {theme === 'light' ? <HeroLight /> : <HeroDark />}
                </motion.div>

                {/* Signature Animation Overlay */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                    style={{
                        opacity: signatureOpacity,
                        background: theme === 'dark'
                            ? '#0a0a0a'
                            : '#FFFDE7'
                    }}
                >
                    <motion.div
                        className={`w-full ${isMobile ? 'max-w-xs px-4' : 'max-w-4xl px-8'}`}
                        style={{
                            scale: signatureScale,
                            y: signatureY,
                            rotate: signatureRotate
                        }}
                    >
                        {svgLoaded ? (
                            <motion.img
                                src="/assets/signature.svg"
                                alt="Signature"
                                className="w-full h-auto max-h-[50vh] object-contain"
                                style={{
                                    filter: theme === 'dark'
                                        ? 'invert(1) sepia(1) saturate(5) hue-rotate(230deg)'
                                        : 'none'
                                }}
                            />
                        ) : (
                            // Fallback: Text signature
                            <motion.h2
                                className="text-4xl md:text-6xl lg:text-8xl text-center"
                                style={{
                                    fontFamily: "'Great Vibes', cursive",
                                    color: theme === 'dark' ? '#8b5cf6' : '#141e2e'
                                }}
                            >
                                Umashankar S Gouda
                            </motion.h2>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
