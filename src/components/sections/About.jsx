import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import RotatingText from '../ui/RotatingText';
import PixelTransition from '../ui/PixelTransition';

export default function About() {
    const { theme } = useTheme();

    return (
        <section
            id="about"
            style={{ padding: '6rem 5vw' }}
            className={`min-h-screen flex items-center justify-center
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header with Rotating Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="w-full flex justify-center"
                    style={{ marginBottom: '5rem' }}
                >
                    <h2
                        className={`text-4xl md:text-6xl font-bold flex items-center justify-center gap-4 flex-wrap
                            ${theme === 'dark' ? 'text-white' : 'text-light-accent'}
                        `}
                    >
                        <span>ABOUT</span>
                        <span
                            className={`rounded-lg ${theme === 'dark'
                                ? 'bg-gradient-to-r from-dark-primary to-dark-secondary'
                                : 'bg-gradient-to-r from-light-primary to-light-accent'
                                }`}
                            style={{ padding: '0.5rem 0.5rem' }}
                        >
                            <RotatingText
                                texts={['ME', 'UMASHANKAR', 'UNGOVERNABLE']}
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
                        </span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center justify-items-center">
                    {/* Photo with Strong Animation - Smaller size */}
                    <motion.div
                        initial={{ x: -200, opacity: 0, scale: 0.9, rotate: -5 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 10,
                            mass: 1
                        }}
                        viewport={{ once: false, amount: 0.3, margin: "-100px" }}
                        className="relative w-full flex justify-center"
                        style={{ maxWidth: '25rem' }}
                    >
                        <PixelTransition
                            firstContent={
                                <img
                                    src="/assets/avatar.jpg"
                                    alt="Umashankar S Gouda"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            }
                            secondContent={
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'grid',
                                        placeItems: 'center',
                                        backgroundColor: theme === 'dark' ? '#1a1a2e' : '#182E6F'
                                    }}
                                >
                                    <p style={{ fontWeight: 900, fontSize: '3rem', color: '#ffffff' }}>Hello, there !</p>
                                </div>
                            }
                            gridSize={15}
                            pixelColor="#ffffff"
                            once={false}
                            animationStepDuration={0.6}
                            aspectRatio="133.33%"
                            style={{
                                width: '100%',
                                borderRadius: '1rem',
                                border: 'none',
                                boxShadow: theme === 'dark'
                                    ? '0 25px 50px -12px rgba(139, 92, 246, 0.2)'
                                    : '0 25px 50px -12px rgba(24, 46, 111, 0.2)'
                            }}
                        />

                        {/* Floating decoration */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut"
                            }}
                            className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-xl
                                ${theme === 'dark' ? 'bg-dark-primary/30' : 'bg-light-primary/30'}
                            `}
                        />
                    </motion.div>

                    {/* Bio Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <p
                            className={`text-lg leading-relaxed text-justify ${theme === 'dark' ? 'text-gray-300' : 'text-light-accent/80'}`}
                            style={{ marginBottom: '2rem' }}
                        >
                            I'm an engineering student who enjoys building things that actually do something, from Java-based backend systems and cloud-deployed platforms to clean, scroll-stopping designs.
                        </p>

                        <p
                            className={`text-lg leading-relaxed text-justify ${theme === 'dark' ? 'text-gray-400' : 'text-light-accent/70'}`}
                            style={{ marginBottom: '2rem' }}
                        >
                            I live at the intersection of technology, creativity, and impact. One day I'm designing posters and managing social media for brands, the next I'm working on blockchain verification portals, voice-driven AI solutions in regional languages, or leading teams under IEEE CIS. I've built projects for hackathons, startups, college clubs, and open-source communities—always with the same goal: make tech useful, accessible, and human.
                        </p>

                        <p
                            className={`text-lg leading-relaxed text-justify ${theme === 'dark' ? 'text-gray-400' : 'text-light-accent/70'}`}
                            style={{ marginBottom: '2rem' }}
                        >
                            I'm especially interested in Java backend development, cloud computing, AI/ML applications, and product thinking, and I learn best by building real systems end-to-end rather than just reading about them. Along the way, I've picked up experience in leadership, project coordination, client communication, and turning vague ideas into shipped products.
                        </p>

                        <p className={`text-lg leading-relaxed italic text-justify ${theme === 'dark' ? 'text-gray-500' : 'text-light-accent/60'}`}>
                            And when I need a creative reset, I genuinely enjoy experimenting with graphic design and visual storytelling.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
