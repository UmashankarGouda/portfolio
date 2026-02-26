import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TextType from '../ui/TextType';
import CertificationFlipCard from '../ui/CertificationFlipCard';

// Import certificate images
import oracleFoundationCert from '../../assets/oracle-foundation-certificate.png';

// Certifications data
const certificationsData = [
    {
        name: 'Oracle Cloud Infrastructure Foundations Associate',
        image: oracleFoundationCert,
        issuedDate: 'Oct 2025',
        expiresDate: 'Oct 2027',
        credentialId: 'OCI25FNDCFA',
        verifyLink: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=2D712365D57E90E1F211192955CEA08A2CD818E95393FD7C55A4A2570CD63569'
    }
];

export default function Certifications() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section
            id="certifications"
            style={{ padding: isMobile ? '3rem 4vw' : '6rem 5vw' }}
            className={`min-h-screen flex items-center justify-center
                ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}
            `}
        >
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header with TextType Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                    style={{ marginBottom: isMobile ? '2rem' : '4rem' }}
                >
                    <h2
                        className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white uppercase"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem'
                        }}
                    >
                        <TextType
                            text={["MY CERTIFICATIONS", "PROFESSIONAL BADGES"]}
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

                {/* Certifications Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6 md:gap-8"
                >
                    {certificationsData.map((cert, index) => (
                        <CertificationFlipCard
                            key={index}
                            certificationName={cert.name}
                            image={cert.image}
                            verifyLink={cert.verifyLink}
                            issuedDate={cert.issuedDate}
                            expiresDate={cert.expiresDate}
                            credentialId={cert.credentialId}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
