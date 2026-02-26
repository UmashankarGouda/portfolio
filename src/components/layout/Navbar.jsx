import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Open Source', href: '#open-source' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blogs', href: 'https://blogs.umashankars.co.in' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { theme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll-based visibility — always visible
    const { scrollY } = useScroll();
    const navOpacity = useTransform(scrollY, [0, 100, 200], [1, 1, 1]);
    const navY = useTransform(scrollY, [0, 100, 200], [0, 0, 0]);

    return (
        <motion.nav
            style={{
                opacity: navOpacity,
                y: navY,
                background: theme === 'dark'
                    ? 'rgba(10, 10, 10, 0.25)'
                    : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(1.25rem)',
                WebkitBackdropFilter: 'blur(1.25rem)',
                border: theme === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: theme === 'dark'
                    ? '0 0.5rem 2rem rgba(0, 0, 0, 0.3)'
                    : '0 0.5rem 2rem rgba(0, 0, 0, 0.1)',
                minHeight: isMobile ? '3rem' : '4rem',
            }}
            className="fixed top-[1rem] left-1/2 -translate-x-1/2 z-50 rounded-full"
        // Using inline style for precise control
        >
            <div
                className="flex items-center justify-center h-full"
                style={{
                    padding: isMobile ? '0.5rem 1.25rem' : '1.25rem 2.5rem',
                    gap: isMobile ? '0' : '2.5rem'
                }}
            >
                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center" style={{ gap: '2rem' }}>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
                                style={{
                                    fontSize: '1rem',
                                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(20, 30, 46, 0.9)',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = theme === 'dark' ? '#8b5cf6' : '#6299c7';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(20, 30, 46, 0.9)';
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile: Logo + Hamburger in a wider capsule */}
                <div className="md:hidden flex items-center justify-between" style={{ gap: '2rem' }}>
                    {/* US Logo */}
                    <a href="#home">
                        <img
                            src="/us.svg"
                            alt="US Logo"
                            style={{
                                height: '1.75rem',
                                width: 'auto'
                            }}
                        />
                    </a>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg"
                        style={{
                            padding: '0.35rem',
                            color: theme === 'dark' ? '#d1d5db' : '#141e2e'
                        }}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                        background: theme === 'dark'
                            ? 'rgba(10, 10, 10, 0.85)'
                            : 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(1.25rem)',
                        WebkitBackdropFilter: 'blur(1.25rem)',
                        border: theme === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.08)'
                            : '1px solid rgba(0, 0, 0, 0.08)',
                        padding: '1rem',
                        marginTop: '0.5rem',
                        borderRadius: '1rem',
                    }}
                    className="absolute top-full left-0 right-0 md:hidden"
                >
                    <ul className="flex flex-col" style={{ gap: '0.5rem' }}>
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block font-medium transition-colors"
                                    style={{
                                        padding: '0.4rem 0',
                                        fontSize: '0.95rem',
                                        color: theme === 'dark' ? '#d1d5db' : '#141e2e'
                                    }}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    );
}
