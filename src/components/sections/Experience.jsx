import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ExperienceFlipCard from '../ui/ExperienceFlipCard';
import RotatingText from '../ui/RotatingText';

// Import logos
import ieeeLogo from '../../assets/ieee-cis-logo.svg';
import codingClubLogo from '../../assets/coding-club-logo.svg';
import leapquestLogo from '../../assets/leapquest-logo.svg';

// Experience data - ordered by recency (current/newest first)
const experiences = [
    {
        id: 1,
        companyName: 'Leap Quest',
        logo: leapquestLogo,
        role: 'Academic Editor',
        dateRange: 'Aug 2025 - Present',
        workLink: 'https://drive.google.com/placeholder-leapquest'
    },
    {
        id: 2,
        companyName: 'Student Branch Chapter',
        logo: ieeeLogo,
        role: 'Chair, IEEE CIS BMSIT&M',
        dateRange: 'Jan 2025 - Jan 2026',
        workLink: 'https://drive.google.com/placeholder-ieee-cis'
    },
    {
        id: 3,
        companyName: 'CODING CLUB BMSIT',
        logo: codingClubLogo,
        role: 'Vice Head of Design Team',
        dateRange: 'Aug 2024 - Sep 2025',
        workLink: 'https://drive.google.com/placeholder-coding-club'
    }
];

export default function Experience() {
    const { theme } = useTheme();

    return (
        <section
            id="experience"
            style={{ padding: '6rem 5vw' }}
            className={`min-h-screen flex items-center justify-center
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex justify-center"
                    style={{ marginBottom: '4rem' }}
                >
                    <h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '1rem'
                        }}
                    >
                        <RotatingText
                            texts={['EXPERIENCE', 'PROFESSIONAL JOURNEY']}
                            mainClassName="text-white"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={3000}
                        />
                    </h2>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Center Timeline Line */}
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 w-1 h-full rounded-full
                            ${theme === 'dark' ? 'bg-dark-primary/30' : 'bg-light-primary/30'}
                        `}
                    />

                    {/* Experience Cards */}
                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="relative"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 20px 1fr',
                                    gap: '2rem',
                                    alignItems: 'center'
                                }}
                            >
                                {/* Left Column */}
                                <div className="flex justify-end">
                                    {index % 2 === 0 && (
                                        <ExperienceFlipCard
                                            companyName={exp.companyName}
                                            logo={exp.logo}
                                            role={exp.role}
                                            dateRange={exp.dateRange}
                                            workLink={exp.workLink}
                                        />
                                    )}
                                </div>

                                {/* Center - Timeline Dot */}
                                <div className="flex justify-center">
                                    <div
                                        className={`w-5 h-5 rounded-full z-20
                                            ${theme === 'dark'
                                                ? 'bg-dark-primary shadow-[0_0_0_4px_rgba(0,255,163,0.3)]'
                                                : 'bg-light-primary shadow-[0_0_0_4px_rgba(107,79,187,0.3)]'}
                                        `}
                                    />
                                </div>

                                {/* Right Column */}
                                <div className="flex justify-start">
                                    {index % 2 === 1 && (
                                        <ExperienceFlipCard
                                            companyName={exp.companyName}
                                            logo={exp.logo}
                                            role={exp.role}
                                            dateRange={exp.dateRange}
                                            workLink={exp.workLink}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
