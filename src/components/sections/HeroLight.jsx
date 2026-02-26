import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function HeroLight() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (theme === 'dark') return null;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-light-bg">
            {isMobile ? (
                /* Static image for mobile - better performance than video */
                <img
                    src="/assets/mobile-screen-hero-light.png"
                    alt="Hero background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                /* Video Background for desktop */
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/assets/landing-page-hero-section-light-mode.webm" type="video/webm" />
                    <source src="/assets/landing-page-hero-section-light-mode.mp4" type="video/mp4" />
                </video>
            )}

            {
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-bg/30" />
            }
        </div>
    );
}
