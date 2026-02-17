import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import TextType from '../ui/TextType';
import Achievement3DCard from '../ui/Achievement3DCard';
import { Landmark, Building2 } from 'lucide-react';

// Import achievement images
import impactxHackathon from '../../assets/impactx-hackathon.png';
import decodexHackathon from '../../assets/decodex-hackathon.png';
import deeptechHackersDay from '../../assets/deeptech-hackersday.png';

// Achievements data
const achievementsData = [
    {
        title: "1st Prize Winner at ImpactX 2025 Hackathon",
        description: "Built a multi-agent AI and blockchain powered agricultural ecosystem using RAG based LLMs for crop planning and biowaste management along with a transparent farmer to market platform.",
        location: "RNSIT, Bengaluru",
        image: impactxHackathon,
        icon: Landmark
    },
    {
        title: "DECODEX 2025 Prize Winner",
        description: "Competed in a 24-hour Capture The Flag cybersecurity challenge involving hardware and software puzzles, cryptography, and ESP32 tasks. Achieved a winning position through teamwork, endurance, and advanced problem-solving skills.",
        location: "BMSIT&M, Bengaluru",
        image: decodexHackathon,
        icon: Landmark
    },
    {
        title: "BMSIT&M Student Delegate at DeepTech Hackers Day 2025",
        description: "Represented BMSIT&M at a full-day deep-tech innovation event focused on AI, Web3, and Quantum technologies, engaging with builders, founders, and industry experts through talks, demos, and networking.",
        location: "Startup Park, Kormangala, Bengaluru",
        image: deeptechHackersDay,
        icon: Building2
    }
];

export default function Achievements() {
    const { theme } = useTheme();

    return (
        <section
            id="achievements"
            style={{ padding: '6rem 2vw' }}
            className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                    style={{ marginBottom: '4rem' }}
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white uppercase"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem'
                        }}
                    >
                        <TextType
                            text={["My Achievements", "Key Milestones"]}
                            typingSpeed={100}
                            pauseDuration={2000}
                            deletingSpeed={50}
                            showCursor
                            cursorCharacter="_"
                            cursorBlinkDuration={0.5}
                            loop={true}
                            startOnVisible={true}
                        />
                    </h2>
                </motion.div>

                {/* Achievements Grid */}
                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                    {achievementsData.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Achievement3DCard
                                title={achievement.title}
                                description={achievement.description}
                                location={achievement.location}
                                image={achievement.image}
                                icon={achievement.icon}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
