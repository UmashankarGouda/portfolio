import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { GitHubCalendar } from 'react-github-calendar';
import Shuffle from '../ui/ShuffleText';

export default function OpenSource() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Custom theme for the GitHub calendar
    const calendarTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    };

    // Custom block size and margin for better visibility
    const blockSize = isMobile ? 8 : 12;
    const blockMargin = isMobile ? 2 : 3;

    return (
        <section
            id="open-source"
            style={{ padding: isMobile ? '3rem 4vw' : '6rem 5vw' }}
            className={`min-h-screen flex items-center justify-center
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex justify-center"
                    style={{ marginBottom: isMobile ? '2rem' : '4rem' }}
                >
                    <h2
                        className="text-xl md:text-3xl lg:text-4xl font-bold text-center text-white"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.75rem 1rem',
                            borderRadius: '1rem'
                        }}
                    >
                        <Shuffle
                            text="OPEN SOURCE CONTRIBUTIONS"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.02}
                            threshold={0.1}
                            triggerOnce={false}
                            triggerOnHover={true}
                            respectReducedMotion={true}
                            loop={true}
                            loopDelay={0.5}
                            tag="span"
                        />
                    </h2>
                </motion.div>

                {/* GitHub Contribution Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex flex-col items-center"
                >
                    {/* Calendar Container */}
                    <div
                        style={{ minHeight: isMobile ? '12rem' : '18rem' }}
                        className={`p-4 md:p-8 rounded-2xl w-full max-w-4xl flex flex-col justify-center
                            ${theme === 'dark'
                                ? 'bg-dark-surface border border-dark-primary/30'
                                : 'bg-white border border-light-primary/20 shadow-lg'}
                        `}
                    >
                        <h3
                            className={`text-lg md:text-2xl font-bold mb-4 md:mb-8 text-center
                                ${theme === 'dark' ? 'text-white' : 'text-light-accent'}
                            `}
                        >
                            GitHub Contributions
                        </h3>

                        <div className="flex justify-center py-2 md:py-4 overflow-x-auto">
                            <GitHubCalendar
                                username="UmashankarGouda"
                                blockSize={blockSize}
                                blockMargin={blockMargin}
                                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                                theme={calendarTheme}
                                fontSize={isMobile ? 10 : 14}
                                style={{
                                    color: theme === 'dark' ? '#e2e8f0' : '#1e293b'
                                }}
                            />
                        </div>

                        {/* GitHub Stats */}
                        <div className="mt-6 md:mt-10 flex flex-wrap justify-center gap-4 md:gap-8">
                            <a
                                href="https://github.com/UmashankarGouda"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ cursor: 'pointer', zIndex: 10, position: 'relative' }}
                                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm md:text-base
                                    ${theme === 'dark'
                                        ? 'bg-dark-primary/20 text-dark-primary hover:bg-dark-primary/30'
                                        : 'bg-light-primary/10 text-light-primary hover:bg-light-primary/20'}
                                `}
                            >
                                <svg
                                    className="w-4 h-4 md:w-5 md:h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span className="font-semibold">View GitHub Profile</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
