import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="fixed z-50 rounded-full transition-colors duration-300"
            style={{
                top: isMobile ? '1.25rem' : '1.5rem',
                right: isMobile ? '1rem' : '2rem',
                padding: isMobile ? '0.65rem' : '1rem',
                background: theme === 'dark'
                    ? 'rgba(139, 92, 246, 0.2)'
                    : 'rgba(98, 153, 199, 0.2)',
                backdropFilter: 'blur(0.75rem)',
                WebkitBackdropFilter: 'blur(0.75rem)',
                border: theme === 'dark'
                    ? '2px solid rgba(139, 92, 246, 0.4)'
                    : '2px solid rgba(98, 153, 199, 0.4)',
                boxShadow: theme === 'dark'
                    ? '0 0.5rem 2rem rgba(139, 92, 246, 0.3)'
                    : '0 0.5rem 2rem rgba(98, 153, 199, 0.2)',
                color: theme === 'dark' ? '#facc15' : '#141e2e',
            }}
            aria-label="Toggle theme"
        >
            {theme === 'dark'
                ? <Sun size={isMobile ? 20 : 28} strokeWidth={2.5} />
                : <Moon size={isMobile ? 20 : 28} strokeWidth={2.5} />
            }
        </motion.button>
    );
}
