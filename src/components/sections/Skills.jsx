import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TiltedCard from '../ui/TiltedCard';
import DecryptedText from '../ui/DecryptedText';
import TargetCursor from '../ui/TargetCursor';

// Skills data with icon URLs from devicon CDN
const skillsData = {
    Languages: [
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'C', icon: 'https://cdn.simpleicons.org/c/00599C' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'HTML & CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'LaTeX', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg' },
        { name: 'MATLAB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg' }
    ],
    Frameworks: [
        { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' }
    ],
    Tools: [
        { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
        { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' }
    ]
};

const tabs = Object.keys(skillsData);

// Skill Card Component with full 3D tilt effect
function SkillCard({ skill, theme, isMobile }) {
    return (
        <TiltedCard
            captionText={skill.name}
            containerHeight={isMobile ? '130px' : '180px'}
            containerWidth={isMobile ? '120px' : '160px'}
            rotateAmplitude={isMobile ? 8 : 15}
            scaleOnHover={1.08}
            showMobileWarning={false}
            showTooltip={!isMobile}
        >
            {/* Card Content - Icon + Text */}
            <div
                className={`w-full h-full rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-4
                    ${theme === 'dark'
                        ? 'bg-dark-surface border border-dark-primary/30'
                        : 'bg-white border border-light-primary/20 shadow-lg'}
                `}
                style={{ padding: isMobile ? '0.75rem 0.5rem' : '1.5rem 1rem' }}
            >
                {/* Skill Icon */}
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} object-contain`}
                    style={{
                        filter: theme === 'dark' && skill.name === 'Express.js'
                            ? 'invert(1)'
                            : 'none'
                    }}
                />

                {/* Skill Name */}
                <span
                    className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-center`}
                    style={{
                        color: theme === 'dark' ? '#e2e8f0' : '#182E6F'
                    }}
                >
                    {skill.name}
                </span>
            </div>
        </TiltedCard>
    );
}

export default function Skills() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('Languages');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section
            id="skills"
            style={{ padding: isMobile ? '3rem 4vw' : '6rem 5vw' }}
            className={`min-h-screen flex items-center justify-center
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            {/* TargetCursor - only active in Skills section, disabled on mobile */}
            {!isMobile && (
                <TargetCursor
                    targetSelector=".cursor-target"
                    containerSelector="#skills"
                    spinDuration={2}
                    hoverDuration={0.2}
                    parallaxOn={true}
                />
            )}

            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header with Decrypted Text Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                    style={{ marginBottom: isMobile ? '2rem' : '3rem' }}
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-6xl font-bold text-center text-white"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem'
                        }}
                    >
                        <DecryptedText
                            text="SKILLS"
                            animateOn="view"
                            revealDirection="start"
                            speed={200}
                            maxIterations={15}
                            sequential={true}
                            useOriginalCharsOnly={false}
                            loop={true}
                            loopDelay={1500}
                        />
                    </h2>
                </motion.div>

                {/* Toggle Bar */}
                <div className="flex justify-center px-4" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className={`inline-flex flex-wrap justify-center gap-2 rounded-3xl md:rounded-full p-2 md:p-3
                            ${theme === 'dark'
                                ? 'bg-dark-bg border border-dark-primary/30'
                                : 'bg-white border border-light-primary/20 shadow-md'}
                        `}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-target relative px-3 py-3 md:px-8 md:py-8 lg:py-10 text-xs md:text-xl lg:text-2xl font-bold rounded-full transition-colors duration-200 min-w-[5.5rem] md:min-w-[12rem] lg:min-w-[14rem] min-h-[1rem] md:min-h-[2rem] lg:min-h-[2.5rem]
                                    ${activeTab === tab
                                        ? 'text-white'
                                        : (theme === 'dark'
                                            ? 'text-gray-400 hover:text-white'
                                            : 'text-light-accent/60 hover:text-light-accent')
                                    }
                                `}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeSkillTab"
                                        className={`absolute inset-0 rounded-full
                                            ${theme === 'dark'
                                                ? 'bg-gradient-to-r from-dark-primary to-dark-secondary'
                                                : 'bg-gradient-to-r from-light-primary to-light-accent'}
                                        `}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Skills Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center"
                    >
                        <div className={`grid ${isMobile ? 'grid-cols-3 gap-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'} w-full max-w-5xl justify-items-center`}>
                            {skillsData[activeTab].map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
                                >
                                    <SkillCard skill={skill} theme={theme} isMobile={isMobile} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
