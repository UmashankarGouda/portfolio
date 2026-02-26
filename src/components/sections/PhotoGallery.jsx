import React, { useRef, useState, useEffect } from 'react';
import CircularGallery from '../ui/CircularGallery';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function PhotoGallery() {
    const { theme } = useTheme();
    const galleryRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const galleryItems = [
        { image: '/assets/gallery/My Speech at IEEE AGM 2025.png', text: 'My Speech as Chair, CIS Society\n at IEEE AGM 2025' },
        { image: '/assets/gallery/deeptech_hackersday_2025.mp4', text: 'DeepTech HackersDay 2025' },
        { image: '/assets/gallery/Hack with UttarPradesh National level hackathon Finale.png', text: 'Hack with UttarPradesh\nNational level hackathon Finale' },
        { image: '/assets/gallery/Our Booth at Comsif Conference.png', text: 'Our Booth at\nComsif Conference' },
        { image: '/assets/gallery/Gate Bootcamp organised by our Society.png', text: 'Gate Bootcamp\norganised by our Society' },
        { image: '/assets/gallery/Campus Tank Event.png', text: 'Campus Tank Event' },
        { image: '/assets/gallery/Our Winter of Projects team.png', text: 'Our Winter of\nProjects team' },
        { image: '/assets/gallery/decodex-hackathon.png', text: 'Decodex Hackathon' },
        { image: '/assets/gallery/impactx-hackathon.png', text: 'ImpactX Hackathon' }
    ];

    return (
        <section
            id="gallery"
            className={`py-12 md:py-20 overflow-hidden relative flex flex-col items-center ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}`}
        >
            <div className="max-w-7xl w-full px-4 mb-8 md:mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white uppercase tracking-wider"
                        style={{
                            background: theme === 'dark'
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #182E6F 100%)',
                            padding: '0.5rem 2rem',
                            borderRadius: '1rem',
                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                        }}
                    >
                        Photo Gallery
                    </h2>
                </motion.div>
            </div>

            <div className="w-full" style={{ height: isMobile ? '350px' : '600px', position: 'relative' }}>
                <CircularGallery
                    ref={galleryRef}
                    items={galleryItems}
                    bend={3}
                    textColor={theme === 'dark' ? "#ffffff" : "#000000"}
                    borderRadius={0.05}
                    scrollSpeed={2}
                    scrollEase={0.05}
                />

                {/* Navigation Buttons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-6 md:gap-8">
                    <button
                        onClick={() => galleryRef.current?.scrollPrev()}
                        className="p-2 md:p-3 rounded-full text-white shadow-lg transition-all hover:scale-110 active:scale-95"
                        style={{ backgroundColor: theme === 'dark' ? '#3b82f6' : '#182E6F' }}
                        aria-label="Previous"
                    >
                        <ChevronLeft size={isMobile ? 24 : 32} />
                    </button>
                    <button
                        onClick={() => galleryRef.current?.scrollNext()}
                        className="p-2 md:p-3 rounded-full text-white shadow-lg transition-all hover:scale-110 active:scale-95"
                        style={{ backgroundColor: theme === 'dark' ? '#3b82f6' : '#182E6F' }}
                        aria-label="Next"
                    >
                        <ChevronRight size={isMobile ? 24 : 32} />
                    </button>
                </div>
            </div>
        </section>
    );
}
