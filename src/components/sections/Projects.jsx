import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import DecryptedText from '../ui/DecryptedText';
import TargetCursor from '../ui/TargetCursor';
import ProjectCard from '../ui/ProjectCard';

// Import project images
import authentixImage from '../../assets/authentix-project.png';
import krishiChakraImage from '../../assets/krishi-chakra.png';
import nelotsavamImage from '../../assets/nelotsavam-project.png';
import galacticVoidImage from '../../assets/galactic-void.png';
import maitriJaipurImage from '../../assets/maitri-jaipur.png';
import thumbnailsImage from '../../assets/thumbnails.png';

// Project categories
const tabs = ['All', 'Software', 'Graphic Design'];

// Projects data
const projectsData = {
    Software: [
        {
            title: 'Academic Credential Verification and Issuance System',
            description: 'Authentix is a decentralized digital credential verification and issuance system that ensures certificates remain secure, tamper-proof, and accessible even if the issuing institution goes offline.',
            image: authentixImage,
            blogLink: 'https://blogs.umashankars.co.in/blog/academic-credential-system', 
            githubLink: 'https://github.com/UmashankarGouda/Authentix-System',
            category: 'Software',
            technologies: ['AES-GCM Cryptography', 'RSA-OAEP Encryption', "Shamir's SS Algorithm", 'Ethereum'],
            badge: 'Web3 + IPFS Project'
        },
        {
            title: 'AI-Powered Multi-Agent Agriculture Management & Crop Rotation Platform',
            description: 'AI-powered agricultural platform that helps farmers plan optimal crop rotations using a Multi-Agent RAG system trained on ICAR and IEEE research, and satellite insights from ISRO\'s Bhuvan, combined with farm analytics.',
            image: krishiChakraImage,
            blogLink: 'https://blogs.umashankars.co.in/blog/krishi-sakhi',
            githubLink: 'https://github.com/UmashankarGouda/KrishiChakra',
            category: 'Software',
            technologies: ["ISRO's Bhuvan", 'Blockchain Certification', 'GPT4 LLM', 'FAISS Vector DB'],
            badge: '🏆 Multi-Hackathon Winning Project'
        },
        {
            title: 'Gamified Sustainable Farming Platform',
            description: 'A mobile-first gamified platform that encourages farmers to adopt sustainable agricultural practices through quests, rewards, and community learning.',
            image: nelotsavamImage,
            blogLink: 'https://blogs.umashankars.co.in/blog/nelotsavam',
            githubLink: 'https://github.com/UmashankarGouda/Natively-app-nelotsavam',
            category: 'Software',
            technologies: ['Mobile-First Interface', 'Voice Assistant', 'FastAPI Backend', 'Farmer Community Network'],
            badge: 'SIH Project'
        }
    ],
    'Graphic Design': [
        {
            title: 'Social Media Content Creation \u2013 Maitri Jaipur',
            description: 'Created reels, carousels, and context-driven visual content for a clothing brand, contributing to growth beyond 50K followers through consistent design, trend-aligned storytelling, and audience-focused creatives.',
            image: maitriJaipurImage,
            liveLink: 'https://www.instagram.com/maitrijaipurofficial/',
            blogLink: 'https://drive.google.com/drive/folders/12kPvL0hpGdZeOXVgjiHr5qF1sEfEBJcH?usp=sharing',
            category: 'Graphic Design',
            technologies: ['Reels', 'Carousels', 'Brand Aesthetics', 'SMMA', 'Canva']
        },
        {
            title: 'Content Creation & Social Media Management \u2013 Galactic Void',
            description: 'Managed and created visual content for the Galactic Void page, handling 200K+ Instagram and 900K Facebook followers. Designed posts in Canva and used Publer Analytics for scheduling, automation, and performance tracking.',
            image: galacticVoidImage,
            liveLink: 'https://www.instagram.com/thegalacticvoid/',
            blogLink: 'https://drive.google.com/drive/folders/12kPvL0hpGdZeOXVgjiHr5qF1sEfEBJcH?usp=sharing',
            category: 'Graphic Design',
            technologies: ['Canva', 'Publer', 'Brand Analytics', 'Automation', 'SMMA']
        },
        {
            title: 'YouTube Thumbnail Design',
            description: 'Designed eye-catching thumbnails for a YouTube channel, focusing on visual hierarchy, typography, and click-through optimization to enhance video engagement and brand consistency.',
            image: thumbnailsImage,
            liveLink: 'https://www.youtube.com/@TristanPhleetSMS',
            blogLink: 'https://drive.google.com/drive/folders/12kPvL0hpGdZeOXVgjiHr5qF1sEfEBJcH?usp=sharing',
            category: 'Graphic Design',
            technologies: ['Youtube', 'Thumbnail', 'Canva', 'Typography']
        }
    ]
};

// 'All' tab shows only Software projects (main focus)
const getAllProjects = () => {
    return [...projectsData.Software];
};

export default function Projects() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('Software');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get projects based on active tab
    const getFilteredProjects = () => {
        if (activeTab === 'All') {
            return getAllProjects();
        }
        return projectsData[activeTab] || [];
    };

    const filteredProjects = getFilteredProjects();

    return (
        <section
            id="projects"
            style={{ padding: isMobile ? '3rem 4vw' : '6rem 5vw' }}
            className={`min-h-screen flex items-center justify-center
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            {/* TargetCursor - only active in Projects section, disabled on mobile */}
            {!isMobile && (
                <TargetCursor
                    targetSelector=".cursor-target"
                    containerSelector="#projects"
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
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem'
                        }}
                    >
                        <DecryptedText
                            text="PROJECTS"
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
                                className={`cursor-target relative px-3 py-3 md:px-8 md:py-8 lg:py-10 text-xs md:text-xl lg:text-2xl font-bold rounded-full transition-colors duration-200 min-w-[5rem] md:min-w-[12rem] lg:min-w-[14rem] min-h-[1rem] md:min-h-[2rem] lg:min-h-[2.5rem]
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
                                        layoutId="activeProjectTab"
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

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-6 md:gap-8 justify-items-center"
                        style={{
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))'
                        }}
                    >
                        {filteredProjects.length === 0 ? (
                            <p className={`text-center text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Projects coming soon...
                            </p>
                        ) : (
                            filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    title={project.title}
                                    description={project.description}
                                    image={project.image}
                                    blogLink={project.blogLink}
                                    githubLink={project.githubLink}
                                    liveLink={project.liveLink}
                                    category={project.category}
                                    technologies={project.technologies}
                                    badge={project.badge}
                                />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
