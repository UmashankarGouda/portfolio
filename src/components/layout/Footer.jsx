import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Heart } from 'lucide-react';

export default function Footer() {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                background: theme === 'dark'
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                    : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                padding: '1.25rem 2rem',
                position: 'relative'
            }}
        >
            {/* Center: Text */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', textAlign: 'center' }}>
                <div className="flex items-center gap-2 text-sm text-white">
                    <span>Built with</span>
                    <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
                    <span>by Umashankar S Gouda</span>
                </div>
                <p className="text-sm text-white/70">
                    © {currentYear} Umashankar Gouda. All rights reserved.
                </p>
            </div>

            {/* Right: Signature (absolute positioned) */}
            <img
                src="/assets/signature.svg"
                alt="Signature"
                style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '5rem',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.8
                }}
            />
        </footer>
    );
}
