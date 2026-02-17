import { useTheme } from '../../context/ThemeContext';

export default function HeroLight() {
    const { theme } = useTheme();

    if (theme === 'dark') return null;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-light-bg">
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/assets/landing_page_hero_section_video_light.mp4" type="video/mp4" />
            </video>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-bg/80" />
        </div>
    );
}
